import { Hono } from "hono";
import { getUserAuth } from "@/lib/auth/utils";
import { env } from "@/lib/env.mjs";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import "dotenv/config";

const app = new Hono().basePath("/api");

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Chat route
app.post("/chat", async (c: any) => {
  try {
    // Check authentication
    const { session } = await getUserAuth();
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { messages, ...parameters } = body;

    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: "Invalid request body" }, 400);
    }

    // Proxy request to backend with parameters
    const response = await fetch(`${BACKEND_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, ...parameters }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return c.json({ error: `Backend error: ${errorText}` }, response.status);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Experiments route - batch generation with parameter ranges
app.post("/experiments/generate-batch", async (c: any) => {
  try {
    const body = await c.req.json();

    // Try to get session, but don't fail if not authenticated (for playground)
    let session;
    try {
      const authResult = await getUserAuth();
      session = authResult.session;
    } catch (error) {
      // Ignore auth errors for playground mode
      session = null;
    }

    // Check if this is a playground request (no session or explicit playground flag)
    const isPlayground = !session || body.playground === true;

    if (isPlayground) {
      // Playground mode - call playground endpoint without saving
      const response = await fetch(
        `${BACKEND_API_URL}/playground/generate-batch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body), // Don't include user_id for playground
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return c.json(
          { error: `Backend error: ${errorText}` },
          response.status
        );
      }

      const data = await response.json();
      return c.json(data);
    } else {
      // Regular mode - requires authentication
      if (!session) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Add user_id from session to request body
      const requestBody = {
        ...body,
        user_id: session.user.id,
      };

      // Proxy request to backend
      const response = await fetch(`${BACKEND_API_URL}/generate-batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return c.json(
          { error: `Backend error: ${errorText}` },
          response.status
        );
      }

      const data = await response.json();
      return c.json(data);
    }
  } catch (error) {
    console.error("Experiments API error:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Get list of experiments for user
app.get("/experiments", async (c: any) => {
  try {
    // Check authentication
    const { session } = await getUserAuth();
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const limit = c.req.query("limit") ? parseInt(c.req.query("limit")) : 50;
    const skip = c.req.query("skip") ? parseInt(c.req.query("skip")) : 0;

    // Proxy request to backend with user_id
    const response = await fetch(
      `${BACKEND_API_URL}/experiments?user_id=${session.user.id}&limit=${limit}&skip=${skip}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return c.json({ error: `Backend error: ${errorText}` }, response.status);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error("Get experiments API error:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Get specific experiment by ID
app.get("/experiments/:id", async (c: any) => {
  try {
    // Check authentication
    const { session } = await getUserAuth();
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const experimentId = c.req.param("id");

    // Proxy request to backend with user_id
    const response = await fetch(
      `${BACKEND_API_URL}/experiments/${experimentId}?user_id=${session.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return c.json({ error: `Backend error: ${errorText}` }, response.status);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error("Get experiment API error:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Delete experiment by ID
app.delete("/experiments/:id", async (c: any) => {
  try {
    // Check authentication
    const { session } = await getUserAuth();
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const experimentId = c.req.param("id");

    // Proxy request to backend with user_id
    const response = await fetch(
      `${BACKEND_API_URL}/experiments/${experimentId}?user_id=${session.user.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return c.json({ error: `Backend error: ${errorText}` }, response.status);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error("Delete experiment API error:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Account route
app.put("/account", async (c: any) => {
  try {
    const { session } = await getUserAuth();
    if (!session) {
      return c.json({ error: "Unauthorized" }, 400);
    }

    const body = (await c.req.json()) as {
      name?: string;
      email?: string;
    };

    await db
      .update(users)
      .set({ ...body })
      .where(eq(users.id, session.user.id));

    revalidatePath("/account");
    return c.json({ message: "ok" });
  } catch (error) {
    console.error("Account API error:", error);
    return c.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export default app;

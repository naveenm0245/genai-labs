import app from "@/lib/api/app";
import { Context } from "hono";

type Handler = (req: Request) => Promise<Response> | Response;

const handler = (method: string): Handler => {
  return async (req: Request) => {
    if (req.method !== method) {
      return new Response("Method Not Allowed", { status: 405 });
    }
    return app.fetch(req);
  };
};

export const GET = handler("GET");
export const POST = handler("POST");
export const PUT = handler("PUT");
export const DELETE = handler("DELETE");
export const PATCH = handler("PATCH");

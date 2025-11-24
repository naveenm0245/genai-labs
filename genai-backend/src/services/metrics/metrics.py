import re
from typing import Dict


def calculate_quality_metrics(response: str) -> Dict[str, float]:
    metrics = {}
    
    # 1. Completeness Score (0-1)
    # Measures if response has substantial content
    word_count = len(response.split())
    sentence_count = len(re.findall(r'[.!?]+', response))
    completeness = min(1.0, (word_count / 50) * 0.5 + (sentence_count / 3) * 0.5)
    metrics["completeness"] = round(completeness, 3)
    
    # 2. Coherence Score (0-1)
    # Measures sentence structure and flow
    # Check for proper sentence endings
    proper_sentences = len(re.findall(r'[.!?]\s+[A-Z]', response))
    total_sentences = max(1, sentence_count)
    coherence = min(1.0, (proper_sentences / total_sentences) * 0.7 + 0.3)
    metrics["coherence"] = round(coherence, 3)
    
    # 3. Length Appropriateness (0-1)
    # Optimal length is between 50-500 words
    if word_count < 50:
        length_score = word_count / 50
    elif word_count > 500:
        length_score = max(0.3, 1.0 - (word_count - 500) / 1000)
    else:
        length_score = 1.0
    metrics["length_appropriateness"] = round(length_score, 3)
    
    # 4. Structural Quality (0-1)
    # Checks for paragraphs, lists, proper formatting
    has_paragraphs = len(response.split('\n\n')) > 1 or len(response.split('\n')) > 3
    has_punctuation = bool(re.search(r'[.!?]', response))
    has_capitalization = bool(re.search(r'[A-Z]', response))
    structural = (0.4 if has_paragraphs else 0) + (0.3 if has_punctuation else 0) + (0.3 if has_capitalization else 0)
    metrics["structural_quality"] = round(structural, 3)
    
    # 5. Overall Quality Score (weighted average)
    overall = (
        metrics["completeness"] * 0.3 +
        metrics["coherence"] * 0.3 +
        metrics["length_appropriateness"] * 0.2 +
        metrics["structural_quality"] * 0.2
    )
    metrics["overall_quality"] = round(overall, 3)
    
    return metrics


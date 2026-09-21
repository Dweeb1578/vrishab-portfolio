// How strongly each piece of work should count when a question is broad enough
// that several answers would all be correct: "what did you do at Speechify?",
// "what's your best project?", "tell me about your work".
//
// The reranker only measures how well a chunk matches the words of the
// question. It has no idea that the funnel audit matters more than a QR code
// generator, so on a broad question it effectively picks at random among
// loosely-matching chunks. These weights are the missing signal.
//
// Keys are the `section` values in data/rag-chunks.json EXACTLY as ingest.py
// writes them. A section with no entry here scores NEUTRAL, so nothing breaks
// if the resume grows a new heading.
export const NEUTRAL_WEIGHT = 3;

export const SECTION_WEIGHT: Record<string, number> = {
    // The headline work: production systems, real money, or genuinely novel.
    'Founding GTM Engineer at SpeechifyAI': 5,
    'VoiceMOS Challenge 2026 winner (Track 1), and my first research paper': 5,
    'Speechify Signal Room': 5,
    'Portfolio RAG AI': 5,
    'GTM Engineer Intern at Zenskar': 4.5,

    // Strong, shipped, but narrower in scope.
    'Plain Support Router': 4,
    'Outbound Metrics Dashboard': 4,
    'speechify.ai Comparison & Alternatives Clusters': 4,
    'Agent Continuity Broker': 4,
    'Projects Built at SpeechifyAI': 4,
    'Reddit Intent Engine': 3.5,

    // Real, but student-era or small in scope. Still answerable if asked
    // directly, just not what a broad question should surface first.
    'PM Coach AI': 2.5,
    'VC Outreach Automation': 2,
    'Sentiment Auto-Router': 2,
    'Dynamic QR Code Generator': 1.5,

    // Case-study decks from coursework and consulting. Correct to mention when
    // asked, wrong to lead with.
    'ECOX LABS (Agri-Waste Supply Chain)': 1.5,
    'FinEase (Fintech for Gig Economy)': 1.5,
    'Blinkit (Churn Prediction & Flexi-Delivery)': 1.5,
    'WinZO (Growth & Localization Case Study)': 1.5,
    'Style-Pronto (Fashion Q-Commerce Venture)': 1.5,
    'Purple Pandit (B2B Lead Generation Strategy)': 1.5,
    'Instagram (Onboarding UX Audit)': 1.5,
};

// Applied as a multiplier on the reranker's own score. Deliberately gentle:
// a direct question ("what is the Signal Room?") scores ~0.99 on the right
// chunk and must still win, so weight decides ties rather than overruling
// relevance. Range is roughly 0.72x (weight 1) to 1.16x (weight 5).
export function weightMultiplier(section: string | undefined): number {
    const w = section === undefined ? undefined : SECTION_WEIGHT[section];
    return 1 + ((w ?? NEUTRAL_WEIGHT) - NEUTRAL_WEIGHT) * 0.08;
}

// What to lead with when the question is "what's your best work" and nothing
// more specific is being asked. Kept short on purpose: a list of nine is not a
// recommendation.
export const HEADLINE_WORK = [
    'the SpeechifyAI revenue system as a whole, including the six production agents and speed-to-lead',
    'the signup funnel audit that found the fraud operation and the 26 uncontacted buyers',
    'winning Track 1 of the VoiceMOS Challenge 2026, which is also my first research paper',
];

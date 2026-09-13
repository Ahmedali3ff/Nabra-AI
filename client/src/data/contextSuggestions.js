/**
 * Voxena — Context Suggestions static data.
 *
 * IMPORTANT: These suggestions are entirely rule-based (static data).
 * No machine learning, no LLM inference, no network requests.
 * Deterministic, offline-capable, and appropriate for accessibility/emergency use.
 */

export const CONTEXT_NAMES = [
  "Meeting",
  "Daily Conversation",
  "Classroom",
  "Emergency",
  "Presentation",
];

export const contextSuggestions = {
  "Meeting": [
    "Can everyone hear me?",
    "I'd like to add something to that point.",
    "Could we revisit the agenda?",
    "I need a moment to think.",
    "Let's schedule a follow-up.",
    "I agree with what was said.",
    "I have a question about that.",
    "Can you please repeat that?",
  ],
  "Daily Conversation": [
    "Good morning!",
    "How are you doing today?",
    "I'm doing well, thank you.",
    "Could you help me with something?",
    "I didn't quite catch that.",
    "Thank you very much.",
    "See you later!",
    "I need a moment.",
  ],
  "Classroom": [
    "I have a question.",
    "Could you explain that again?",
    "I understand now, thank you.",
    "I need more time, please.",
    "I'm ready to answer.",
    "May I be excused?",
    "I didn't finish yet.",
    "Can we take a short break?",
  ],
  "Emergency": [
    "I need help immediately.",
    "Please call an ambulance.",
    "I am having a medical emergency.",
    "My address is:",
    "Please call the police.",
    "I cannot breathe properly.",
    "I need someone with me now.",
    "I am in danger.",
  ],
  "Presentation": [
    "Today I'll be talking about:",
    "Let me show you the next slide.",
    "This chart illustrates:",
    "In summary,",
    "Are there any questions?",
    "To conclude,",
    "The key takeaway is:",
    "Thank you for your attention.",
  ],
};

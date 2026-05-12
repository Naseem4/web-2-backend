// Shared constants for submission validation
// Used in both validateSubmission middleware and Submission model

export const ALLOWED_MAIN_GOALS = [
  "lose_weight",
  "gain_muscle",
  "stay_fit",
  "healthy_habits",
] as const;

export const ALLOWED_ADDONS = [
  "workout",
  "meal",
  "tracking",
  "macros",
  "support",
  "guidance",
] as const;

export const ALLOWED_FITNESS_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;
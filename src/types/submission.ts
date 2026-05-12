// Type definitions for the Submission object
// Keeps the codebase type-safe and documents the data structure
// Maps to the Mongoose schema in the backend

type GoalKey = "lose_weight" | "gain_muscle" | "stay_fit" | "healthy_habits";

export type Submission = {
  _id: string;          // MongoDB document ID
  userId: string;       // References the authenticated user
  offerId: number;      // References the selected offer (1, 2, or 3)
  mainGoal: GoalKey;    // Main fitness goal selected by the user
  selectedAddons: string[]; // List of selected add-ons
  goal?: string;        // Optional: diet goal written or selected by the user
  calories?: number;    // Optional: daily calorie target
  fitnessLevel?: string; // Optional: "Beginner" | "Intermediate" | "Advanced"
  workoutDays?: number;  // Optional: number of workout days per week (2–6)
  createdAt: Date;       // Submission timestamp
};

// The payload shape sent from the frontend to POST /api/submissions
export type SubmitPayload = {
  offerId: number;
  mainGoal: GoalKey;
  selectedAddons: string[];
  goal?: string;
  calories?: number;
  fitnessLevel?: string;
  workoutDays?: number;
};
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    /**
     * @field isActive
     * Controls whether the account can log in.
     * Admin can set this to false to suspend a user without deleting them.
     * Checked in the login controller before issuing a JWT.
     */
    isActive: {
      type: Boolean,
      default: true,
    },

    /**
     * @field lastLoginAt
     * Updated every time the user logs in successfully.
     * Used by the admin dashboard to show last activity.
     * Helps detect stale or abandoned accounts.
     */
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
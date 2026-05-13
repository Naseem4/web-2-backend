const mongoose = require("mongoose");

const fitnessPlanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        goal: {
            type: String,
            required: true
        },

        workoutDays: {
            type: Number,
            required: true
        },

        nutritionNotes: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("FitnessPlan", fitnessPlanSchema);
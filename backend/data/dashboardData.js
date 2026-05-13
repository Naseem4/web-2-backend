const dashboardData = {
    name: "Mohamad",

    weeklyProgress: [
        { day: "Sat", burnt: 400, target: 500 },
        { day: "Sun", burnt: 600, target: 500 },
        { day: "Mon", burnt: 300, target: 500 },
        { day: "Tue", burnt: 700, target: 500 },
        { day: "Wed", burnt: 540, target: 500 },
        { day: "Thu", burnt: 450, target: 500 },
        { day: "Fri", burnt: 100, target: 500 }
    ],

    stats: [
        { title: "Workouts", value: 12 },
        { title: "Calories", value: 2200 },
        { title: "Exercises", value: 48 },
        { title: "Streak", value: 5 }
    ],

    categories: [
        { name: "Chest", value: 69 },
        { name: "Back", value: 80 },
        { name: "Legs", value: 24 },
        { name: "Hands", value: 45 }
    ],

    sleep: [
        { name: "hours", value: 8 },
        { name: "minutes", value: 20 }
    ],

    nutrition: {
        protein: 150,
        carbs: 190,
        fat: 65
    },

    water: {
        consumed: 2,
        goal: 3
    }
};

module.exports = dashboardData;
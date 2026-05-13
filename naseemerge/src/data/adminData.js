const adminData = {
    stats: [
        { title: "Total Users", value: "1,284", trend: "+2%", icon: "👥" },
        { title: "Orders", value: "342", trend: "+12%", icon: "📦" },
        { title: "Revenue", value: "$18.6K", trend: "+5%", icon: "💰" },
        { title: "Pending", value: "27", trend: "-3%", icon: "⏳" },
    ],

    analytics: [
        { name: "User Growth", value: 78 },
        { name: "Order Completion", value: 64 },
        { name: "Support Response", value: 86 },
        { name: "System Health", value: 92 },
    ],

    users: [
        {
            name: "Adam Birawi",
            email: "adam@email.com",
            role: "User",
            status: "Active",
        },
        {
            name: "Sarah Ahmad",
            email: "sarah@email.com",
            role: "Admin",
            status: "Active",
        },
    ],

    orders: [
        {
            id: "#1024",
            customer: "Adam Birawi",
            type: "Meal Plan",
            status: "Completed",
            amount: "$45",
        },
    ],

    activities: [
        "New user registered",
        "Order waiting for approval",
        "Admin updated permissions",
    ]
};

export default adminData;
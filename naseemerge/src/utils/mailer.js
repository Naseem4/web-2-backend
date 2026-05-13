import nodemailer from "nodemailer";

/**
 * Nodemailer transporter configuration.
 * Uses Gmail SMTP with credentials from environment variables.
 */
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a subscription confirmation email to the user.
 * Called after a successful submission is saved to the database.
 */
export const sendSubscriptionEmail = async (toEmail, userName, planName) => {
  await transporter.sendMail({
    from: `"Fitness App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "✅ Subscription Confirmed",
    html: `
      <h2>Welcome, ${userName}!</h2>
      <p>You have successfully subscribed to the <strong>${planName}</strong> plan.</p>
      <p>Thank you for joining us!</p>
    `,
  });
};

/**
 * Sends a subscription cancellation email to the user.
 * Called when the subscription ends or is cancelled.
 */
export const sendCancellationEmail = async (toEmail, userName, planName) => {
  await transporter.sendMail({
    from: `"Fitness App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Subscription Ended",
    html: `
      <h2>Hello, ${userName}</h2>
      <p>Your <strong>${planName}</strong> subscription has ended.</p>
      <p>We hope to see you again soon!</p>
    `,
  });
};
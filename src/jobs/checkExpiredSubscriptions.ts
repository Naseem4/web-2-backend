import Submission from "../models/Submission";
import User from "../models/User";
import { sendCancellationEmail } from "../utils/mailer";

const planNames: Record<number, string> = {
  1: "Basic Plan",
  2: "Pro Plan",
  3: "Elite Plan",
};

/**
 * Checks for expired subscriptions daily.
 * Updates status to "expired" and sends cancellation email to the user.
 */
export const checkExpiredSubscriptions = async () => {
  try {
    const now = new Date();

    // Find all active subscriptions that have passed their expiry date
    const expiredSubmissions = await Submission.find({
      status: "active",
      expiresAt: { $lte: now },
    });

    for (const submission of expiredSubmissions) {
      // Update status to expired
      submission.status = "expired";
      await submission.save();

      // Send cancellation email to user
      const user = await User.findById(submission.userId);
      if (user) {
        const planName = planNames[submission.offerId] ?? "Selected Plan";
        await sendCancellationEmail(user.email, user.name, planName);
      }
    }

    console.log(`Checked ${expiredSubmissions.length} expired subscriptions`);
  } catch (error) {
    console.error("Error checking expired subscriptions:", error);
  }
};
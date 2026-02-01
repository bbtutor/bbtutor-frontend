"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

// TypeScript declaration for Facebook Pixel
declare global {
  interface Window {
    fbq?: (command: string, eventName: string, parameters?: object) => void;
  }
}

function SubmitReceiptContent() {
  const searchParams = useSearchParams();
  const [receiptMethod, setReceiptMethod] = useState<"email" | "whatsapp" | "">(
    "",
  );
  const lessonTitle = searchParams.get("lessonTitle") || "a lesson";
  const lessonPrice = searchParams.get("lessonPrice") || "0";

  const handleReceiptSubmission = async () => {
    // Track receipt submission with Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        content_name: `Succesful Purchase of - ${lessonTitle}`,
        content_category: "Payment Confirmation",
        currency: "NGN",
        value: parseFloat(lessonPrice) || 0, // Use lesson price or fallback to 0
      });
    }

    // Show thank you toast
    toast.success("Thank you for your purchase!");

    // Wait 2 seconds before opening email or WhatsApp
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const message = `Hello BB Tutors, \n I have completed payment for ${lessonTitle}. Please find my receipt attached for confirmation. Thank you!`;
    const encodedMessage = encodeURIComponent(message);

    if (receiptMethod === "email") {
      window.location.href = `mailto:bbtutors001@gmail.com?subject=Payment Receipt - ${lessonTitle}&body=${encodedMessage}`;
    } else if (receiptMethod === "whatsapp") {
      window.open(
        `https://wa.me/2348064982027?text=${encodedMessage}`,
        "_blank",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <AlertDialog open={true}>
        <AlertDialogContent className="bg-white max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto max-h-[80vh] overflow-y-auto left-1/2 -translate-x-1/2">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-sm sm:text-base">
              Submit Payment Receipt
            </AlertDialogTitle>
            <AlertDialogDescription>
              After completing your payment, please send your receipt to confirm
              your purchase
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              <strong>How to submit your receipt:</strong>
            </p>

            {/* Receipt Method Selection */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="receiptMethod"
                  value="email"
                  checked={receiptMethod === "email"}
                  onChange={(e) =>
                    setReceiptMethod(e.target.value as "email" | "whatsapp")
                  }
                  className="text-primary"
                />
                <span className="text-sm">Send via Email</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="receiptMethod"
                  value="whatsapp"
                  checked={receiptMethod === "whatsapp"}
                  onChange={(e) =>
                    setReceiptMethod(e.target.value as "email" | "whatsapp")
                  }
                  className="text-primary"
                />
                <span className="text-sm">Send via WhatsApp</span>
              </label>
            </div>

            {/* Contact Information Display */}
            {receiptMethod && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-medium text-gray-900">
                  {receiptMethod === "email" ? (
                    <>
                      Send your receipt to:{" "}
                      <span className="text-primary">
                        bbtutors001@gmail.com
                      </span>
                    </>
                  ) : (
                    <>
                      Send your receipt to:{" "}
                      <span className="text-primary">08064982027</span>{" "}
                      (WhatsApp)
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Introductory Message Template */}
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-gray-900 mb-1">
                Suggested message:
              </p>
              <p className="text-gray-600 italic">
                &quot;Hello BB Tutors, I have completed payment for{" "}
                {lessonTitle}. Please find my receipt attached for confirmation.
                Thank you!&quot;
              </p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="py-2 px-3 sm:py-2.5 sm:px-4 text-sm sm:text-base">
              <Link href="/video_lesson">Back</Link>
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-yellow py-2 px-3 sm:py-2.5 sm:px-4 text-sm sm:text-base"
              onClick={handleReceiptSubmission}
              disabled={!receiptMethod}
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function SubmitReceiptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmitReceiptContent />
    </Suspense>
  );
}

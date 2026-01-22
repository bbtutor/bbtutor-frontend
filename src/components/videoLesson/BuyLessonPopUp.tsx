"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface BuyLessonPopUpProps {
  lessonTitle: string;
  paymentLink: string;
}

export default function BuyLessonPopUp({
  lessonTitle,
  paymentLink,
}: BuyLessonPopUpProps) {
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [receiptMethod, setReceiptMethod] = useState<"email" | "whatsapp" | "">(
    "",
  );

  const handlePayWithBudPay = () => {
    // pass lesson.paymentlink to budpay
    window.open(paymentLink, "_blank");
  };

  const handleReceiptSubmission = () => {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-yellow mb-3">Buy this Lesson</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white max-w-[90vw] md:max-w-lg lg:max-w-xl max-h-[80vh] overflow-y-auto left-1/2 -translate-x-1/2 mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-sm sm:text-base">
            Choose Payment Method
          </AlertDialogTitle>
          <AlertDialogDescription>
            Select one of the following payment options to purchase this lesson
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Payment Options */}
        <div className="space-y-4 py-4">
          {/* Option 1: Bank Transfer */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              1. Transfer to our Account
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Account Number:</span> 0910263468
              </p>
              <p>
                <span className="font-medium">Account Name:</span> BB TUTORS LTD
              </p>
              <p>
                <span className="font-medium">Bank:</span> GT Bank
              </p>
            </div>
          </div>

          {/* Option 2: BudPay */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              2. Pay through BudPay
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Click the button below to proceed to BudPay payment gateway
            </p>
            <Button
              onClick={handlePayWithBudPay}
              className="w-full bg-primary text-white hover:bg-blue-700 py-2 px-3 sm:py-2.5 sm:px-4 text-sm sm:text-base"
            >
              Pay with BudPay
            </Button>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-yellow"
            onClick={() => setShowReceiptDialog(true)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      {/* Receipt Submission Dialog */}
      <AlertDialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <AlertDialogContent className="bg-white max-w-[85vw] sm:max-w-md md:max-w-lg lg:max-w-xl mx-4 max-h-[80vh] overflow-y-auto left-1/2 -translate-x-1/2">
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
            <AlertDialogCancel
              onClick={() => setShowReceiptDialog(false)}
              className="py-2 px-3 sm:py-2.5 sm:px-4 text-sm sm:text-base"
            >
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-yellow py-2 px-3 sm:py-2.5 sm:px-4 text-sm sm:text-base"
              onClick={handleReceiptSubmission}
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
}

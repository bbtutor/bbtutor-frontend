"use client";
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
  lessonPrice?: number;
}

export default function BuyLessonPopUp({
  lessonTitle,
  paymentLink,
  lessonPrice,
}: BuyLessonPopUpProps) {
  const handlePayWithBudPay = () => {
    // pass lesson.paymentlink to budpay
    window.open(paymentLink, "_blank");
  };

  const handleContinueToReceipt = () => {
    const receiptUrl = lessonPrice
      ? `/submit_receipt?lessonTitle=${encodeURIComponent(lessonTitle)}&lesson.amount=${lessonPrice}`
      : `/submit_receipt?lessonTitle=${encodeURIComponent(lessonTitle)}`;

    window.open(receiptUrl, "_blank");
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
            onClick={handleContinueToReceipt}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

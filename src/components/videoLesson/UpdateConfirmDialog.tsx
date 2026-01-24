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
} from "@/components/ui/alert-dialog";
import { Edit, AlertTriangle } from "lucide-react";

interface UpdateConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  lessonTitle: string;
  isLoading?: boolean;
}

export default function UpdateConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  lessonTitle,
  isLoading = false,
}: UpdateConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white max-w-md mx-auto left-1/2 -translate-x-1/2">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Edit className="h-5 w-5 text-blue-600" />
            </div>
            <AlertDialogTitle className="text-gray-900">
              Update Lesson
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to update{" "}
            <span className="font-semibold text-gray-900">
              &ldquo;{lessonTitle}&rdquo;
            </span>
            ? This will modify the lesson information and make the changes
            visible to all users.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Make sure all information is correct before
              confirming. Changes will be applied immediately.
            </p>
          </div>
        </div>

        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel
            disabled={isLoading}
            className="w-full sm:w-auto py-2 px-4 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Update Lesson
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

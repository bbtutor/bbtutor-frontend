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
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  lessonTitle: string;
  isLoading?: boolean;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  lessonTitle,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white max-w-md mx-auto left-1/2 -translate-x-1/2">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <AlertDialogTitle className="text-gray-900">
              Delete Lesson
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              &ldquo;{lessonTitle}&rdquo;
            </span>
            ? This action cannot be undone and will permanently remove the
            lesson.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> All lesson data including videos,
              descriptions, and payment information will be permanently deleted.
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
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Lesson
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

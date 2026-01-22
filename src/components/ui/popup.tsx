"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
  actionText?: string;
  onAction?: () => void;
}

export default function Popup({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
  actionText = "OK",
  onAction,
}: PopupProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div className="relative bg-white rounded-[10px] shadow-lg max-w-md w-full mx-auto transform transition-all duration-200 scale-100 opacity-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className="flex justify-center pt-8 pb-4">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              type === "success"
                ? "bg-yellow-100 text-yellow"
                : "bg-red-100 text-red-600",
            )}
          >
            {type === "success" ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed mb-6">{message}</p>

          {/* Action Button */}
          <Button
            onClick={handleAction}
            className={cn(
              "w-full h-12 text-base font-semibold transition-colors duration-200",
              type === "success"
                ? "bg-yellow hover:bg-yellow-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white",
            )}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
}

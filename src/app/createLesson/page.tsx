"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  BookOpen,
  DollarSign,
  Link,
  Tag,
  FileText,
  Video,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axiosClient from "@/lib/AxiosClientInstance";
import axios from "axios";

// Zod schema for create lesson form validation
const createLessonSchema = z.object({
  title: z
    .string()
    .min(1, "Lesson title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Price must be a positive number"),

  mediaUrl: z
    .string()
    .min(1, "Media URL is required")
    .url("Please enter a valid URL"),

  paymentLink: z
    .string()
    .min(1, "Payment link is required")
    .url("Please enter a valid URL"),

  tag: z
    .string()
    .min(1, "Tag is required")
    .min(2, "Tag must be at least 2 characters")
    .max(50, "Tag must not exceed 50 characters"),

  lessonsCovered: z
    .array(z.string().min(1, "Lesson topic cannot be empty"))
    .min(1, "At least one lesson topic is required")
    .max(10, "Maximum 10 lesson topics allowed"),
});

type CreateLessonFormData = z.infer<typeof createLessonSchema>;

function CreateLessonpage() {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [lessonsInput, setLessonsInput] = useState("");

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateLessonFormData>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      mediaUrl: "",
      paymentLink: "",
      tag: "",
      lessonsCovered: [],
    },
  });

  // Watch lessonsCovered array for real-time updates
  const lessonsCovered = watch("lessonsCovered");

  /**
   * Add lesson topics to the lessonsCovered array
   * Supports comma-separated input for bulk adding
   * Respects the maximum limit of 10 lessons
   */
  const addLesson = () => {
    if (lessonsInput.trim() && lessonsCovered.length < 10) {
      // Split by comma and filter out empty strings
      const newLessons = lessonsInput
        .split(",")
        .map((lesson) => lesson.trim())
        .filter((lesson) => lesson.length > 0);

      // Add lessons while respecting the maximum limit
      const availableSlots = 10 - lessonsCovered.length;
      const lessonsToAdd = newLessons.slice(0, availableSlots);

      if (lessonsToAdd.length > 0) {
        setValue("lessonsCovered", [...lessonsCovered, ...lessonsToAdd]);
        setLessonsInput("");

        // Show feedback if some lessons were truncated
        if (newLessons.length > availableSlots) {
          toast.info(
            `Added ${lessonsToAdd.length} lessons. Maximum 10 lessons allowed.`,
          );
        }
      }
    }
  };

  /**
   * Remove a lesson topic from the lessonsCovered array
   * @param index - Index of the lesson to remove
   */
  const removeLesson = (index: number) => {
    const updatedLessons = lessonsCovered.filter((_, i) => i !== index);
    setValue("lessonsCovered", updatedLessons);
  };

  /**
   * Handle form submission
   * Calls Next.js API route to create lesson
   */
  const onSubmit = async (data: CreateLessonFormData) => {
    setIsLoading(true);

    try {
      // Show loading toast
      toast.loading("Creating lesson...", { id: "create-lesson" });

      // Call Next.js API route for creating lesson
      await axiosClient.post("/createLesson", data);

      // Show success notification
      toast.success("Lesson created successfully!", { id: "create-lesson" });

      // Reset form to initial state
      setValue("title", "");
      setValue("description", "");
      setValue("price", "");
      setValue("mediaUrl", "");
      setValue("paymentLink", "");
      setValue("tag", "");
      setValue("lessonsCovered", []);
      setLessonsInput("");

      // Optional: Redirect to lessons page or stay on form
      // router.push("/lessons");
    } catch (error) {
      console.error("Create lesson error:", error);

      // Handle different error types
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create lesson";
        toast.error(message, { id: "create-lesson" });
      } else {
        toast.error("An unexpected error occurred", { id: "create-lesson" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen gradient-bg px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Create New Lesson
            </h1>
            <p className="text-gray-600">Share your knowledge with students</p>
          </div>

          {/* Create Lesson Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-3">
              <Label
                htmlFor="title"
                className="text-sm sm:text-base font-medium"
              >
                Lesson Title
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter lesson title"
                  {...register("title")}
                  className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-sm sm:text-base font-medium"
              >
                Description
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this lesson"
                  {...register("description")}
                  className={`pl-9 sm:pl-10 min-h-32 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 resize-y ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  rows={4}
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price and Tag - Two Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Price Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="price"
                  className="text-sm sm:text-base font-medium"
                >
                  Price (₦)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    {...register("price")}
                    className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                      errors.price ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Tag Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="tag"
                  className="text-sm sm:text-base font-medium"
                >
                  Tag
                </Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    id="tag"
                    type="text"
                    placeholder="Primary 1 - 3"
                    {...register("tag")}
                    className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                      errors.tag ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.tag && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.tag.message}
                  </p>
                )}
              </div>
            </div>

            {/* Media URL and Payment Link - Two Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Media URL Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="mediaUrl"
                  className="text-sm sm:text-base font-medium"
                >
                  Media URL
                </Label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    id="mediaUrl"
                    type="url"
                    placeholder="Enter YouTube Preview link"
                    {...register("mediaUrl")}
                    className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                      errors.mediaUrl ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.mediaUrl && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.mediaUrl.message}
                  </p>
                )}
              </div>

              {/* Payment Link Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="paymentLink"
                  className="text-sm sm:text-base font-medium"
                >
                  Payment Link
                </Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    id="paymentLink"
                    type="url"
                    placeholder="Enter budPay Link"
                    {...register("paymentLink")}
                    className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                      errors.paymentLink ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.paymentLink && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.paymentLink.message}
                  </p>
                )}
              </div>
            </div>

            {/* Lessons Covered Field */}
            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-medium">
                Lessons Covered
              </Label>

              {/* Input for adding new lesson topics */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add lesson topics (separated by commas)"
                  value={lessonsInput}
                  onChange={(e) => setLessonsInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addLesson();
                    }
                  }}
                  className="h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                />
                <Button
                  type="button"
                  onClick={addLesson}
                  disabled={!lessonsInput.trim() || lessonsCovered.length >= 10}
                  className="h-11 sm:h-12 px-4 bg-yellow hover:bg-yellow/90 text-black font-semibold"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Display added lesson topics */}
              {lessonsCovered.length > 0 && (
                <div className="space-y-2">
                  {lessonsCovered.map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm text-gray-700">{lesson}</span>
                      <Button
                        type="button"
                        onClick={() => removeLesson(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {errors.lessonsCovered && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.lessonsCovered.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-sm sm:text-base text-white font-semibold bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Lesson...
                </>
              ) : (
                "Create Lesson"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateLessonpage;

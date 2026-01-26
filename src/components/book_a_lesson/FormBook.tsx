"use client";

import { Mail, Phone, User, GraduationCap, Book } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Title from "../ui/title";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Popup from "../ui/popup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Define validation schema using Zod
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[\d\s()-]+$/, "Please enter a valid phone number"),

  education: z.string().min(1, "Please select your education level"),

  subject: z
    .string()
    .min(2, "Please enter at least one subject")
    .max(200, "Subject must not exceed 200 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must not exceed 500 characters"),

  isParentGuardian: z.boolean(),
});

// TypeScript type inferred from schema
type FormData = z.infer<typeof formSchema>;

export default function FormBook() {
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      education: "",
      subject: "",
      message: "",
      isParentGuardian: false,
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    try {
      // Construct email body with form data
      const emailBody = `
New Lesson Booking Request

Student Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Education Level: ${data.education}
- Parent/Guardian: ${data.isParentGuardian ? "Yes" : "No"}

Course Details:
- Subject(s): ${data.subject}

Message:
${data.message}

---
This email was sent from the BB Tutors booking form.
      `.trim();

      // Encode the email body for URL
      const encodedBody = encodeURIComponent(emailBody);
      const encodedSubject = encodeURIComponent(
        `New Lesson Booking - ${data.firstName} ${data.lastName}`,
      );

      // Construct mailto link
      const mailtoLink = `mailto:bbtutors001@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      // Open default email client
      window.location.href = mailtoLink;

      // Reset form after successful submission
      reset();

      // Show success popup
      setShowSuccessPopup(true);
    } catch (error) {
      // Handle any errors
      console.error("Error submitting form:", error);

      // Show error popup
      setShowErrorPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside>
      <div className="text-center mb-6 sm:mb-8">
        <Title text="Book a Lesson" center />
      </div>

      {/* Form with RHF handleSubmit */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white py-6 px-5 sm:py-8 sm:px-6 lg:px-8 form-shadow rounded-lg space-y-5 sm:space-y-6"
      >
        {/* First Row - First and Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* First Name Input */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm sm:text-base">
              First name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                id="firstName"
                type="text"
                placeholder="Jane"
                {...register("firstName")}
                className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* Error message for first name */}
            {errors.firstName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Input */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm sm:text-base">
              Last name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
            </div>
            {/* Error message for last name */}
            {errors.lastName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Second Row - Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm sm:text-base">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Janedoe@gmail.com"
              {...register("email")}
              className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
          </div>
          {/* Error message for email */}
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Third Row - Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm sm:text-base">
            Phone number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              {...register("phone")}
              className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
          </div>
          {/* Error message for phone */}
          {errors.phone && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Fourth Row - Education Level */}
        <div className="space-y-2">
          <Label htmlFor="education" className="text-sm sm:text-base">
            Education Level
          </Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 z-10 pointer-events-none" />
            {/* Using Controller for Select component */}
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="education"
                    className={`w-full pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                      errors.education ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nursery-School">
                      Nursery School
                    </SelectItem>
                    <SelectItem value="Primary-School">
                      Primary School
                    </SelectItem>
                    <SelectItem value="Secondary-School">
                      Secondary School
                    </SelectItem>
                    <SelectItem value="Elementary-School">
                      Elementary School
                    </SelectItem>
                    <SelectItem value="Middle-School">Middle School</SelectItem>
                    <SelectItem value="High-School">High School</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {/* Error message for education level */}
          {errors.education && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.education.message}
            </p>
          )}
        </div>

        {/* Fifth Row - Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm sm:text-base">
            Subject
          </Label>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              id="subject"
              type="text"
              placeholder="Enter Subjects, separated by commas"
              {...register("subject")}
              className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                errors.subject ? "border-red-500" : ""
              }`}
            />
          </div>
          {/* Error message for subject */}
          {errors.subject && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Sixth Row - Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm sm:text-base">
            Message
          </Label>
          <div className="relative">
            <Textarea
              id="message"
              placeholder="Tell us about your learning goals, current challenges, or any specific topic you would like to focus on."
              {...register("message")}
              className={`px-4 sm:px-5 py-3 min-h-32 sm:min-h-40 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 resize-y ${
                errors.message ? "border-red-500" : ""
              }`}
              rows={4}
            />
          </div>
          {/* Error message for message */}
          {errors.message && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Checkbox Row */}
        <div className="flex items-start sm:items-center gap-2">
          <Controller
            name="isParentGuardian"
            control={control}
            render={({ field }) => (
              <input
                id="check"
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mt-0.5 sm:mt-0 h-4 w-4 shrink-0"
              />
            )}
          />
          <Label
            htmlFor="check"
            className="text-primary text-xs sm:text-sm leading-5 sm:leading-6 cursor-pointer"
          >
            I am a parent/guardian
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow w-full h-11 sm:h-12 text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Book a Lesson"}
        </Button>
      </form>

      {/* Success Popup */}
      <Popup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Booking Prepared!"
        message="Your booking request has been prepared! Please send the email."
        type="success"
        actionText="Got it"
      />

      {/* Error Popup */}
      <Popup
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title="Something went wrong"
        message="An error occurred. Please try again or contact us directly at bbtutors001@gmail.com"
        type="error"
        actionText="Close"
      />
    </aside>
  );
}

"use client";

import { Label } from "@radix-ui/react-label";
import {
  Book,
  Calendar,
  GraduationCap,
  Home,
  Mail,
  Phone,
  UploadCloud,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Popup from "../ui/popup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// TODO: Fix the paddding and spacing btw label and input

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

  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Calculate exact age
        const exactAge =
          monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

        return exactAge >= 15;
      },
      { message: "You must be at least 15 years old" },
    ),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[\d\s()-]+$/, "Please enter a valid phone number"),

  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),

  education: z.string().min(1, "Please select your education level"),

  subject: z
    .string()
    .min(2, "Please enter at least one subject")
    .max(200, "Subject must not exceed 200 characters"),

  cv: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "CV is required",
    )
    .refine(
      (files) => files instanceof FileList && files[0]?.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    )
    .refine((files) => {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return files instanceof FileList && validTypes.includes(files[0]?.type);
    }, "Only PDF, DOC, and DOCX files are accepted"),

  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(500, "Message must not exceed 500 characters"),
});

// TypeScript type inferred from schema
type FormData = z.infer<typeof formSchema>;

function TutorForm() {
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
      dob: "",
      phone: "",
      address: "",
      email: "",
      education: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    try {
      // Get CV filename
      const cvFileName = data.cv[0]?.name || "No file uploaded";

      // Construct email body with form data
      const emailBody = `
New Tutor Application

Personal Information:
- Name: ${data.firstName} ${data.lastName}
- Date of Birth: ${data.dob}
- Phone: ${data.phone}
- Address: ${data.address}
- Email: ${data.email}

Education & Expertise:
- Education Level: ${data.education}
- Subject(s): ${data.subject}
- CV: ${cvFileName}

Message:
${data.message}

---
This email was sent from the BB Tutors application form.
Note: Please request the CV file from the applicant directly.
      `.trim();

      // Encode the email body for URL
      const encodedBody = encodeURIComponent(emailBody);
      const encodedSubject = encodeURIComponent(
        `New Tutor Application - ${data.firstName} ${data.lastName}`,
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white py-6 px-5 sm:py-8 sm:px-6 lg:px-8 form-shadow rounded-lg space-y-5 sm:space-y-6 mt-6 max-w-2xl mx-auto"
      >
        {/* First Row - First and Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* First Name Input */}
          <div className="space-y">
            <Label htmlFor="firstName" className="text-sm sm:text-base">
              First name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                id="firstName"
                type="text"
                placeholder="Sochima"
                {...register("firstName")}
                className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
            </div>
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
                placeholder="Okoye"
                {...register("lastName")}
                className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Second Row - Date and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Date of Birth Input */}
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm sm:text-base">
              Date of birth
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                id="dob"
                type="date"
                {...register("dob")}
                className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                  errors.dob ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.dob && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.dob.message}
              </p>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm sm:text-base">
              Phone number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+234 903 000 0000"
                {...register("phone")}
                className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Third Row - Residential Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm sm:text-base">
            Residential Address
          </Label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              id="address"
              type="text"
              placeholder="Your home address"
              {...register("address")}
              className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                errors.address ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Fourth Row - Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm sm:text-base">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Sochima@gmail.com"
              {...register("email")}
              className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Fifth Row - Education Level */}
        <div className="space-y-2">
          <Label htmlFor="education" className="text-sm sm:text-base">
            Education Level
          </Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 z-10 pointer-events-none" />
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
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">
                      Bachelor&apos;s Degree
                    </SelectItem>
                    <SelectItem value="master">Master&apos;s Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate/PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.education && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.education.message}
            </p>
          )}
        </div>

        {/* Sixth Row - Subject */}
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
          {errors.subject && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Seventh Row - CV Upload */}
        <div className="space-y-2">
          <Label htmlFor="cv" className="text-sm sm:text-base">
            Upload your CV
          </Label>
          <div className="relative">
            <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("cv")}
              className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 file:mr-4 file:py-2 file:px-0 file:border-0 file:bg-transparent file:text-sm file:sm:text-base file:font-medium ${
                errors.cv ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.cv && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.cv?.message?.toString() || "Invalid file"}
            </p>
          )}
        </div>

        {/* Eighth Row - Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm sm:text-base">
            Message
          </Label>
          <div className="relative">
            <Textarea
              id="message"
              placeholder="Tell us about your teaching philosophy, experience, and why you would like to join our team"
              {...register("message")}
              className={`px-4 sm:px-5 py-3 min-h-32 sm:min-h-40 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 resize-y ${
                errors.message ? "border-red-500" : ""
              }`}
              rows={4}
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <p className="text-primary text-xs sm:text-sm leading-5 sm:leading-6">
          Application will be processed within 48 hours.
        </p>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow w-full h-11 sm:h-12 text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Submit Application"}
        </Button>
      </form>

      {/* Success Popup */}
      <Popup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Application Prepared!"
        message="Your application has been prepared! Please send the email to complete your submission."
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
    </>
  );
}

export default TutorForm;

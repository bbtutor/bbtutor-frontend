"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import axiosClient from "@/lib/AxiosClientInstance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

// Zod schema for login form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  // Hooks
  const router = useRouter();

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handle login form submission
   * Calls login API, stores user data, and redirects on success
   */
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      // Call Next.js API route for login
      const response = await axiosClient.post("/login", data);
      const user = response.data.user;
      console.log(user);

      setUser(user);

      // Show success notification
      toast.success("Login successful!");

      // Redirect to createLesson page
      router.push("/createLesson");
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error types
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Backend returned an error response
          const message =
            error.response.data?.message || error.response.data?.error;
          setLoginError(message || "Invalid Credentials");
          toast.error(message || "Invalid Credentials");
        } else if (error.request) {
          // Request made but no response received
          setLoginError(
            "Unable to connect to server. Please check your internet connection.",
          );
          toast.error("Unable to connect to server.");
        } else {
          // Error setting up the request
          setLoginError("An unexpected error occurred. Please try again.");
          toast.error("An unexpected error occurred.");
        }
      } else {
        // Non-Axios error
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setLoginError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center gradient-bg px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-6"
          >
            {/* Login Error Message */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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

            {/* Password Field */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm sm:text-base">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-gray-400 focus:ring-gray-400 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-sm sm:text-base text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;

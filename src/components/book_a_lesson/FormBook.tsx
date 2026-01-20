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

function FormBook() {
  return (
    <aside>
      <div className="text-center mb-6">
        <Title text="Book a Lesson" center />
      </div>
      <div className="bg-white py-8 px-8 form-shadow rounded-lg space-y-6">
        {/* First Row - First and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name Input */}
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="firstName"
                type="text"
                placeholder="Sochima"
                className="pl-10 h-12 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
          </div>

          {/* Last Name Input */}
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="lastName"
                type="text"
                placeholder="Okoye"
                className="pl-10 h-12 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Second Row - Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Sochima@gmail.com"
              className="pl-10 h-12 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Third Row - Phone Number */}
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              className="pl-10 h-12 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Fourth Row - Education Level */}
        <div className="space-y-1.5">
          <Label htmlFor="education">Education Level</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
            <Select>
              <SelectTrigger
                id="education"
                className="w-full pl-10 h-12 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              >
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="associate">Associate Degree</SelectItem>
                <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
                <SelectItem value="master">Master&apos;s Degree</SelectItem>
                <SelectItem value="doctorate">Doctorate/PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Fifth Row - Subject */}
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="subject"
              type="text"
              placeholder="Enter Subjects, separated by commas"
              className="pl-10 h-12 border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Sixth Row - Message */}
        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <div className="relative">
            <Textarea
              id="message"
              placeholder="Tell us about your learning goals, current challenges, or any specific topic you would like to focus on."
              className="px-5 min-h-50 border-gray-300 focus:border-gray-400 focus:ring-gray-400 resize-y"
            />
          </div>
        </div>

        {/* Sixth Row - Message */}
        <div className="space-x-2 flex items-center">
          <input id="check" type="checkbox" />
          <Label htmlFor="check" className="text-primary text-xs leading-6">
            I am a parent/guardian
          </Label>
        </div>

        <Button className="bg-yellow w-full">Book a Lesson</Button>
      </div>
    </aside>
  );
}

export default FormBook;

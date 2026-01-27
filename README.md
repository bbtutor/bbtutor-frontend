# BB Tutors - Online Mathematics Tutoring Platform

A modern, responsive web application for BB Tutors, providing comprehensive mathematics tutoring services for students from Nursery 1 through Senior Secondary 3.

## 🚀 Overview

BB Tutors is an online tutoring platform focused on mathematics education. The platform connects students with experienced tutors, offering both live lessons and pre-recorded video content to help students excel in their mathematical journey.

## ✨ Key Features

### For Students

- **Book Lessons**: Easy scheduling system for one-on-one tutoring sessions
- **Video Lessons**: Access to pre-recorded mathematics tutorials
- **Comprehensive Coverage**: Mathematics tutoring from Nursery 1 to SS3
- **Mobile Responsive**: Fully functional on all devices

### For Tutors

- **Become a Tutor**: Application system for qualified mathematics tutors
- **Lesson Management**: Create and manage video lessons

### Platform Features

- **User Authentication**: Secure login and registration system for tutors
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Real-time Communication**: WhatsApp integration for quick support

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 16.1.3** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Icon library
- **Poppins Font** - Typography

### State Management & Data

- **Zustand** - Lightweight state management
- **SWR** - Data fetching and caching
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form management with Zod validation

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── become_a_tutor/    # Tutor application
│   ├── book_a_lesson/     # Lesson booking
│   ├── createLesson/      # Lesson creation (protected)
│   ├── login/             # Authentication
│   ├── video_lesson/      # Video lessons
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── about/            # About page components
│   ├── become_a_tutor/   # Tutor application components
│   ├── book_a_lesson/    # Booking components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── ui/               # shadcn/ui components
│   └── videoLesson/      # Video lesson components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── store/                # Zustand state management
└── proxy.ts              # Route protection middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
    Do not clone without the permission of the owner/organization
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   Contact us for the environment variables
   ```

   Configure your environment variables in `.env.local`:
   - API endpoints
   - Authentication tokens
   - Other configuration secrets

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application includes a robust authentication system:

- **Protected Routes**: Lesson creation and management require authentication
- **Route Protection**: Middleware-based route protection in `proxy.ts`
- **Token Management**: Secure HTTP-only cookies for access tokens
- **User Sessions**: Persistent login state across page refreshes

## 🎨 Design System

### Color Scheme

- **Primary**: Custom brand colors for BB Tutors
- **Yellow**: Accent color for CTAs and highlights
- **Neutral**: Professional grays for text and backgrounds

### Typography

- **Font**: Poppins (weights 100-900)
- **Responsive**: Optimized for all screen sizes

### Components

- Built with shadcn/ui for consistency
- Custom components for specific use cases
- Fully responsive design patterns

## 📱 Responsive Design

The platform is fully responsive with:

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced experience for tablets (768px+)
- **Desktop**: Full-featured experience (1024px+)
- **Large Screens**: Optimized for 1440px+ displays

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Mobile Android 90+

## 📧 Contact & Support

- **WhatsApp**: +234 806 498 2027
- **Email**: Available through the platform
- **Author**: Favour Okpara

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Performance

- **Lighthouse Score**: Optimized for performance, accessibility, and SEO
- **Core Web Vitals**: Built to meet Google's performance standards
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster initial loads

---

**BB Tutors** - Empowering students to master mathematics with confidence and excellence.

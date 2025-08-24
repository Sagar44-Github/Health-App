# 🧠 HealthWise AI

<div align="center">

![HealthWise AI Banner](https://img.shields.io/badge/HealthWise%20AI-Your%20AI%20Health%20Assistant-blue?style=for-the-badge&logo=brain&logoColor=white)

**An intelligent, HIPAA-compliant health management platform powered by AI**

[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat&logo=supabase)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

[🚀 Live Demo](#-live-demo) • [📖 Documentation](#-documentation) • [⚡ Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

## 🌟 Overview

HealthWise AI is a comprehensive health management platform that combines artificial intelligence with modern web technologies to provide personalized healthcare assistance. Built with React, TypeScript, and Supabase, it offers a secure, scalable solution for managing personal health data, consulting with AI health assistants, and connecting with healthcare professionals.

## ✨ Key Features

### 🤖 AI-Powered Health Assistant

- **Intelligent Chat Interface** - Natural language health consultations
- **Symptom Analysis** - AI-driven symptom checker with health recommendations
- **Prescription AI** - Smart medication analysis and prescription insights
- **Personalized Health Tips** - Tailored wellness advice based on user data

### 📊 Health Management Dashboard

- **Comprehensive Health Records** - Centralized medical history management
- **Vital Signs Tracking** - Monitor heart rate, blood pressure, weight, and more
- **Medication Manager** - Smart reminders and interaction checking
- **Appointment Scheduling** - Seamless healthcare provider integration

### 🔐 Security & Compliance

- **HIPAA Compliant** - Medical-grade data encryption and security
- **Row-Level Security** - Granular access control with Supabase RLS
- **Secure Authentication** - Better-auth integration with session management
- **Data Privacy** - End-to-end encryption for sensitive health information

### 📱 Modern User Experience

- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark/Light Mode** - Adaptive theming with user preferences
- **Real-time Updates** - Live data synchronization across devices
- **Accessibility First** - WCAG 2.1 compliant interface design

## 🛠️ Technology Stack

<table>
<tr>
<td align="center" width="200px">

**Frontend**

- React 18.3.1
- TypeScript 5.5.3
- Vite.js 5.4.1
- Tailwind CSS
- Framer Motion
- Shadcn/ui

</td>
<td align="center" width="200px">

**Backend**

- Supabase
- PostgreSQL
- Better-auth
- Supabase Functions
- Row Level Security

</td>
<td align="center" width="200px">

**Development**

- ESLint
- PostCSS
- React Hook Form
- Zod Validation
- React Query

</td>
</tr>
</table>

## 🚀 Live Demo

Experience HealthWise AI in action: **[Visit Live App](https://your-healthwise-ai.vercel.app)**

_Demo credentials available upon request_

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/healthwise-ai.git
cd healthwise-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```
healthwise-ai/
├── 📁 public/                  # Static assets
├── 📁 src/
│   ├── 📁 components/          # React components
│   │   ├── 📁 auth/           # Authentication components
│   │   ├── 📁 ui/             # Reusable UI components (Shadcn)
│   │   ├── ChatInterface.tsx   # AI chat component
│   │   ├── HealthDashboard.tsx # Main dashboard
│   │   └── ...
│   ├── 📁 pages/              # Page components
│   ├── 📁 contexts/           # React contexts
│   ├── 📁 hooks/              # Custom hooks
│   ├── 📁 lib/                # Utility functions
│   └── 📁 integrations/       # Supabase integration
├── 📁 supabase/               # Database schema & functions
│   ├── 📁 migrations/         # Database migrations
│   └── 📁 functions/          # Edge functions
├── 📁 docs/                   # Documentation
└── 📁 tests/                  # Test files
```

## 🎯 Core Features Deep Dive

### AI Health Assistant

```typescript
// AI-powered health consultation
const healthAssistant = {
  capabilities: [
    "Symptom analysis and recommendations",
    "Medication interaction checking",
    "Health risk assessment",
    "Personalized wellness planning",
  ],
  security: "HIPAA-compliant data processing",
  availability: "24/7 intelligent responses",
};
```

### Health Data Management

- **Comprehensive Records**: Complete medical history tracking
- **Vital Signs Monitoring**: Real-time health metrics
- **Medication Management**: Smart reminders and interaction alerts
- **Emergency Contacts**: Quick access to critical information

### Telehealth Integration

- **Doctor Consultations**: Video/chat sessions with healthcare providers
- **Appointment Scheduling**: Seamless calendar integration
- **Prescription Management**: Digital prescription handling
- **Medical Facility Locator**: Find nearby hospitals and pharmacies

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication
VITE_BETTER_AUTH_SECRET=your_auth_secret_key

# Optional: Analytics & Monitoring
VITE_ANALYTICS_ID=your_analytics_id
```

### Database Setup

1. **Create Supabase Project**

   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Initialize and link project
   supabase init
   supabase link --project-ref your-project-ref
   ```

2. **Apply Database Migrations**

   ```bash
   # Push database schema
   supabase db push

   # Verify setup
   node scripts/test-db-connection.js
   ```

## 📊 Database Schema

Our comprehensive database includes 16 optimized tables:

- **👤 User Management**: profiles, preferences, emergency_contacts
- **🏥 Healthcare**: doctors, consultations, appointments
- **📋 Health Records**: health_records, vital_signs, prescriptions
- **💊 Medications**: medication_reminders with smart scheduling
- **🤖 AI Features**: ai_conversations, symptom_assessments
- **🏢 Facilities**: medical_facilities with geolocation
- **📚 Content**: health_tips, user_health_tips, feedback

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel

# Set environment variables in Vercel dashboard
# Deploy with automatic GitHub integration
```

### Netlify

```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

### Self-Hosted

```bash
# Build for production
npm run build

# Serve with your preferred static hosting
# Ensure environment variables are set
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Test database connection
node scripts/test-db-connection.js

# Lint and format
npm run lint
```

## 📖 Documentation

- [📋 Database Schema](docs/DATABASE_SCHEMA.md) - Complete database documentation
- [🔧 Setup Guide](docs/DATABASE_SETUP.md) - Step-by-step setup instructions
- [📚 API Reference](docs/API_REFERENCE.md) - Code examples and API usage
- [📊 Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md) - Technical overview

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use conventional commits
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Medical Disclaimer

**Important**: HealthWise AI provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.

## 👥 Team & Support

**Developer**: [Your Name]  
**Email**: [your.email@example.com]  
**Project**: HealthWise AI

### Getting Help

- 🐛 [Report bugs](https://github.com/yourusername/healthwise-ai/issues)
- 💬 [Ask questions](https://github.com/yourusername/healthwise-ai/discussions)
- 📧 [Contact support](mailto:support@healthwise-ai.com)

## 🗺️ Roadmap

### 🚀 Upcoming Features

- [ ] **Wearable Device Integration** - Apple Health, Fitbit, Garmin
- [ ] **Medication Interaction Checker** - Advanced drug interaction analysis
- [ ] **Voice Commands** - Hands-free interaction capabilities
- [ ] **Multi-language Support** - Localization for global users
- [ ] **Advanced Analytics** - Health trend analysis and insights
- [ ] **Insurance Integration** - Claims and coverage management

### 🎯 Version 2.0 Goals

- [ ] Machine Learning health predictions
- [ ] Blockchain medical records
- [ ] IoT device integration
- [ ] Advanced telehealth features

## 🌟 Show Your Support

If you find this project helpful:

- ⭐ **Star this repository**
- 🍴 **Fork and contribute**
- 📢 **Share with others**
- 🐛 **Report issues**
- 💡 **Suggest features**

---

<div align="center">

**Built with ❤️ for accessible healthcare technology**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/healthwise-ai?style=social)](https://github.com/yourusername/healthwise-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/healthwise-ai?style=social)](https://github.com/yourusername/healthwise-ai/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/healthwise-ai)](https://github.com/yourusername/healthwise-ai/issues)

</div>

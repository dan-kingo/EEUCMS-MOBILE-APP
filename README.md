
# EEUCMS Mobile App

This is the official mobile application for the **Ethiopian ELectric Utility Complaint Management System (EEUCMS)**. The app allows users to easily make complaints, view complaint history, and manage their profiles. It uses an AI-based backend to classify, route, and escalate complaints for faster resolution.

## 🚀 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **UI Library**: [React Native Paper](https://callstack.github.io/react-native-paper/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **API**: Axios for backend communication
- **Toast Messages**: `react-native-flash-message`

## 📁 Folder Structure

```

app/
├── tabs/                  # Tab navigation pages
│   ├── home.tsx
│   ├── make-complaint.tsx
│   └── profile.tsx
├── login.tsx              # Login screen
├── register.tsx           # Register screen
assets/
├── constants/
│   └── profileData.ts     # Profile form field definitions
hooks/
├── useUpdate.ts           # Profile update logic
├── useUser.ts             # Fetch and store current user
store/
├── userStore.ts           # Zustand user state
utils/
├── profileUpdateSchema.ts # Profile validation schema

````

## 🔧 Features

- 🔐 Secure login & registration with OTP
- 📋 Submit complaints with optional file upload
- 💬 Integrated AI chatbot (planned)
- 🔎 View and filter complaint history
- 👤 Edit profile information
- ☁️ Cloudinary file storage (planned for uploads)
- 📱 Fully responsive mobile UI with dark mode

## 🛠️ Installation

```bash
# 1. Clone the repo
git clone https://github.com/dan-kingo/aicms-mobile.git
cd aicms-mobile

# 2. Install dependencies
npm install

# 3. Start development server
npx expo start
````

> ⚠️ Requires Expo CLI and Node.js installed.

## 🔑 Environment Variables

Create a `.env` file with:

```
API_BASE_URL=your_api_url
```

> Make sure you use `withCredentials: true` in all axios requests.

## 🧠 Important Design Decisions

* All design tokens (fonts, colors) follow EEUCMS branding:

  * Primary: `#ff784b`
  * Secondary: `#c6635a`
  * Background: `#121212`
  * Font: `Palanquin`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a pull request



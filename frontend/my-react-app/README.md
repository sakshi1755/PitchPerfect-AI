# 🎯 PitchPerfect AI – Frontend

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</div>

<br />

<div align="center">
  <h3>🚀 Empowering users to craft, analyze, and perfect their pitches with AI assistance</h3>
  <p>A sleek, responsive, and high-performance React.js + Vite frontend for the PitchPerfect AI platform</p>
</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Assisted Pitch Creation** | Intuitive UI to interact with backend-powered AI for pitch generation |
| 💬 **Real-Time Feedback** | Instantly get suggestions for clarity, engagement, and persuasiveness |
| ⚡ **High Performance** | Fast load times and hot module replacement via Vite |
| 📱 **Responsive Design** | Optimized for all devices and screen sizes |
| ♿ **Accessibility First** | Built with WCAG guidelines in mind |
| 🧱 **Modular Architecture** | Scalable and maintainable React codebase |

---

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `18.0.0` or higher
- **npm** `9.0.0` or higher (or **yarn** `1.22.0+`)

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sharmamayankkkk/PitchPerfect-AI.git
   cd PitchPerfect-AI/frontend/my-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running! 🎉

---

## 📁 Project Structure

```
my-react-app/
├── 📁 public/                 # Static files & assets
│   ├── favicon.ico
│   └── index.html
├── 📁 src/
│   ├── 📁 assets/            # Images, icons, and media files
│   ├── 📁 components/        # Reusable UI components
│   │   ├── common/           # Shared components
│   │   ├── forms/            # Form-related components
│   │   └── layout/           # Layout components
│   ├── 📁 pages/             # Page-level views
│   │   ├── Home/
│   │   ├── Dashboard/
│   │   └── PitchEditor/
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 services/          # API calls and external services
│   ├── 📁 utils/             # Utility functions
│   ├── 📁 styles/            # Global styles and themes
│   ├── App.jsx               # Root application component
│   └── main.jsx              # Application entry point
├── .eslintrc.cjs             # ESLint configuration
├── .gitignore                # Git ignore rules
├── index.html                # HTML template
├── package.json              # Project dependencies & scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Project documentation
```

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Fix ESLint issues automatically |

---

## 🏗️ Building for Production

1. **Create production build**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Preview production build** (optional)
   ```bash
   npm run preview
   # or
   yarn preview
   ```

The build artifacts will be stored in the `dist/` directory, ready for deployment! 📦

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | ^18.2.0 |
| **Vite** | Build Tool & Dev Server | ^4.4.0 |
| **JavaScript (ES6+)** | Programming Language | Latest |
| **ESLint** | Code Linting | ^8.45.0 |

</div>

### 🔌 Additional Libraries

- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant forms with validation
- **Framer Motion** - Animation library

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=PitchPerfect AI
VITE_APP_VERSION=1.0.0
```

---

## 🤝 Contributing

We love contributions! Here's how you can help make PitchPerfect AI better:

1. **🍴 Fork the repository**
   
2. **🌿 Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **💾 Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **🚀 Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **🔃 Open a Pull Request**

### 📋 Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure all tests pass before submitting

---

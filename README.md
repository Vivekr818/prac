# Clean & Green Community Platform

A digital platform that empowers citizens and communities to participate in environmental care through cleanup coordination, social networking, and smart issue reporting.

## Features

- 🌱 **Community Cleanup Coordination** - Create and join environmental cleanup events
- 📱 **Green Social Feed** - Share eco-friendly actions and inspire others
- 📍 **Smart Issue Reporting** - Report environmental issues with AI categorization
- 🗺️ **Interactive Maps** - Visualize issues and events on interactive maps
- 👥 **Authority Dashboard** - Tools for local authorities to manage reports
- 📊 **Impact Analytics** - Track community environmental impact

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Maps**: Mapbox GL JS
- **Authentication**: Auth0 / Firebase Auth
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API keys and configuration

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/     # Reusable UI components
├── services/       # API services and external integrations
├── store/          # Redux store and slices
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── theme/          # Material-UI theme configuration
└── App.tsx         # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
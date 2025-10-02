import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { EventsPage } from './pages/EventsPage';
import { ReportPage } from './pages/ReportPage';
import { ProfilePage } from './pages/ProfilePage';
import { SocialFeedPage } from './pages/SocialFeedPage';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute requireAuth={false}>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthPage />
                </ProtectedRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/social"
              element={
                <ProtectedRoute>
                  <SocialFeedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <EventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/social"
              element={
                <ProtectedRoute>
                  <SocialFeedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landing"
              element={<LandingPage />}
            />

            {/* Placeholder routes for future pages */}
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <div>Map View - Coming Soon</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/impact"
              element={
                <ProtectedRoute>
                  <div>Impact Analytics - Coming Soon</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute>
                  <div>Achievements - Coming Soon</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <div>Settings - Coming Soon</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/authority"
              element={
                <ProtectedRoute requireAuthority>
                  <div>Authority Dashboard - Coming Soon</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
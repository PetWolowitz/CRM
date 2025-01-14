import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { useAuth } from './hooks/use-auth';

// Lazy loading delle pagine
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts').then(module => ({ default: module.Contacts })));
const Customers = lazy(() => import('./pages/Customers').then(module => ({ default: module.Customers })));
const Deals = lazy(() => import('./pages/Deals').then(module => ({ default: module.Deals })));
const Tasks = lazy(() => import('./pages/Tasks').then(module => ({ default: module.Tasks })));
const Settings = lazy(() => import('./pages/Settings').then(module => ({ default: module.Settings })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const CalendarPage = lazy(() => import('./pages/Calendar').then(module => ({ default: module.CalendarPage })));
const Invoices = lazy(() => import('./pages/Invoices').then(module => ({ default: module.Invoices })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Error404 = lazy(() => import('./pages/Error404').then(module => ({ default: module.Error404 })));

export function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      
      <Route
        path="/"
        element={
          user ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Dashboard />
          </Suspense>
        } />
        <Route path="contacts" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Contacts />
          </Suspense>
        } />
        <Route path="customers" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Customers />
          </Suspense>
        } />
        <Route path="deals" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Deals />
          </Suspense>
        } />
        <Route path="calendar" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <CalendarPage />
          </Suspense>
        } />
        <Route path="tasks" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Tasks />
          </Suspense>
        } />
        <Route path="invoices" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Invoices />
          </Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Settings />
          </Suspense>
        } />
        <Route path="profile" element={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Profile />
          </Suspense>
        } />
      </Route>

      <Route path="*" element={
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <Error404 />
        </Suspense>
      } />
    </Routes>
  );
}
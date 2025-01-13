import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Contacts } from './pages/Contacts';
import { Customers } from './pages/Customers';
import { Deals } from './pages/Deals';
import { Tasks } from './pages/Tasks';
import { Settings } from './pages/Settings';
import { CalendarPage } from './pages/Calendar';
import { Login } from './pages/Login';
import { Invoices } from './pages/Invoices';
import { Error404 } from './pages/Error404';
import { useAuth } from './hooks/use-auth';

export function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Caricamento...</div>;
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
        <Route index element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="customers" element={<Customers />} />
        <Route path="deals" element={<Deals />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
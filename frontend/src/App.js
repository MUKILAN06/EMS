import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Leave from './pages/Leave';
import IssueTracker from './pages/IssueTracker';
import Login from './pages/Login';
import CalendarPage from './pages/CalendarPage';
import EmployeeCreation from './pages/EmployeeCreation';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1 p-4 md:p-8 lg:p-12">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/leave" element={<Leave />} />
                        <Route path="/issues" element={<IssueTracker />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/create-employee" element={<EmployeeCreation />} />
                        {/* Add more routes as implemented */}
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

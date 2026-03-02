import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { ForgotPassword } from '../features/auth/pages/ForgotPassword';

import { ProtectedRoute } from '../shared/components/ProtectedRoute';
import { MainLayout } from '../shared/layouts/MainLayout';
import { AuthLayout } from '../shared/layouts/AuthLayout';
// import { DashboardPage } from '../features/dashboard/pages/DashboardPage';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              {/* <DashboardPage /> */}
              <div>
                <h1>Main</h1>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
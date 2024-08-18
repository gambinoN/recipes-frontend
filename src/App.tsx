import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from './constants/routes';
import Header from './components/header';
import { headerLinks } from './constants/headerLinks';
import ProtectedRoute from './components/ProtectedRoute';


/* Lazy importing page to increase performance */
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <Router>
      <Header title="Recipes" links={headerLinks} isLoggedIn={true} />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<Register />} />
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense> 
      </Router>
    </>
  );
}

export default App;

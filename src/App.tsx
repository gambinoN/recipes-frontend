import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from './constants/routes';
import Header from './components/header';
import { headerLinks } from './constants/headerLinks';


/* Lazy importing page to increase performance */
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));


function App() {
  return (
    <>
      <Router>
      <Header title="Recipes" links={headerLinks} isLoggedIn={true} />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<Register />} />
            <Route
            path={ROUTES.DASHBOARD}
            element={
                <Dashboard />
            }
          />
                <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense> 
      </Router>
    </>
  );
}

export default App;

import React, { ReactNode } from 'react';
import './App.css';
import './styles/sb-admin-2.min.css'
import './assets/font-awesome/css/all.min.css'

import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Login } from './pages/Account';
import { Admin } from './pages/Admin';
import { AccountState } from './store/account/types';
import { useSelector } from 'react-redux';
import { AppState } from './store';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {

  const account:AccountState = useSelector((state: AppState) => state.account);

  // const isAuthenticated = true;
  // account.token = 'abc';

  return account.token ? <>{children}</> : <Login />;
}

function App() {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Routes>
        <Route path='*'
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        </Routes>
      </Router>
    </div>

  );
}

export default App;

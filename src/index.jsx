import { auth } from 'lib/firebase';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';
import ReportsPage from 'pages/ReportsPage';
import { React } from 'react';
import ReactDOM from 'react-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'styles/base.css';
import 'styles/components.css';
import 'styles/utilities.css';

const App = () => {
  const [user] = useAuthState(auth);

  return user ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/reports" component={ReportsPage} />
        <Route component={NotFoundPage} />
        {/* Additional routes should be added for additional pages. */}
      </Switch>
    </BrowserRouter>
  ) : (
    <LoginPage />
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

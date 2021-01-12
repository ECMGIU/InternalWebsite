import { auth } from 'lib/firebase';
import ChatPage from 'pages/ChatPage';
import NotFoundPage from 'pages/errors/NotFoundPage';
import FidelityInputPage from 'pages/FidelityInputPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import PortfolioPage from 'pages/PortfolioPage';
import ReportsPage from 'pages/ReportsPage';
import TradesPage from 'pages/TradesPage';
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
        <Route exact path="/portfolio" component={PortfolioPage} />
        <Route exact path="/reports" component={ReportsPage} />
        <Route exact path="/trades" component={TradesPage} />
        <Route exact path="/fidelity" component={FidelityInputPage} />
        <Route exact path="/chat" component={ChatPage} />
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

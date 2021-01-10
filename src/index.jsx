import PrivateRoute from 'components/PrivateRoute';
import { AuthProvider } from 'lib/auth';
import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import NotFound from 'pages/notfound';
import { React } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'styles/base.css';
import 'styles/components.css';
import 'styles/utilities.css';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route component={NotFound} />
          {/* Additional routes should be added for additional pages. */}
        </Switch>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

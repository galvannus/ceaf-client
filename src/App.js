import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Payments from './components/payments/Payments';

import AuthState from './context/authentication/authState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute';

import 'fontsource-roboto';
/*
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themeConfig';
*/

//Check if exist token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {

  return (
    /*<ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" >
        Hello
      </Button>
    </ThemeProvider>*/
    <AuthState>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/iniciar-sesion" component={Login} />
          <PrivateRoute exact path="/registro" component={NewAccount} />
          <PrivateRoute exact path="/pagos" component={Payments} />
        </Switch>
      </Router>
    </AuthState>
  );
}

export default App;

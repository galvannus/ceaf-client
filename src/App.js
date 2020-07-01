import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Payments from './components/payments/Payments';

import 'fontsource-roboto';
/*
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themeConfig';
*/


function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    /*<ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" >
        Hello
      </Button>
    </ThemeProvider>*/
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/iniciar-sesion" component={Login} />
        <Route exact path="/registro" component={NewAccount} />
        <Route exact path="/pagos" component={Payments} />
      </Switch>
    </Router>
  );
}

export default App;

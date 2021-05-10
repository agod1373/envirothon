import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import Main from './Main'
import './App.scss'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" component={Main} exact />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import Main from './Main'
import Upload from './components/upload/Upload'
import './App.scss'
import ThemeProvider from './contexts/ThemeContext'


function App() {
  return (
    <Router>
      <AuthProvider>
      <ThemeProvider>
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/upload" component={Upload} />
        </Switch>
      </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

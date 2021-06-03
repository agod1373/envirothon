import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AuthProvider from './contexts/AuthContext'
import Main from './Main'
import Upload from './components/upload/Upload'
import './App.scss'
import ThemeProvider from './contexts/ThemeContext'
import Aquatics from './components/events/Aquatics'
import Forestry from './components/events/Forestry'
import General from './components/events/General'
import Soils from './components/events/Soils'
import Wildlife from './components/events/Wildlife'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" component={Main}  />
          <PrivateRoute path="/upload" component={Upload} />
          <PrivateRoute path="/aquatics" component={Aquatics} />
          <PrivateRoute path="/forestry" component={Forestry} />
          <PrivateRoute path="/general" component={General} />  
          <PrivateRoute path="/soils" component={Soils} />
          <PrivateRoute path="/wildlife" component={Wildlife} />
        </Switch>
      </ThemeProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;

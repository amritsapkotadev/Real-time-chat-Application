import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './pages/Homepage'
import ChatPage from './pages/Chatpage'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/chat" component={ChatPage} />
      </Switch>
      
    </div>
  )
}

export default App

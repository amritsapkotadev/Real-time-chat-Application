import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from '../pages/Homepage'
import ChatPage from '../pages/Chatpage'
function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} />
      <Route path="/chat" component={ChatPage} />
      
    </div>
  )
}

export default App

import ChatPanel from './components/ChatPanel'
import LogsPanel from './components/LogsPanel'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Artificialia-Prompt</h1>
        <p>Interface de test pour le cerveau d'Artificialia</p>
      </header>
      
      <main className="app-main">
        <div className="panel-container">
          <div className="panel chat-panel-wrapper">
            <ChatPanel />
          </div>
          <div className="panel logs-panel-wrapper">
            <LogsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

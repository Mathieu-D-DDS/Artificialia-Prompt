import { useState, useRef, useEffect } from 'react';
import './ChatPanel.css';
import apiService from '../services/api.js';
import wsService from '../services/websocket.js';

const ChatPanel = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: 'Bonjour ! Je suis Artificialia. Comment puis-je vous aider ?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket connection and message handling
  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleMessage = (data) => {
      // Handle AI response messages
      if (data.type === 'response' && data.content) {
        const aiResponse = {
          id: Date.now() + Math.random(),
          type: 'ai',
          content: data.content
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }
    };

    const handleError = (error) => {
      console.error('WebSocket error in ChatPanel:', error);
      setIsConnected(false);
      setIsLoading(false);
    };

    // Add event listeners
    wsService.addEventListener('connect', handleConnect);
    wsService.addEventListener('disconnect', handleDisconnect);
    wsService.addEventListener('message', handleMessage);
    wsService.addEventListener('error', handleError);

    // Connect to WebSocket
    wsService.connect();

    // Cleanup function
    return () => {
      wsService.removeEventListener('connect', handleConnect);
      wsService.removeEventListener('disconnect', handleDisconnect);
      wsService.removeEventListener('message', handleMessage);
      wsService.removeEventListener('error', handleError);
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    const promptText = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send prompt to API
      await apiService.sendPrompt(promptText);
      // Response will come through WebSocket
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>Chat avec Artificialia</h2>
        <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-indicator"></span>
          {isConnected ? 'Connecté' : 'Déconnecté'}
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              <span className="message-author">
                {message.type === 'user' ? 'Vous' : 'Artificialia'}
              </span>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-content">
              <span className="message-author">Artificialia</span>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <div className="chat-input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Posez votre question à Artificialia..."
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={!inputMessage.trim() || isLoading || !isConnected}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
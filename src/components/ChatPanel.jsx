import { useState, useRef, useEffect } from 'react';
import './ChatPanel.css';

const ChatPanel = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: 'Bonjour ! Je suis Artificialia. Comment puis-je vous aider ?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateMockResponse()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateMockResponse = () => {
    const responses = [
      "Je réfléchis à votre question... C'est une perspective intéressante.",
      "Laissez-moi analyser cela. Plusieurs approches sont possibles.",
      "Excellente question ! Je vais explorer différentes dimensions de ce sujet.",
      "Je comprends votre point de vue. Voici ma réflexion sur le sujet.",
      "C'est un défi stimulant. Permettez-moi d'y réfléchir étape par étape.",
      "Votre question soulève des points importants. Voici mon analyse."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>Chat avec Artificialia</h2>
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
            disabled={!inputMessage.trim() || isLoading}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
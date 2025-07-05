import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './LogsPanel.css';
import wsService from '../services/websocket.js';

const LogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef(null);
  const logsContainerRef = useRef(null);

  const logTypes = useMemo(() => ({
    thought: { color: '#4a90e2', label: 'Pensée' },
    memory: { color: '#f39c12', label: 'Mémoire' },
    decision: { color: '#e74c3c', label: 'Décision' },
    analysis: { color: '#2ecc71', label: 'Analyse' },
    processing: { color: '#9b59b6', label: 'Traitement' },
    system: { color: '#95a5a6', label: 'Système' }
  }), []);

  const scrollToBottom = useCallback(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [autoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  // WebSocket connection and message handling
  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      // Add initial connection log
      const connectionLog = {
        id: Date.now(),
        type: 'system',
        content: 'Connexion établie avec le cerveau d\'Artificialia',
        timestamp: new Date()
      };
      setLogs(prev => [...prev, connectionLog]);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      // Add disconnection log
      const disconnectionLog = {
        id: Date.now(),
        type: 'system',
        content: 'Connexion perdue avec le cerveau d\'Artificialia',
        timestamp: new Date()
      };
      setLogs(prev => [...prev, disconnectionLog]);
    };

    const handleMessage = (data) => {
      // Handle log messages
      if (data.type === 'log' && data.content) {
        const logEntry = {
          id: Date.now() + Math.random(),
          type: data.logType || 'system',
          content: data.content,
          timestamp: new Date(data.timestamp || Date.now())
        };
        setLogs(prev => [...prev, logEntry]);
      }
    };

    const handleError = (error) => {
      console.error('WebSocket error in LogsPanel:', error);
      setIsConnected(false);
      // Add error log
      const errorLog = {
        id: Date.now(),
        type: 'system',
        content: 'Erreur de connexion WebSocket',
        timestamp: new Date()
      };
      setLogs(prev => [...prev, errorLog]);
    };

    // Add event listeners
    wsService.addEventListener('connect', handleConnect);
    wsService.addEventListener('disconnect', handleDisconnect);
    wsService.addEventListener('message', handleMessage);
    wsService.addEventListener('error', handleError);

    // Connect to WebSocket if not already connected
    if (!wsService.isConnected) {
      wsService.connect();
    }

    // Cleanup function
    return () => {
      wsService.removeEventListener('connect', handleConnect);
      wsService.removeEventListener('disconnect', handleDisconnect);
      wsService.removeEventListener('message', handleMessage);
      wsService.removeEventListener('error', handleError);
    };
  }, []);

  const handleScrollChange = () => {
    if (logsContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = logsContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setAutoScroll(isAtBottom);
    }
  };

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
    if (!autoScroll) {
      scrollToBottom();
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="logs-panel">
      <div className="logs-header">
        <h2>Logs du Cerveau</h2>
        <div className="logs-controls">
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className="status-indicator"></span>
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </div>
          <button 
            className={`auto-scroll-btn ${autoScroll ? 'active' : ''}`}
            onClick={toggleAutoScroll}
            title="Défilement automatique"
          >
            📜
          </button>
          <button 
            className="clear-logs-btn"
            onClick={clearLogs}
            title="Effacer les logs"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div 
        className="logs-container" 
        ref={logsContainerRef}
        onScroll={handleScrollChange}
      >
        {logs.map(log => (
          <div key={log.id} className={`log-entry ${log.type}`}>
            <div className="log-meta">
              <span 
                className="log-type"
                style={{ color: logTypes[log.type].color }}
              >
                {logTypes[log.type].label}
              </span>
              <span className="log-time">{formatTime(log.timestamp)}</span>
            </div>
            <div className="log-content">{log.content}</div>
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};

export default LogsPanel;
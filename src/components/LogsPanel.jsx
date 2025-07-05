import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './LogsPanel.css';

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

  const generateMockLog = useCallback(() => {
    const typeKeys = Object.keys(logTypes);
    const randomType = typeKeys[Math.floor(Math.random() * typeKeys.length)];
    
    const logContents = {
      thought: [
        'Analyse de la requête utilisateur en cours...',
        'Réflexion sur les implications de la question posée',
        'Évaluation des différentes perspectives possibles',
        'Connexion avec les connaissances existantes',
        'Formulation d\'une réponse cohérente'
      ],
      memory: [
        'Récupération des informations pertinentes en mémoire',
        'Accès aux données contextuelles précédentes',
        'Consultation de la base de connaissances',
        'Mise à jour des références conversationnelles',
        'Stockage du nouveau contexte'
      ],
      decision: [
        'Choix de la stratégie de réponse optimale',
        'Sélection des éléments clés à inclure',
        'Décision du niveau de détail approprié',
        'Validation de la cohérence logique',
        'Finalisation de l\'approche communicationnelle'
      ],
      analysis: [
        'Décomposition de la requête en éléments analysables',
        'Identification des patterns linguistiques',
        'Évaluation de la complexité sémantique',
        'Analyse des intentions sous-jacentes',
        'Classification du type de requête'
      ],
      processing: [
        'Traitement des données d\'entrée',
        'Application des algorithmes de compréhension',
        'Génération des alternatives de réponse',
        'Optimisation du processus de réflexion',
        'Validation des résultats intermédiaires'
      ],
      system: [
        'Vérification de l\'état des composants',
        'Mise à jour des paramètres internes',
        'Synchronisation des modules',
        'Optimisation des performances',
        'Maintenance des connexions actives'
      ]
    };
    
    const contents = logContents[randomType];
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    
    return {
      id: Date.now() + Math.random(),
      type: randomType,
      content: randomContent,
      timestamp: new Date()
    };
  }, [logTypes]);

  // Simulate WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      setIsConnected(true);
      
      // Simulate initial connection logs
      const initialLogs = [
        { id: 1, type: 'system', content: 'Connexion établie avec le cerveau d\'Artificialia', timestamp: new Date() },
        { id: 2, type: 'system', content: 'Initialisation des modules de pensée...', timestamp: new Date() },
        { id: 3, type: 'system', content: 'Prêt à recevoir les prompts', timestamp: new Date() }
      ];
      
      setLogs(initialLogs);
      
      // Simulate periodic log messages
      const interval = setInterval(() => {
        const newLog = generateMockLog();
        setLogs(prev => [...prev, newLog]);
      }, 2000 + Math.random() * 4000);

      return () => {
        clearInterval(interval);
        setIsConnected(false);
      };
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, [generateMockLog]);

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
// API Configuration for Artificialia
const API_CONFIG = {
  // Base URL for HTTP API
  baseUrl: 'http://localhost:8000',
  
  // WebSocket URL for logs and responses
  websocketUrl: 'ws://localhost:8000/logs',
  
  // API endpoints
  endpoints: {
    prompt: '/prompt'
  }
};

export default API_CONFIG;
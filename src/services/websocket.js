// WebSocket service for Artificialia
import API_CONFIG from '../config/api.js';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.reconnectInterval = null;
    this.listeners = {
      message: [],
      connect: [],
      disconnect: [],
      error: []
    };
  }

  connect() {
    try {
      this.ws = new WebSocket(API_CONFIG.websocketUrl);
      
      this.ws.onopen = () => {
        this.isConnected = true;
        this.clearReconnectInterval();
        this.notifyListeners('connect');
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyListeners('message', data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.ws.onclose = () => {
        this.isConnected = false;
        this.notifyListeners('disconnect');
        this.scheduleReconnect();
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyListeners('error', error);
      };
      
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.notifyListeners('error', error);
      this.scheduleReconnect();
    }
  }

  disconnect() {
    this.clearReconnectInterval();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }

  scheduleReconnect() {
    if (this.reconnectInterval) return;
    
    this.reconnectInterval = setInterval(() => {
      if (!this.isConnected) {
        console.log('Attempting to reconnect WebSocket...');
        this.connect();
      }
    }, 5000); // Reconnect every 5 seconds
  }

  clearReconnectInterval() {
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
  }

  addEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  removeEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  notifyListeners(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}

// Create a singleton instance
const wsService = new WebSocketService();

export default wsService;
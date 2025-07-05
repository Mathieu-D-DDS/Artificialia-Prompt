// HTTP API service for Artificialia
import API_CONFIG from '../config/api.js';

class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  async sendPrompt(prompt) {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.endpoints.prompt}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending prompt:', error);
      throw error;
    }
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;
// src/lib/api.ts
const API_BASE_URL = 'http://localhost:4000/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.getToken()) {
      (headers as any)['Authorization'] = `Bearer ${this.getToken()}`;
    }

    const config: RequestInit = {
      headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Token might be expired, clear it
        this.clearToken();
        window.location.href = '/login';
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(username: string, password: string, profile: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, profile }),
    });
    
    if (response && response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  // User methods
  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id: string) {
    return this.request(`/users/${id}`);
  }

  // Machine methods
  async getMachines() {
    return this.request('/machines');
  }

  async getMachineById(id: string) {
    return this.request(`/machines/${id}`);
  }

  // Product methods
  async getProducts() {
    return this.request('/products');
  }

  async getProductById(id: string) {
    return this.request(`/products/${id}`);
  }

  // Order methods
  async getOrders() {
    return this.request('/orders');
  }

  async getOrderById(id: string) {
    return this.request(`/orders/${id}`);
  }

  // Production methods
  async getProductionLogs() {
    return this.request('/production');
  }

  // Group methods
  async getGroups() {
    return this.request('/groups');
  }

  // Parameters methods
  async getSystemParameters() {
    return this.request('/parameters');
  }

  async updateSystemParameters(section: string, data: any) {
    return this.request('/parameters', {
      method: 'PUT',
      body: JSON.stringify({ section, data }),
    });
  }

  async resetSystemParameters() {
    return this.request('/parameters/reset', {
      method: 'POST',
    });
  }

  // Analytics methods
  async getOeeMetrics() {
    return this.request('/analytics/oee');
  }

  async getQualityMetrics() {
    return this.request('/analytics/quality');
  }

  async getAvailabilityMetrics() {
    return this.request('/analytics/availability');
  }

  async getPerformanceMetrics() {
    return this.request('/analytics/performance');
  }

  async getStopAnalysis() {
    return this.request('/analytics/stops');
  }

  async getFlowAnalysis() {
    return this.request('/analytics/flow');
  }

  async getTacticalDashboard() {
    return this.request('/analytics/tactical');
  }
}

export const apiClient = new ApiClient();
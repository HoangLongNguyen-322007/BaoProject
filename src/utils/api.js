const API_BASE_URL = 'http://localhost:5000/api';

// Token management
const tokenStorage = {
  getToken: () => localStorage.getItem('auth_token'),
  setToken: (token) => localStorage.setItem('auth_token', token),
  clearToken: () => localStorage.removeItem('auth_token'),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  clearUser: () => localStorage.removeItem('user')
};

// Default headers with token
const getHeaders = () => {
  const token = tokenStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// API helper function
const apiCall = async (method, endpoint, data = null) => {
  const options = {
    method,
    headers: getHeaders()
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (response.status === 401) {
    tokenStorage.clearToken();
    tokenStorage.clearUser();
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'API error');
  }

  return responseData;
};

// AUTH API
const authAPI = {
  register: (email, password, fullName, role = 'guest') =>
    apiCall('POST', '/auth/register', { email, password, fullName, role }),

  login: (email, password) =>
    apiCall('POST', '/auth/login', { email, password }),

  getMe: () =>
    apiCall('GET', '/auth/me'),

  updateProfile: (data) =>
    apiCall('PUT', '/auth/me', data)
};

// ARTICLES PUBLIC API
const articlesAPI = {
  getAll: (limit = 20, offset = 0) =>
    apiCall('GET', `/articles?limit=${limit}&offset=${offset}`),

  getById: (id) =>
    apiCall('GET', `/articles/${id}`),

  getByCategory: (category, limit = 20, offset = 0) =>
    apiCall('GET', `/articles/category/${category}?limit=${limit}&offset=${offset}`),

  search: (query, limit = 20, offset = 0) =>
    apiCall('GET', `/articles/search/${query}?limit=${limit}&offset=${offset}`)
};

// AUTHOR API
const authorAPI = {
  createArticle: (data) =>
    apiCall('POST', '/author/articles', data),

  getMyArticles: (limit = 20, offset = 0) =>
    apiCall('GET', `/author/articles/my-articles?limit=${limit}&offset=${offset}`),

  getArticle: (id) =>
    apiCall('GET', `/author/articles/${id}`),

  updateArticle: (id, data) =>
    apiCall('PUT', `/author/articles/${id}`, data),

  submitArticle: (id) =>
    apiCall('POST', `/author/articles/${id}/submit`),

  deleteArticle: (id) =>
    apiCall('DELETE', `/author/articles/${id}`)
};

// EDITOR API
const editorAPI = {
  getPendingArticles: (limit = 20, offset = 0) =>
    apiCall('GET', `/editor/articles/pending?limit=${limit}&offset=${offset}`),

  getApprovedArticles: (limit = 20, offset = 0) =>
    apiCall('GET', `/editor/articles/approved?limit=${limit}&offset=${offset}`),

  getRejectedArticles: (limit = 20, offset = 0) =>
    apiCall('GET', `/editor/articles/rejected?limit=${limit}&offset=${offset}`),

  approveArticle: (id) =>
    apiCall('POST', `/editor/articles/${id}/approve`),

  rejectArticle: (id, reason) =>
    apiCall('POST', `/editor/articles/${id}/reject`, { reason }),

  suggestEdit: (id, suggestion) =>
    apiCall('POST', `/editor/articles/${id}/suggest-edit`, { suggestion }),

  getStats: () =>
    apiCall('GET', '/editor/articles/stats/me')
};

// ADMIN API
const adminAPI = {
  // Article management
  getAllArticles: (limit = 50, offset = 0) =>
    apiCall('GET', `/admin/articles/all?limit=${limit}&offset=${offset}`),

  publishArticle: (id) =>
    apiCall('POST', `/admin/articles/${id}/publish`),

  deleteArticle: (id) =>
    apiCall('DELETE', `/admin/articles/${id}`),

  // Category management
  createCategory: (data) =>
    apiCall('POST', '/admin/categories', data),

  getCategories: () =>
    apiCall('GET', '/admin/categories'),

  updateCategory: (id, data) =>
    apiCall('PUT', `/admin/categories/${id}`, data),

  deleteCategory: (id) =>
    apiCall('DELETE', `/admin/categories/${id}`),

  // User management
  getUsers: (limit = 50, offset = 0) =>
    apiCall('GET', `/admin/users?limit=${limit}&offset=${offset}`),

  getUsersByRole: (role) =>
    apiCall('GET', `/admin/users/role/${role}`),

  updateUserRole: (id, role) =>
    apiCall('PUT', `/admin/users/${id}/role`, { role }),

  suspendUser: (id) =>
    apiCall('PUT', `/admin/users/${id}/suspend`),

  activateUser: (id) =>
    apiCall('PUT', `/admin/users/${id}/activate`),

  // Statistics
  getStats: () =>
    apiCall('GET', '/admin/stats'),

  getLogs: (limit = 50, offset = 0) =>
    apiCall('GET', `/admin/logs?limit=${limit}&offset=${offset}`)
};

// Export all APIs
module.exports = {
  tokenStorage,
  authAPI,
  articlesAPI,
  authorAPI,
  editorAPI,
  adminAPI,
  apiCall
};

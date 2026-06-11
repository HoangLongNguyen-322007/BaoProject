import { useState, useEffect, useCallback } from 'react';
import { tokenStorage, authAPI, articlesAPI, authorAPI, editorAPI, adminAPI } from '../utils/api';

// Auth hook
export const useAuth = () => {
  const [user, setUser] = useState(tokenStorage.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      tokenStorage.setToken(response.token);
      tokenStorage.setUser(response.user);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email, password, fullName, role = 'guest') => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(email, password, fullName, role);
      tokenStorage.setToken(response.token);
      tokenStorage.setUser(response.user);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clearToken();
    tokenStorage.clearUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.updateProfile(data);
      const updatedUser = { ...user, ...response.user };
      tokenStorage.setUser(updatedUser);
      setUser(updatedUser);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { user, loading, error, login, register, logout, updateProfile };
};

// Articles hook
export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAll = useCallback(async (limit = 20, offset = 0) => {
    setLoading(true);
    try {
      const data = await articlesAPI.getAll(limit, offset);
      setArticles(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await articlesAPI.getById(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getByCategory = useCallback(async (category, limit = 20, offset = 0) => {
    setLoading(true);
    try {
      const data = await articlesAPI.getByCategory(category, limit, offset);
      setArticles(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (query, limit = 20, offset = 0) => {
    setLoading(true);
    try {
      const data = await articlesAPI.search(query, limit, offset);
      setArticles(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { articles, loading, error, getAll, getById, getByCategory, search };
};

// Author articles hook
export const useAuthorArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createArticle = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authorAPI.createArticle(data);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyArticles = useCallback(async (limit = 20, offset = 0) => {
    setLoading(true);
    try {
      const data = await authorAPI.getMyArticles(limit, offset);
      setArticles(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getArticle = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await authorAPI.getArticle(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateArticle = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authorAPI.updateArticle(id, data);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authorAPI.submitArticle(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteArticle = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authorAPI.deleteArticle(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { articles, loading, error, createArticle, getMyArticles, getArticle, updateArticle, submitArticle, deleteArticle };
};

// Editor articles hook
export const useEditorArticles = () => {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPendingArticles = useCallback(async (limit = 20, offset = 0) => {
    setLoading(true);
    try {
      const data = await editorAPI.getPendingArticles(limit, offset);
      setArticles(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getApprovedArticles = useCallback(async (limit = 20, offset = 0) => {
    setLoading(true);
    try {
      const data = await editorAPI.getApprovedArticles(limit, offset);
      setArticles(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRejectedArticles = useCallback(async (limit = 20, offset = 0) => {
    setLoading(true);
    try {
      const data = await editorAPI.getRejectedArticles(limit, offset);
      setArticles(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveArticle = useCallback(async (id) => {
    setError(null);
    try {
      const response = await editorAPI.approveArticle(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const rejectArticle = useCallback(async (id, reason) => {
    setError(null);
    try {
      const response = await editorAPI.rejectArticle(id, reason);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const getStats = useCallback(async () => {
    try {
      const data = await editorAPI.getStats();
      setStats(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { articles, stats, loading, error, getPendingArticles, getApprovedArticles, getRejectedArticles, approveArticle, rejectArticle, getStats };
};

// Admin hook
export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllArticles = useCallback(async (limit = 50, offset = 0) => {
    setLoading(true);
    try {
      const data = await adminAPI.getAllArticles(limit, offset);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const publishArticle = useCallback(async (id) => {
    setError(null);
    try {
      const response = await adminAPI.publishArticle(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteArticle = useCallback(async (id) => {
    setError(null);
    try {
      const response = await adminAPI.deleteArticle(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const getUsers = useCallback(async (limit = 50, offset = 0) => {
    setLoading(true);
    try {
      const data = await adminAPI.getUsers(limit, offset);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUsersByRole = useCallback(async (role) => {
    setLoading(true);
    try {
      const data = await adminAPI.getUsersByRole(role);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getStats();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserRole = useCallback(async (id, role) => {
    setError(null);
    try {
      const response = await adminAPI.updateUserRole(id, role);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const suspendUser = useCallback(async (id) => {
    setError(null);
    try {
      const response = await adminAPI.suspendUser(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const activateUser = useCallback(async (id) => {
    setError(null);
    try {
      const response = await adminAPI.activateUser(id);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { loading, error, getAllArticles, publishArticle, deleteArticle, getUsers, getUsersByRole, getStats, updateUserRole, suspendUser, activateUser };
};

import {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {AuthContext} from '../AuthContext';

export const useAuth = () => {
  const {token, setToken, userId, setUserId} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp > currentTime) {
          setToken(storedToken);
          setUserId(decodedToken.userId);
        } else {
          // Token expired
          await logout();
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      const decodedToken = jwtDecode(token);
      setToken(token);
      setUserId(decodedToken.userId);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      setUserId('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    token,
    userId,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.24:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',

  },
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const register = async (payload: {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}) => {
  console.log(payload);
  const { data } = await API.post('/auth/register', payload);
  return data;
};

export const login = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await API.post('/auth/login', payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get('/api/profile');
  return data;
};

import axios from 'axios';
import momentjs from 'moment';

export const server = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const moment = date => momentjs(date).format('MMM Do YY');

import axios from 'axios';
import moment from 'moment';

export const server = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export const momentjs = date => moment(date).format('MMM Do YY');

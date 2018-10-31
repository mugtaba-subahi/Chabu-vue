import { server } from './config';

// REFACTOR DUPLICATE CODE

// Rooms
export const getJoinedRooms = async () => {
  const response = await server.get('/accounts/joined-rooms').catch(error => error.response);
  const { data } = response.data;

  if (!response || response.status === 401) return false;
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getCreatedRooms = async () => {
  const response = await server.get('/accounts/created-rooms').catch(error => error.response);
  const { data } = response.data;

  if (!response || response.status === 401) return false;
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const createRoom = async payload => {
  const response = await server.post('/rooms', payload).catch(error => error.response);
  return response.data;
};

// Questions
export const getCreatedQuestions = async () => {
  const response = await server.get('/accounts/created-questions').catch(error => error.response);
  const { data } = response.data;

  if (!response || response.status === 401) return false;
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const likeQuestion = id => server.patch(`/questions/${id}/like`);

export const deleteQuestion = (roomID, questionID) => server.delete(`/rooms/${roomID}/${questionID}`).catch(error => error.response);

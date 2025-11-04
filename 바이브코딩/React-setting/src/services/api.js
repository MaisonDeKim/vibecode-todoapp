import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vibecode-server-ee53f28fd20e.herokuapp.com';
const API_URL = `${API_BASE_URL}/api/todos`;

// 모든 할일 조회
export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 할일 생성
export const createTodo = async (title) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

// 특정 할일 조회
export const getTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// 할일 수정
export const updateTodo = async (id, title) => {
  const response = await axios.put(`${API_URL}/${id}`, { title });
  return response.data;
};

// 할일 삭제
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


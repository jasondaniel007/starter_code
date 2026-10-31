import apiClient from "../api/apiClient";
import { THREAD_API } from "../config/apiConfig";

export async function fetchRecentThreads() {
  const response = await apiClient.get(THREAD_API.GET_ALL);
  return response.data.data;
}

export async function fetchThreadById(threadId) {
  const response = await apiClient.get(THREAD_API.GET_BY_ID(threadId));
  return response.data.data;
}

export const createThread = async (data) => {
  const response = await apiClient.post(THREAD_API.CREATE, data);
  return response.data.data;
};

export async function upvoteThread(threadId) {
  const response = await apiClient.post(THREAD_API.UPVOTE(threadId));
  return response.data.data;
}

export async function downvoteThread(threadId) {
  const response = await apiClient.post(THREAD_API.DOWNVOTE(threadId));
  return response.data.data;
}

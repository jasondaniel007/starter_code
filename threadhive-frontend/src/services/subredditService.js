import apiClient from "../api/apiClient";
import { SUBREDDIT_API } from '../config/apiConfig';

export const fetchSubreddits = async () => {
  const response = await apiClient.get(SUBREDDIT_API.GET_ALL);
  return response.data.data;
};

export const createSubreddit = async ({ name, description = '' }) => {
  const response = await apiClient.post(SUBREDDIT_API.CREATE, { name, description });
  return response.data.data;
};

export const fetchSubredditWithThreads = async (subredditId) => {
  const response = await apiClient.get(SUBREDDIT_API.GET_BY_ID(subredditId));
  return response.data.data;
};

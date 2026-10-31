import apiClient from "../api/apiClient";
import { COMMENT_API } from "../config/apiConfig";

export async function fetchCommentsForThread(threadId) {
  const response = await apiClient.get(COMMENT_API.GET_BY_THREAD(threadId));
  return response.data.data;
}

export async function postComment({ threadId, content }) {
  const response = await apiClient.post(COMMENT_API.CREATE, {
    thread: threadId,
    content,
  });
  return response.data.data;
}

export const upvoteComment = async (commentId) => {
  const response = await apiClient.post(COMMENT_API.UPVOTE(commentId));
  return response.data.data;
};

export const downvoteComment = async (commentId) => {
  const response = await apiClient.post(COMMENT_API.DOWNVOTE(commentId));
  return response.data.data;
};

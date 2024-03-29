import axios from "axios";
import { TWITTER_URL } from "./channels";

export const HASHTAGS_RECOMMENDER = `${process.env.NEXT_PUBLIC_API_URL}/hashtags/recommend`;

// POST REQUEST -> RESPONSE GIVES HASHTAGS
export function recommendHashtags(formData) {
  return axios.post(`${HASHTAGS_RECOMMENDER}`, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}

// POST REQUEST -> TWITTER TWEET CREATION
export function postTweet(formData) {
  return axios.post(`${TWITTER_URL}/tweet`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// POST REQUEST -> TWITTER TWEET SCHEDULING
export function scheduleTweet(formData) {
  return axios.post(`${TWITTER_URL}/tweet/schedule`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// POST REQUEST -> REPLY TO A CERTAIN TWEET
export function postReplyToTweet(formData) {
  return axios.post(`${TWITTER_URL}/reply`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// POST REQUEST -> REPLY TO A CERTAIN TWEET
export function scheduleReplyToTweet(formData) {
  return axios.post(`${TWITTER_URL}/reply/schedule`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

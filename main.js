//Promise Chaining
//Scenario- YOUTUBE

//Get video + info- title, duration, description, creator name
//Primary Key - video id

//Get comments- commenter, comment likes/dislikes, comment itself
//Forign Key - video id

//Get likes, dislikes, views
//FK - video id
//Promise.all

//This one is independent from chaining
//Get other youtube video suggestions
//FK - user id
//Promise.any
//Suggested videos
//Trending videos
//Random videos

import { videos } from "./data/videos.js";
import { video_stats } from "./data/video_stats.js";
import { generateRandomMilisecs, simulateNetworkError, simulateServerError } from "./middleware.js";

const networkReason = 'Request rejected due to Network Error';
const serverReason = 'Request rejected due to Server Error'


function fetchVideoInfo(video_id) {

  const milisecs = generateRandomMilisecs();
  const networkError = simulateNetworkError();
  const serverError = simulateServerError();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const video = videos.find(v => v.video_id === video_id);
      if (networkError) reject(networkReason);
      else if (serverError) reject(serverReason);
      else if (video) resolve(video);
      else if (!video) reject(`Video with id ${video_id} not found`);
    }, milisecs);
  });
};

fetchVideoInfo(1)
  .then(result => console.log(result))
  .catch(error => console.log(error))









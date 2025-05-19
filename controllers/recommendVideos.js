//This one is independent from chaining
//Get other youtube video suggestions
//FK - user id
//Promise.any
//Suggested videos
//Trending videos
//Random videos
import { trendingVideos } from "../models/trendingVideos.js";

function getTrendingVideos(milisecs, video) {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      const trendingVideosFound = trendingVideos.filter((v) => v.id !== video.id);

      if (trendingVideosFound) resolve(trendingVideosFound);
      else reject('Could not find trending videos')

    })
  }, milisecs);
};

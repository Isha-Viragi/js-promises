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

const video = videos.find((v) => {
  return v.video_id === 1
})

console.log(video);






//Promise Chaining
//Scenario- YOUTUBE

//Get video + info- title, duration, description, creator name
//Primary Key - video id

//Get comments- commenter, comment likes/dislikes, comment itself
//Forign Key - video id

//Get likes, dislikes, views
//FK - creatorId + video id 
//Promise.all

//This one is independent from chaining
//Get other youtube video suggestions
//FK - user id
//Promise.any
//Suggested videos
//Trending videos
//Random videos

import { videos } from "./models/videos.js";
import { creators } from "./models/creators.js";
import { videoStats } from "./models/videoStats.js";
import { trendingVideos } from "./models/trendingVideos.js";
import { generateRandomMilisecs, simulateNetworkError, simulateServerError } from "./utils/apiSimulator.js";

const videoGridContainer = document.querySelector('.js-video-grid');
const networkReason = 'Request rejected due to Network Error';
const serverReason = 'Request rejected due to Server Error';
const notFoundReason = 'Video Not Found';

const creatorId = 1;
const videoId = 1;


function fetchVideoInfo() {

  const milisecs = generateRandomMilisecs();
  const networkError = simulateNetworkError();
  const serverError = simulateServerError();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const video = videos.find(v => v.videoId === videoId && v.creatorId === creatorId);
      if (networkError) reject(networkReason);
      else if (serverError) reject(serverReason);
      else if (!video) reject(notFoundReason);
      else if (video) resolve(video);
    }, milisecs);
  });
};

function fetchVideoStats() {

  const milisecs = generateRandomMilisecs();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stats = videoStats.find(vs => vs.creatorId === creatorId && vs.videoId === videoId);
      if (!stats) reject(notFoundReason);
      else if (stats) resolve(stats);
    }, milisecs);
  });
};

function fetchTrendingStats() {

  const milisecs = generateRandomMilisecs();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const trendingStat = trendingVideos.find(video => video.creatorId === creatorId && video.videoId === videoId);
      if (!trendingStat) reject(notFoundReason);
      else if (trendingStat) resolve(trendingStat);
    }, milisecs);
  });
};

function fetchCreatorInfo() {

  const milisecs = generateRandomMilisecs();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const creatorInfo = creators.find(creator => creator.creatorId === creatorId);
      if (!creatorInfo) reject(notFoundReason);
      else if (creatorId) resolve(creatorInfo);
    }, milisecs);
  });
};


fetchVideoInfo()
  .then(video => {
    return Promise.all([
      fetchCreatorInfo(),
      fetchVideoStats(),
      fetchTrendingStats()
    ]).then(results => ({ video, results }))
  })
  .then(({ video, results }) => {
    const creatorInfo = results[0];
    const videoStats = results[1];
    const trendingStats = results[2];

    const generatedHtml = renderMainSection(video, creatorInfo, videoStats, trendingStats);
    videoGridContainer.innerHTML += generatedHtml;

    // const statsHtml = displayVideoStats(stats);
    // videoGridContainer.innerHTML += statsHtml;
    // return fetchTrendingStats(stats.creatorId, stats.videoId);
  })
  // .then(trendingStat => {
  //   let generatedHtml = ''
  //   if (trendingStat.overallRank <= trendingStat.categoryRank)
  //     generatedHtml = `#${trendingStat.overallRank} on Trending`
  //   else if (trendingStat.categoryRank < trendingStat.overallRank)
  //     generatedHtml = `#${trendingStat.categoryRank} on Trending for ${trendingStat.category}`
  //   videoGridContainer.innerHTML += generatedHtml;
  // })
  .catch(error => {
    videoGridContainer.innerHTML = `<p>Error: ${error}</p>`;
    console.log(error)
  })




//Things I Learned

//For arrow functions in methods, if {}, need to RETURN
//Example: With .find() or .then()
//  find (video => video.id === 1) no RETURN needed
//  find (video => {return video.id === 1}) RETURN needed 
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

import { videos } from "./data/videos.js";
import { videoStats } from "./data/videoStats.js";
import { trendingVideos } from "./data/trendingVideos.js";
import { generateRandomMilisecs, simulateNetworkError, simulateServerError } from "./middleware.js";

const videoGridContainer = document.querySelector('.js-video-grid');
const networkReason = 'Request rejected due to Network Error';
const serverReason = 'Request rejected due to Server Error';
const notFoundReason = 'Video Not Found';


function fetchVideoInfo(creatorId, videoId) {

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

function fetchVideoStats(creatorId, videoId) {

  const milisecs = generateRandomMilisecs();
  const networkError = simulateNetworkError();
  const serverError = simulateServerError();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stats = videoStats.find(vs => vs.creatorId === creatorId && vs.videoId === videoId);
      if (networkError) reject(networkReason);
      else if (serverError) reject(serverReason);
      if (!stats) reject(notFoundReason);
      else if (stats) resolve(stats);
    }, milisecs);
  });
};

function fetchTrendingStat(creatorId, videoId) {

  const milisecs = generateRandomMilisecs();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const trendingStat = trendingVideos.find(video => video.creatorId === creatorId && video.videoId === videoId);
      if (!trendingStat) reject(notFoundReason);
      else if (trendingStat) resolve(trendingStat);
    }, milisecs);
  });
};

function displayVideoStats(data) {
  const { likes, dislikes, views } = data;
  return `
  <section class="video-stats">
  <span class="video-stat"><img class="icons" src="../assets/icons/thumbs-up.svg">${likes}</span>
  <span class="video-stat"><img class="icons" src="../assets/icons/thumbs-down.svg">${dislikes}</span>
  <span class="video-stat">${views} views</span>
  </section>
  `;
}

fetchVideoInfo(2, 1)
  .then(video => {
    videoGridContainer.innerHTML = `<img src="${video.videoUrl}" class="thumbnail">`;
    const date = video.uploadDate;
    console.log(date)

    return fetchVideoStats(video.creatorId, video.videoId);
  })
  .then(stats => {
    console.log(stats);
    const statsHtml = displayVideoStats(stats);
    videoGridContainer.innerHTML += statsHtml;
    return fetchTrendingStat(stats.creatorId, stats.videoId);
  })
  .then(trendingStat => {
    let generatedHtml = ''
    if (trendingStat.overallRank <= trendingStat.categoryRank)
      generatedHtml = `#${trendingStat.overallRank} on Trending`
    else if (trendingStat.categoryRank < trendingStat.overallRank)
      generatedHtml = `#${trendingStat.categoryRank} on Trending for ${trendingStat.category}`
    videoGridContainer.innerHTML += generatedHtml;
  })
  .catch(error => {
    videoGridContainer.innerHTML = `<p>Error: ${error}</p>`;
  })




//Things I Learned

//For arrow functions in methods, if {}, need to RETURN
//Example: With .find() or .then()
//  find (video => video.id === 1) no RETURN needed
//  find (video => {return video.id === 1}) RETURN needed 
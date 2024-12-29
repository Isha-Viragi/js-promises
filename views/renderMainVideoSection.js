import { calculateDateStamp } from "../controllers/dateStampModule.js"

export function generateMainVideoSection(video, creatorInfo, videoStats, trendingStats) {
  return `
  <section class="main-video-section">
    <div class="top-section">
      <img src="${video.videoUrl}" class="main-video-thumbnail">
      <h2 class="main-video-title">${video.title}</h2>
    </div>
    <div class="middle-section">

      <div class="middle-left-section">
        <div class="creator-container">
          <img class="creator-profile" src="${creatorInfo.creatorProfile}">
          <div class="creator-info-container">
            <span class="creator-name">${creatorInfo.creatorName}</span>
            <span class="subscriber-count">${creatorInfo.subscriberCount} subscribers</span>
          </div>
        </div>
        <div>
          <button class="subscribe-button">Subscribe</button>
        </div>  
      </div>

      <div class="middle-right-section">
        <div class="like-dislike-buttons">
          <button class="like-button">
          <img class="icons" src="../assets/icons/thumbs-up.svg">
          ${videoStats.likes}
          </button>
          <button class="dislike-button">
          <img class="icons" src="../assets/icons/thumbs-down.svg">
          ${videoStats.dislikes}
          </button>
        </div>
          <button class="share-button">
          <img class="icons" src="../assets/icons/share.svg">
          Share
          </button>
        </div>
      </div>
    </div>

    <button class="bottom-section js-bottom-section">
      <div class="bottom-top-container">
        <span class="views">
        ${videoStats.views} views 
        </span>
        <span class="date-stamp">
        ${calculateDateStamp()} ago
        </span>
        <span class="trending-stats">
        ${generateTrendingStat(trendingStats)}
        </span>
      </div>
      <p class="description description-show-less js-description">${video.description}</p>
      <span class="show-more js-show-more">Show more</span>
      <span class="show-less hide-text js-show-less">Show less</span>
    </button>

  </section>
  `;

};

function generateTrendingStat(trendingStat) {
  if (trendingStat.overallRank <= trendingStat.categoryRank)
    return `# ${trendingStat.overallRank} on Trending`;
  else if (trendingStat.categoryRank < trendingStat.overallRank)
    return `# ${trendingStat.categoryRank} on Trending for ${trendingStat.category}`;
};

export function attachEventListeners() {
  const descriptionBox = document.querySelector('.js-bottom-section');
  const showMore = document.querySelector('.js-show-more');
  const showLess = document.querySelector('.js-show-less');
  const description = document.querySelector('.js-description');

  descriptionBox.addEventListener('click', () => {
    //Will show more
    if (description.classList.contains('description-show-less')) {
      description.classList.remove('description-show-less');
      showMore.classList.add('hide-text');
      showLess.classList.remove('hide-text');
    }
    //Will show less
    else {
      description.classList.add('description-show-less');
      showMore.classList.remove('hide-text');
      showLess.classList.add('hide-text');
    };
  });
};
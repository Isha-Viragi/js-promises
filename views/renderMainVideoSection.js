


function renderMainSection(video, creatorInfo, videoStats, trendingStats) {
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

    <div class="bottom-section">
      <p class="views">${videoStats.views} views ${calculateDateStamp()} ago</p>
      <p class="description">${video.description}</p>
    </div>
  </section>
  `

}

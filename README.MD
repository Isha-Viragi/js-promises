# YouTube Clone (JS Promises Practice)

> A JavaScript-based simulation of YouTube-style data loading using **Promises**, built from scratch as a hands-on learning exercise.

## About the Project

This project was created to **deep-dive into JavaScript Promises**, with a strong emphasis on **chaining, error handling**, and using methods like `Promise.all`, `Promise.any`, and `Promise.race`. I designed the app structure and data flow to reflect a simplified version of how a platform like YouTube might asynchronously load content.

The result is a **lightweight, mock YouTube frontend** with dynamically loaded video data, creator info, stats, and suggestions — all simulated via Promises.

---

## What I Practiced

- **Promise Chaining**
  - Sequential data loading (video → creator → stats)
- **Promise.all**
  - Fetching likes, dislikes, and views together
- **Promise.any**
  - Showing a fallback in video suggestions (trending, random, etc.)
- **Promise.race** (practiced separately in a `practice` file)
- **Error Simulation**
  - Built a fake API simulator that randomly throws common errors (e.g. network/service error)
- **UI Logic**
  - Date calculations (e.g. "Uploaded 2 weeks ago")
  - Paragraph truncation via CSS (`-webkit-line-clamp`, `overflow`, etc.)
  - Preserving line breaks with `white-space: pre-wrap`
- **JS Fundamentals**
  - Arrow function return behaviors
- **Github Conventions**
  - Started following the [Conventional Commits](https://www.conventionalcommits.org/) specification to improve commit clarity and consistency (e.g., `feat:`, `fix:`, `chore:`).

---

## How It Works

- On load, a **random video** is selected from 6 pre-defined ones.
- After loading video details, the app:
  - Fetches **creator info**
  - Fetches **video stats** (likes, dislikes, views)
  - Fetches **suggested videos** via `Promise.any`
- All data appears in the correct UI section (like YouTube's real interface).
- A user refresh will fetch a new random video.

---

## Future Enhancements (if expanded)

- [ ] Render suggested videos section
- [ ] Create comment section feature
- [ ] Real API integration (e.g. YouTube Data API)
- [ ] Filtering/search functionality

---

## Thank You

A special thanks to anyone reviewing this project — your time and attention are greatly appreciated!

This project was a solo learning experiment and I'm always open to feedback or suggestions for improvement. Thanks for stopping by!

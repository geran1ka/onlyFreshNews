import {createLatestNews} from './createLatestNews.js';

export const renderLatestNews = (array) => {
  const {sectionLatestNews, latestNewsList} = createLatestNews();
  console.log('latestNewsList: ', latestNewsList);
  console.log('sectionLatestNews: ', sectionLatestNews);
};

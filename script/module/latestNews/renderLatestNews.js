import {createItem} from '../news-item/createItem.js';
import {createLatestNews} from './createLatestNews.js';

export const renderLatestNews = (err, response) => {
  if (err) {
    console.warn(err);
    return;
  }
  const mane = document.querySelector('.news');
  const {sectionLatestNews, latestNewsList} = createLatestNews();
  let start = 0;
  let end = 8;
  response.articles.slice(start, end).map((item) => {
    const li = createItem(item);
    latestNewsList.append(li);
  });
  mane.append(sectionLatestNews);
  return true;
};

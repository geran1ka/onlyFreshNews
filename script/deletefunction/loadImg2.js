export const loadImg = (url) => new Promise(resolve => {
  const img = new Image();
  img.width = 300;
  img.src = url;
  img.addEventListener('load', () => {
    document.body.append(img);
    resolve();
  });
});
window.addEventListener('DOMContentLoaded', (event) => {
  const HERO_CAROUSEL_SELECTOR = '.js-hero-carousel'
  const heroCarousel = document.querySelector(HERO_CAROUSEL_SELECTOR);
  const heroFlickity = new Flickity( heroCarousel, {
    wrapAround: true,
    cellAlign: 'left',
    contain: true,
    percentPosition: false,
    fade: true,
    // autoPlay: 5000
  });

  const GAME_CAROUSEL_SELECTOR = '.js-game-carousel'
  const gameCarousel = document.querySelector(GAME_CAROUSEL_SELECTOR);
  const gameFlickity = new Flickity( gameCarousel, {
    wrapAround: true,
    cellAlign: 'center',
    contain: true,
    percentPosition: true,
    pageDots: false,
    prevNextButtons: false,
    // autoPlay: 5000
  });
});

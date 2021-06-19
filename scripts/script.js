window.addEventListener('DOMContentLoaded', (event) => {
  var firebaseConfig = {
    apiKey: "AIzaSyCrql5QRer7uUrWB07jR7sS97sN_iGuZhg",
    authDomain: "bro-zone-4a1a0.firebaseapp.com",
    projectId: "bro-zone-4a1a0",
    storageBucket: "bro-zone-4a1a0.appspot.com",
    messagingSenderId: "742089664744",
    appId: "1:742089664744:web:80b162388415e18b73815d",
    measurementId: "G-Q71EW4F6H7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();

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

  const validateForm = (contact) => {
    emptyFields = Object.keys(contact).filter(key => !contact[key])
    emptyFields.length && window.alert('Qúy khách vui lòng nhập đủ các trường.')
    return !emptyFields.length
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const form = e.target
    const name = document.querySelector('#input-name').value
    const account = document.querySelector('#input-account').value
    const phone = document.querySelector('#input-phone').value
    const email = document.querySelector('#input-email').value
    const date = document.querySelector('#input-date').value
    const time = document.querySelector('#input-time').value
    const contact = { name, account, phone, email, date, time }

    if (validateForm(contact)) {
      let surveysRef = db.collection('survey')
  
      surveysRef.add(contact).then((e) => {
        form.reset()
        console.log(e)
      })
    }

  }

  const FORM_SELECTOR = '.js-form-survey'
  const form = document.querySelector(FORM_SELECTOR)
  form.addEventListener('submit', formSubmitHandler)
});

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

  const saveSurvey = (surveys) => {
    const surveyJson = JSON.stringify(surveys)
    localStorage.setItem('brozoneSurvey', surveyJson)
  }

  const getSurvey = () => {
    const allSurvey = localStorage.getItem('brozoneSurvey')
    return allSurvey ? JSON.parse(allSurvey) : false
  }

  const initFirebase = () => {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    var db = firebase.firestore();
    let surveysRef = db.collection('survey')
    let allSurvey = []
    surveysRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          allSurvey.push(doc.data())
      });
      saveSurvey(allSurvey)
      Vue.createApp(Form).mount('#form-survey')
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }

  const allSurvey = getSurvey()

  // Init Carousel
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


  // Vue form
  const Form = {
    data() {
      return {
        name: '',
        email: '',
        date: '',
        time: '',
        allSurvey,
        submitSuccess: false
      }
    },
    computed: {
      avaiableSlots() {
        return 50 - this.allSurvey.filter(({date, time}) => this.date === date && this.time === time).length
      },
      duplicatedEmail() {
        return this.allSurvey.map(({email}) => email).includes(this.email)
      },
      submitable() {
        return !this.duplicatedEmail && this.avaiableSlots > 0 && !this.submitSuccess
      }
    },
    methods: {
      formSubmitHandler() {
        const contact = {
          name: this.name,
          email: this.email,
          date: this.date,
          time: this.time,
        }
        this.submitable && surveysRef.add(contact).then((e) => {
          this.submitSuccess = true
          this.allSurvey.push(contact)
        })
      }
    }
  }

  if (allSurvey.length) {
    Vue.createApp(Form).mount('#form-survey')
  } else {
    initFirebase()
  }
});

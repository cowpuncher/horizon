ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true,
            iconColor: '#000'
        });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#blueHomeCircleIcon');
    objectManager.clusters.options.set('preset', 'islands#invertedBlueClusterIcons');
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "../assets/js/data.json"
    }).done(function(data) {
        objectManager.add(data);
    });

}
// ANCHOR Sliders
// ANCHOR (Sliders with fraction)
const sliderWithTimer = new Swiper('.sliderWithFraction', {
    loop: true,
    pagination: {
        el: '.sliderWithTimerBullet',
        type: 'bullets',
        clickable: true,
        progressbarOpposite: true
    },
    on: {
        init: function() {
          var totalSlides = this.slides.length - this.loopedSlides*2;
          document.querySelector('.swiper-fraction-current').innerHTML = totalSlides;
        },
        slideChange: function() {
          var currentSlide = this.realIndex + 1;
          
          document.querySelector('.swiper-fraction-total').innerHTML = currentSlide;
        }
    }
});
// ANCHOR (Sliders review)
const sliderReview = new Swiper('.sliderReview', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
    },
});



const sliderProductBanner = new Swiper('.mainBannerSlider', {
    loop: true,
    direction: 'vertical',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'cube',
});


// ANCHOR Clicks events
// ANCHOR (City)
let city =document.querySelector('.citySelect'),
    modal = document.querySelector('.changeCity ');
// ANCHOR (Burger) 
let burger =document.querySelector('.burger'),
    menu = document.querySelector('.navigation');

city.addEventListener('click', function() {
    modal.classList.toggle('active');
});
burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});
function closeModal() {
    modal.classList.remove('active');
}



// // Roullete

// const rouletteSlider = document.querySelector('.rouletteSlider');
// const rouletteBtn = document.getElementById('rouletteBtn');
// let rouletteSliderItem = document.querySelectorAll('.rouletteSliderItem');

// for(let i = 0; i < rouletteSliderItem.length; i++) {
//     // rouletteSlider.append(rouletteSliderItem[i].cloneNode(true));
//     let itemHeight = rouletteSliderItem[i].offsetHeight;
//     rouletteSliderItem[i].classList.add('rouletteSliderItem-show')
//     // rouletteSlider.setAttribute('style', 'height: ' + itemHeight * rouletteSliderItem.length + 'px;');
    
// }

// var random = Math.floor(Math.random() * 9) + 1; // От 0 до 8

// rouletteBtn.addEventListener('click', e => {    
//     // rouletteSliderItem = document.querySelectorAll('.rouletteSliderItem');
//     console.log(random)
//     for(let i = 0; i < rouletteSliderItem.length; i++) {
//         let itemHeight = rouletteSliderItem[i].offsetHeight;
//         rouletteSliderItem[i].setAttribute('style', 'transform: translate(0 , -' + (itemHeight * random) + 'px)')
//     }
// });

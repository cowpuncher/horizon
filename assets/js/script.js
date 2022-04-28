

if(document.getElementById('map')) {
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
            url: "./assets/js/data.json"
        }).done(function(data) {
            objectManager.add(data);
        });
    
    }
}


// ANCHOR --- Sliders
// ANCHOR (Sliders with fraction)
const speedSlide = 5000;
const sliderWithTimer = new Swiper('.sliderWithFraction', {
    loop: true,
    autoplay: {
        delay: speedSlide,
    },
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
            // Таймер текущего слайда, работает через @keyframe activeSlide в style.css и переменную --speed-slide
            for(el of this.pagination.bullets) {
                el.style.setProperty('--speed-slide', speedSlide/1000 + 's');
            }
            // Остановка слайдера при наведении
            this.el.addEventListener('mouseenter', () => {
                this.autoplay.stop();
            });
        
            this.el.addEventListener('mouseleave', () => {
                this.autoplay.start();
            });

        },

        // Фракции слайдера
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
        prevEl: '.swiper-button-prev',
    },
});
// ANCHOR (Sliders product banner)
const sliderProductBanner = new Swiper('.mainBannerSlider', {
    loop: true,
    direction: 'vertical',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'cube',
});

// ANCHOR --- Clicks events
// ANCHOR (City)
let city =document.querySelector('.citySelect'),
    modal = document.querySelector('.changeCity ');
city.addEventListener('click', function() {
    modal.classList.toggle('active');
});

// ANCHOR (Burger) 
let burger =document.querySelector('.burger'),
    menu = document.querySelector('.navigation');

burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});

// ANCHOR (Banner with tabs) 
let houseForSaleSliderItem =document.querySelectorAll('.houseForSaleSliderItem'),
    navProductTabs = document.querySelectorAll('.navProduct ul li a');

if(houseForSaleSliderItem) {
    for(let i = 0; i < houseForSaleSliderItem.length; i++) {
        navProductTabs[i].addEventListener('click', e => {
            let targetItem = e.currentTarget;
            for(var i = 0; i < navProductTabs.length; i++) {
                navProductTabs[i].classList.remove('active');
                houseForSaleSliderItem[i].classList.remove('active');
                targetItem.classList.add('active');
                if(navProductTabs[i].classList.contains('active')) {
                    houseForSaleSliderItem[i].classList.add('active');
                }
            }
        })
    }
}

// ANCHOR --- Styles 
// ANCHOR (Height top panel)
let mainBanner = document.querySelector('.mainBanner'),
    topPanel = document.querySelector('.topPanel');

mainBanner == null ? topPanel.setAttribute('style', 'position: unset;') : '';

// ANCHOR Fixed top menu 
const fixedMenu = () => {
    if(pageYOffset > 0) {
        topPanel.classList.add('active');
        topPanel.setAttribute('style', 'background: #ffffff; transform: translate(0px, 0px); backdrop-filter: blur(0px)' );  
    } else {
        topPanel.classList.remove('active');
        topPanel.removeAttribute('style', 'transform: translate(0px, 0px);' );
    }
}
fixedMenu();
window.addEventListener('scroll', function() {
    fixedMenu();
});

// ANCHOR (Dropdown menu mobile)
let dropdownArrow = document.querySelectorAll('.dropmenu .arrow');
for (let i = 0; i < dropdownArrow.length; i++) {
    dropdownArrow[i].addEventListener('click', e => {
        let tarElm = e.currentTarget;
        for (let i = 0; i < dropdownArrow.length; i++) {
            if (tarElm !== dropdownArrow[i]) {
                dropdownArrow[i].previousSibling.previousSibling.classList.remove('active');
            }
        }
        tarElm.previousSibling.previousSibling.classList.toggle('active');
    });
};

// window.addEventListener('resize', () => {
    
// });

// ANCHOR (Hover effect on project page)
let projectGroup = document.querySelectorAll('.projectGroup');

if (projectGroup) {
    window.onload = function () {    
        for(var i = 0; i < projectGroup.length; i++) {
            projectGroup[i].onmouseover  = function(e) {
                for(var i = 0; i < projectGroup.length; i++) {
                    projectGroup[i] !== e.currentTarget ? projectGroup[i].setAttribute('style', 'opacity: 0.6;') : '';
                }
            }
            projectGroup[i].onmouseout  = function(e) {
                for(var i = 0; i < projectGroup.length; i++) {
                    projectGroup[i].setAttribute('style', 'opacity: 1;');
                }
            }
        }
    }
}


// ANCHOR --- Pop-ups
let popup = document.querySelectorAll('.popup');
let popupClose = document.querySelectorAll('.popupClose');
let popupOverlay = document.querySelectorAll('.popupOverlay');

// class Popup {
//     constructor(popup = document.querySelectorAll('.popup'), close = document.querySelectorAll('.popupClose'), overlay = document.querySelectorAll('.popupOverlay')) {
//         this.popup = popup;
//         this.close = close;
//         this.overlay = overlay;

//     }

//     closePopup = (el, timer = 0) => {
//         setTimeout(() => {
//             for(elem of el) {
//                 elem.addEventListener('click', e => {
//                     e.currentTarget.parentNode.classList.remove('active');
//                 })
//             }
            
//         }, timer);
        
//         closePopup(overlay);
//         closePopup(close);
//     }
// }

if (popup) {
    const closePopup = (el, timer = 0) => {
        setTimeout(() => {
            for(elem of el) {
                elem.addEventListener('click', e => {
                    e.currentTarget.parentNode.classList.remove('active');
                })
            }
            
        }, timer);
    }
    closePopup(popupOverlay);
    closePopup(popupClose);
    
    const activePopup = (btn, modal) => {
        btnCollection =  document.querySelectorAll(btn);
        for(popupBtn of btnCollection) {
            popupBtn.addEventListener('click', e => {
                
                e.preventDefault();
                for(var i = 0; i < popup.length; i++) {
                    popup[i].id === modal ? popup[i].classList.add('active') : ''; 
                }
                if (e.target.nextElementSibling) {
                    if (e.target.nextElementSibling.classList.contains('popup')) {
                        e.target.nextElementSibling.classList.add('active');
                    }
                }
            })
        }
    }
    activePopup('.popupBtnOffer', 'popupPersonalOffer');
    activePopup('.popupBtnOrder', 'popupOrder');
    activePopup('.popupBtnMap', 'popupMap');

}



// // Roullete

const rouletteSlider = document.querySelector('.rouletteSlider');
const rouletteBtn = document.getElementById('rouletteBtn');
let rouletteSliderItem = document.querySelectorAll('.rouletteSliderItem');

if (rouletteBtn) {
    for(let i = 0; i < rouletteSliderItem.length; i++) {
        let roulleteHeight = rouletteSliderItem[i].offsetHeight * rouletteSliderItem.length;
    
        
        rouletteSliderItem[2].classList.add('rouletteSliderItem-show');
    
        rouletteSlider.setAttribute('style', 'height:' + roulleteHeight + 'px;');
    
        rouletteSlider.append(rouletteSliderItem[i].cloneNode(true));
        let itemHeight = rouletteSliderItem[i].offsetHeight;
    
    
        rouletteSlider.setAttribute('style', 'height: ' + itemHeight * rouletteSliderItem.length + 'px;');
        
    }
    
    var random = Math.floor(Math.random() * 9) + 1; // От 0 до 8
    
    rouletteBtn.addEventListener('click', e => {    
        rouletteSliderItem = document.querySelectorAll('.rouletteSliderItem');
        for(let i = 0; i < rouletteSliderItem.length; i++) {
            let itemHeight = rouletteSliderItem[i].offsetHeight;
            rouletteSliderItem[i].setAttribute('style', 'transform: translate(0 , -' + (itemHeight * random) + 'px)');
        }
    });
}


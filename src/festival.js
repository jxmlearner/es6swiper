import Swiper from 'swiper' // swiper模块

import 'swiper/dist/css/swiper.css' // swiper的样式
import './assets/css/festival.css'

new Swiper('.swiper-container', {
  direction: 'vertical',
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  on: {
    slideChangeTransitionEnd: function () {
      // swiperAnimate(this);
    }
  }
})

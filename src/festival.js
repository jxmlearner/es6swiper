import $ from 'jquery'
import Swiper from 'swiper' // swiper模块

import 'swiper/dist/css/swiper.css' // swiper的样式
import './assets/css/festival.styl'

new Swiper('.swiper-container', {
  direction: 'vertical',
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  on: {
    slideChangeTransitionEnd: function () {
      // console.log(this)
      let index = this.activeIndex
      console.log(index)
      $('.swiper-slide').eq(index).addClass('animate').siblings().removeClass('animate')
    //   if (index === 2) {
    //     $('.swiper-slide').eq(index).addClass('swiper-no-swiping')
    //   }
    },
    init: function () { // 初始化完成之后让第一项增加animate类
      $('.swiper-slide').eq(0).addClass('animate')
    }
  }
})

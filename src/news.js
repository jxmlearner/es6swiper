import Swiper from 'swiper' // swiper模块
import $ from 'jquery'

import 'swiper/dist/css/swiper.css' // swiper的样式
import './assets/css/news.styl'

window.onload = function() {
    new Swiper('.top-header', { // 顶部的导航
        slidesPerView: '6',
        freeMode: true,
        freeModeSticky: true
    })

    new Swiper('.banner', { // 图片切换
        autoplay: 5000,
        loop: true,
        pagination: {
            el: '.banner .pagination'
        }
    })

    new Swiper('#announcement', {
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }
    })

    var tabsSwiper = new Swiper('#tabs-container', {
        speed: 500,
        on: {
            slideChangeTransitionStart: function() { // 切换发生时将tab也进行切换
                $('.tabs .active').removeClass('active')
                $('.tabs a').eq(this.activeIndex).addClass('active')
            }
        }
    })

    $('.tabs a').on('click', function(e) {
        e.preventDefault()
        $('.tabs .active').removeClass('active')
        $(this).addClass('active')
        tabsSwiper.slideTo($(this).index())
    })
}

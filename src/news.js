import Swiper from 'swiper' // swiper模块

import 'swiper/dist/css/swiper.css' // swiper的样式
import './assets/css/news.styl'

new Swiper('.news-header', {
    freeMode: true,
    slidesPerView: 'auto',
    freeModeSticky: true
})

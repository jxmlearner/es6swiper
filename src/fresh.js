import Swiper from 'swiper'

import 'swiper/dist/css/swiper.css'
import './assets/css/fresh.styl'

window.onload = function() {
    var barwidth = 36, //导航粉色条的长度默认36px
        tSpeed = 300, // 切换的速度
        navSlideWidth = 50, // 默认导航条单个项的宽度
        navSum = 520,
        navWidth = 0,
        bar,
        topBar
    var clickIndex = 0
    new Swiper('#nav', {
        slidesPerView: '6',
        freeMode: true,
        freeModeSticky: true,
        on: {
            init: function() { // 导航swiper初始化完成后,重新计算单个导航条的宽度,并将粉色条的那个bar容器宽度更新
               navSlideWidth = this.slides.eq(0).css('width') // 单个导航项的宽度
               bar = this.$el.find('.bar') // 粉色线条容器
               bar.css('width', navSlideWidth)
               bar.transition(tSpeed)
               navSum = this.slides[this.slides.length - 1].offsetLeft // 最后一个slide的位置
               // console.log(navSum) // 62.5*13=812.5
               for (let i = 0; i < this.slides.length; i++) {
                   navWidth += parseInt(this.slides.eq(i).css('width'))
               }
               topBar = this.$el.parents('body').find('#top') // 页头
            },
            tap: function(e) {
                clickIndex = this.clickedIndex
                var clickSlide = this.slides.eq(clickIndex)              
                this.slides.find('span').css('color', 'rgba(51,51,51,1)')
                clickSlide.find('span').css('color', 'rgba(255,72,145,1)') // 点击项的字体颜色变红
            }
        }
    })
}

import Swiper from 'swiper'

import 'swiper/dist/css/swiper.css'
import './assets/css/fresh.styl'

window.onload = function() {
    var barwidth = 36, // 导航粉色条的长度默认36px
        tSpeed = 300, // 切换的速度
        navSlideWidth = 50, // 默认导航条单个项的宽度
        navSum = 520,
        navWidth = 0, clientWidth,
        bar,
        topBar
    var clickIndex = 0
    var navSwiper = new Swiper('#nav', {
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
               clientWidth = parseInt(this.$wrapperEl.css('width')) // Nav的可视宽度

               for (let i = 0; i < this.slides.length; i++) {
                   navWidth += parseInt(this.slides.eq(i).css('width'))
               }
               topBar = this.$el.parents('body').find('#top') // 页头
            },
            tap: function(e) {
                clickIndex = this.clickedIndex
                var clickSlide = this.slides.eq(clickIndex)
                pageSwiper.slideTo(clickIndex, 0)
                this.slides.find('span').css('color', 'rgba(51,51,51,1)')
                clickSlide.find('span').css('color', 'rgba(255,72,145,1)') // 点击项的字体颜色变红
            }
        }
    })

    // 中间内容区域的swiper
    var pageSwiper = new Swiper('#page', {
        watchSlidesProgress: true,
        resistanceRatio: 0,
        on: {
            touchMove: function () {
                var progress = this.progress
                bar.transition(0)
                bar.transform('translateX(' + navSum * progress + 'px)')
                // 粉色255,72,145灰色51,51,51
                for (var i = 0; i < this.slides.length; i++) {
                  var slideProgress = this.slides[i].progress
                  if (Math.abs(slideProgress) < 1) {
                    var r = Math.floor((255 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
                    var g = Math.floor((72 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
                    var b = Math.floor((145 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
                    navSwiper.slides.eq(i).find('span').css('color', 'rgba(' + r + ',' + g + ',' + b + ',1)')
                  }
                }
            },
            transitionStart: function() {
                var activeIndex = this.activeIndex
                var activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft
                bar.transition(tSpeed) // 先将粉色bar条通过translateX定位到相应的位置
                bar.transform('translateX(' + activeSlidePosition + 'px)')

                // 释放时文字变色过渡 (navSwiper相同索引项文字变红,上一项的文字颜色要变灰)
                navSwiper.slides.eq(activeIndex).find('span').transition(tSpeed) // navSwiper的当前索引项文字颜色变红
                navSwiper.slides.eq(activeIndex).find('span').css('color', 'rgba(255,72,145,1)')
                if (activeIndex > 0) {
                    navSwiper.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
                    navSwiper.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(51,51,51,1)')
                }
                if (activeIndex < this.slides.length) {
                    navSwiper.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
                    navSwiper.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(51,51,51,1)')
                }

                // 虽然navSwiper的激活了当前项,但是导航并没有显示在屏幕中间
                // 导航居中
                var navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft // activeSlide距左边的距离
                navSwiper.setTransition(tSpeed)
                if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
                    navSwiper.setTranslate(0)
                } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
                    navSwiper.setTranslate(clientWidth - navWidth)
                } else {
                    navSwiper.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
                }
            }
        }
    })
}

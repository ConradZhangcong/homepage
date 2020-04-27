const polyfill = require('../../helper/polyfill')
const debounce = require('../../helper/debounce')
const throttle = require('../../helper/throttle')
const mousewheel = require('../../helper/mousewheel')

class FullPage {
  constructor(options) {
    const defaultOptions = {
      isShowNav: true,
      delay: 1000,
      definePages: () => {}
    }
    polyfill()
    this.options = Object.assign(defaultOptions, options)
    this.options.definePages = this.options.definePages.bind(this)
    this.container = document.querySelector('#full-page-container')
    this.pages = document.querySelectorAll('.full-page-content')
    this.pagesNum = this.pages.length
    this.navDots = []
    this.viewHeight = document.documentElement.clientHeight
    this.currentPosition = 0
    this.DELAY = this.options.delay
    this.startY = undefined
    this.init()
  }
  // 重新定位
  getNewPosition() {
    this.viewHeight = document.documentElement.clientHeight
    this.container.style.height = `${this.viewHeight}px`
    let activeNavIndex
    this.navDots.forEach((item, index) => {
      if (item.classList.contains('active')) {
        activeNavIndex = index
      }
    })
    this.currentPosition = -(activeNavIndex * this.viewHeight)
    this.turnPage(this.currentPosition)
  }
  // resize重新获取高度
  handleWindowResize(event) {
    debounce(this.getNewPosition, this.DELAY)
  }
  // 页面跳转
  turnPage(height) {
    this.container.style.top = `${height}px`
  }
  // 改变nav的样式
  changeNavStyle(height) {
    if (this.options.isShowNav) {
      this.navDots.forEach((el) => {
        if (el.classList.contains('active')) {
          el.classList.remove('active')
        }
      })
      const i = -height / this.viewHeight
      this.navDots[i].classList.add('active')
    }
  }
  // 创建右侧导航栏
  createNav() {
    const nav = document.createElement('div')
    nav.className = 'nav'
    this.container.appendChild(nav)

    for (let i = 0; i < this.pagesNum; i++) {
      nav.innerHTML += '<p class="nav-dot"><span></span></p>'
    }

    const navDots = document.querySelectorAll('.nav-dot')
    this.navDots = Array.prototype.slice.call(navDots)

    this.navDots[0].classList.add('active')

    this.navDots.forEach((el, i) => {
      el.addEventListener('click', () => {
        this.currentPosition = -(i * this.viewHeight)
        this.options.definePages()
        this.turnPage(this.currentPosition)

        this.navDots.forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active')
          }
        })
        el.classList.add('active')
      })
    })
  }
  goUp() {
    if (-this.container.offsetTop >= this.viewHeight) {
      this.currentPosition = this.currentPosition + this.viewHeight

      this.turnPage(this.currentPosition)
      this.changeNavStyle(this.currentPosition)
      this.options.definePages()
    }
  }
  goDown() {
    if (-this.container.offsetTop <= this.viewHeight * (this.pagesNum - 2)) {
      this.currentPosition = this.currentPosition + this.viewHeight

      this.turnPage(this.currentPosition)
      this.changeNavStyle(this.currentPosition)
      this.options.definePages()
    }
  }
  scroolMouse(event) {
    const delta = mousewheel.getWheelDelta(event)
    if (delta < 0) {
      this.goDown()
    } else {
      this.goUp()
    }
  }
  touchEnd(event) {
    const endY = event.changedTouches[0].pageY
    if (endY - this.startY < 0) {
      this.goDown()
    } else {
      this.goUp()
    }
  }
  init() {
    this.container.style.height = `${this.viewHeight}px`
    if (this.options.isShowNav) {
      this.createNav()
    }
    const handleMouseWheel = throttle(this.scrollMouse, this.DELAY)
    // 鼠标滚轮监听，火狐鼠标滚动事件不同其他
    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
      document.addEventListener('mousewheel', handleMouseWheel)
    } else {
      document.addEventListener('DOMMouseScroll', handleMouseWheel)
    }

    // 手机触屏屏幕
    document.addEventListener('touchstart', (event) => {
      this.startY = event.touches[0].pageY
    })
    const handleTouchEnd = throttle(this.touchEnd, 500)
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('touchmove', (event) => {
      event.preventDefault()
    })

    // 窗口尺寸变化时重置位置
    window.addEventListener('resize', this.handleWindowResize.bind(this))
  }
}

module.exports = FullPage

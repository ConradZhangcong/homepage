function mousewheel(el, callback, isPrevent) {
  // 兼容firefox获取事件类型
  var type = 'mousewheel'
  if (el.onmousewheel === undefined) {
    type = 'DOMMouseScroll'
  }

  function fn(e) {
    e = e || window.event
    if (!e.wheelDelta) {
      e.wheelDelta = e.detail * -40
    }

    // 是否阻止浏览器默认事件
    if (!!isPrevent) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    }

    callback && callback.call(this, e)
  }

  // 兼容ie绑定事件
  if (el.addEventListener) {
    el.addEventListener(type, fn)
  } else {
    el.attachEvent('on' + type, fn)
  }
}

function getWheelDelta(event) {
  if (event.wheelDelta) {
    // 第一次调用之后惰性载入
    this.getWheelDelta = (event) => event.wheelDelta

    // 第一次调用使用
    return event.wheelDelta
  }
  // 兼容火狐
  this.getWheelDelta = (event) => -event.detail
  return -event.detail
}

modulex.exports = {
  mousewheel,
  getWheelDelta,
}

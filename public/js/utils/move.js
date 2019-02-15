/* eslint-disable */
/**
 * 获取样式(兼容ie)
 * @param {HTMLElement} element 需要寻找的样式的html节点
 * @param {String]} attr 在对象中寻找的样式属性
 * @returns {String} 获取到的属性
 */
function getStyle(element, attr) {
  return getComputedStyle(element, false)[attr]
    ? getComputedStyle(element, false)[attr]
    : element.currentStyle[attr]
}

/**
 * 补间动画
 * t current time   : nTime-sTime
 * b begining time  : start
 * c chang in value : 变化量end-start
 * d duration       : 持续时间 time
 */
const Tween = {
  // 匀速
  linear: function(t, b, c, d) {
    return (c * t) / d + b //  t/d = prop;
  },
  // 加速曲线
  easeIn: function(t, b, c, d) {
    return c * (t /= d) * t + b
  },
  // 减速曲线
  easeOut: function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b
  },
  // 加速减速曲线
  easeBoth: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t + b
    }
    return (-c / 2) * (--t * (t - 2) - 1) + b
  },
  // 加加速曲线
  easeInStrong: function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b
  },
  // 减减速曲线
  easeOutStrong: function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  // 加加速减减速曲线
  easeBothStrong: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t * t * t + b
    }
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
  },
  // 正弦衰减曲线（弹动渐入）
  elasticIn: function(t, b, c, d, a, p) {
    if (t === 0) {
      return b
    }
    if ((t /= d) == 1) {
      return b + c
    }
    if (!p) {
      p = d * 0.3
    }
    if (!a || a < Math.abs(c)) {
      a = c
      var s = p / 4
    } else {
      var s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b
  },
  // 正弦增强曲线（弹动渐出）
  elasticOut: function(t, b, c, d, a, p) {
    if (t === 0) {
      return b
    }
    if ((t /= d) == 1) {
      return b + c
    }
    if (!p) {
      p = d * 0.3
    }
    if (!a || a < Math.abs(c)) {
      a = c
      var s = p / 4
    } else {
      var s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b
  },
  elasticBoth: function(t, b, c, d, a, p) {
    if (t === 0) {
      return b
    }
    if ((t /= d / 2) == 2) {
      return b + c
    }
    if (!p) {
      p = d * (0.3 * 1.5)
    }
    if (!a || a < Math.abs(c)) {
      a = c
      var s = p / 4
    } else {
      var s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    if (t < 1) {
      return (
        -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b
      )
    }
    return (
      a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b
    )
  },
  // 回退加速（回退渐入）
  backIn: function(t, b, c, d, s) {
    if (typeof s === 'undefined') {
      s = 1.70158
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  },
  backOut: function(t, b, c, d, s) {
    if (typeof s === 'undefined') {
      s = 3.70158 // 回缩的距离
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },
  backBoth: function(t, b, c, d, s) {
    if (typeof s === 'undefined') {
      s = 1.70158
    }
    if ((t /= d / 2) < 1) {
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
    }
    return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
  },
  // 弹球减振（弹球渐出）
  bounceIn: function(t, b, c, d) {
    return c - Tween['bounceOut'](d - t, 0, c, d) + b
  },
  bounceOut: function(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    }
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
  },
  bounceBoth: function(t, b, c, d) {
    if (t < d / 2) {
      return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b
    }
    return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
  }
}

/**
 * 时间版运动函数(在mounted之后使用)
 * @param {Object} params 参数对象
 * - el 进行运动的dom节点
 * - target 目标样式 eg:{'opacity':100,'left':200,'width':300}
 * - time 运动的时间 default:1000
 * - prop 补间动画(Tween.js) default:'linear'
 * @param {Function} cb 回调函数
 */
const move = (params, cb) => {
  let { el, target, time, prop } = params
  time = time || 1000
  prop = prop || 'linear'
  clearInterval(el.timer)
  let start = {}
  let end = {}
  for (let attr in target) {
    start[attr] = attr === 'opacity' ? getStyle(el, attr) * 100 : parseInt(getStyle(el, attr)) || 0
    end[attr] = target[attr]
  }
  const sTime = new Date()
  el.timer = setInterval(() => {
    let nTime = new Date()
    let t = nTime - sTime
    let d = time
    if (t >= d) {
      t = d
      clearInterval(el.timer)
      cb && cb.call(el)
    }
    for (let attr in target) {
      let b = start[attr]
      let c = end[attr] - b
      if (attr === 'opacity') {
        let s = Tween[prop](t, b, c, d)
        el.style[attr] = s / 100
        el.style.filter = 'alpha(opacity=' + s + ')'
      } else {
        let s = Tween[prop](t, b, c, d)
        el.style[attr] = s + 'px'
      }
    }
  }, 13)
}

export default move

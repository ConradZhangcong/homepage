module.exports = (fn, time = 500) => {
  let timer = null
  return () => {
    clearTimeout(timer)
    setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

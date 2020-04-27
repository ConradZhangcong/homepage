module.exports = (fn, time = 500) => {
  let activeTime = 0
  return () => {
    const currentTime = Date.now()
    if (currentTime - activeTime > time) {
      fn.apply(this, arguments)
      activeTime = Date.now()
    }
  }
}

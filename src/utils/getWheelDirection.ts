// 鼠标滚轮事件 获取滚动长度
// firefox 是 DOMMouseScroll 事件，对应的滚轮信息（向前滚还是向后滚）存储在 detail 属性中，向前滚，这个属性值是 3 的倍数，反之，是 -3 的倍数；
// firefox 之外的其他浏览器是 mousewheel 事件，对应的滚轮信息存储在 wheelDelta 属性中，向前滚，这个属性值是 -120 的倍数，反之， 120 的倍数。
const getWheelDelta = (event: any) => {
  if (event.wheelDelta) {
    return event.wheelDelta;
  } else {
    // 兼容火狐
    return -event.detail;
  }
};

const getWheelDirection = (event: any) => {
  const delta = getWheelDelta(event);
  // delta < 0，鼠标往前滚动，页面向下滚动
  if (delta < 0) {
    return "down";
  } else {
    return "up";
  }
};

export default getWheelDirection;

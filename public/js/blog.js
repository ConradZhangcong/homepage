let pageBtn = document.getElementsByClassName('paginate-page');
console.log(pageBtn);

let data = JSON.parse(jsData);
console.log(data)

if (data.pageNum == 1) {
  // 左边的箭头取消点击 .paginate-no-drop a链接取消
}

if (data.pageNum == data.pages) {
  // 右边的箭头取消点击
}

// 当前页 paginate-page-active
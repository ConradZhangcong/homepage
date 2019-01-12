(function () {
  function AjaxRequest(options) {
    this.type = options.type || 'post';
    this.url = options.url;
    this.params = options.params || {};
    this.mask = options.mask || true;
    this.dataType = options.dataType || 'json';
    this.callback = options.callback;
    this.init();
  }
  AjaxRequest.prototype = {
    init: function () {
      this.sendRequest();
    },
    showMask: function () {
      if (this.mask) {
        layer.open({
          type: 3
        });
      }
    },
    hideMask: function () {
      if (this.mask) {
        layer.closeAll('loading');
      }
    },
    sendRequest: function () {
      var self = this;
      $.ajax({
        type: this.type,
        url: this.url,
        data: this.params,
        dataType: this.dataType,
        beforeSend: this.showMask(),
        success: function (res) {
          self.hideMask();
          if (self.callback) {
            if (Object.prototype.toString.call(self.callback) === "[object Function]") {
              if (res.code === 200) {
                self.callback(res);
              } else {
                layer.msg(res.msg, {
                  icon: 2,
                  time: 1000
                })
              }
            } else {
              console.log('callback is not a function')
            }
          }
        },
        error: function (error) {
          self.hideMask();
          layer.msg('服务器繁忙', {
            icon: 2,
            time: 1000
          });
        }
      })
    }
  }
  window.AjaxRequest = AjaxRequest;
})()
$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007'+options.url;
  if (options.url.indexOf('/my/')!==-1){
    options.headers = {
      Authorization: localStorage.getItem('token')||''
    }
  }
  // 全局统一挂载complete回调函数
  options.complete = function (res){
    if(res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！'){
      //         // 清空token值 
            localStorage.removeItem('token')
      //         // 强制跳转到登录页面
             location.href= '/login1.html'
    }
  }
})

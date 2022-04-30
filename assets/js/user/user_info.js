$(function(){
  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义 用户昵称规则
    nickname: function(value){
        if (value.length >6 ){
            return('用户昵称必须在1~6个字符之间')
        }
    }
  })

   initUserInfo()

  // 获取用户信息  初始化
  function initUserInfo() {
    $.ajax({
      method : 'GET',
      url : '/my/userinfo',
      success: function (res){
         if (res.status !==0){
           return layer.msg ('获取用户信息失败！')
         }
         console.log(res.data);
        // 用form.val快速为表单赋值
        form.val('formUserInfo',res.data)
      }
    })
  }
  // 重置信息
  $('#btnReset').on('click',function(e){
    e.preventDefault
    initUserInfo()
  })
  // 更新用户信息
   $('#resetUserInfo').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method : 'POST',
      url : '/my/userinfo',
      data: $(this).serialize(),
      success : function (res){
        console.log(res);
        if(res.status !==0){
          return layer.msg ('更新用户信息失败！')
        }else{
          console.log(res);
          layer.msg('更新用户信息成功！')
            // 在父页面（index.html）中重新获取用户信息 并 渲染头像和用户信息
          window.parent.getUserInfo ()
        }
       
      }
    })
  
   }) 
})
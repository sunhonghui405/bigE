$(function(){
    
    getUserInfo ();
    var layer = layui.layer

    $('.loginout').on('click',function(){
        layer.confirm('确定退出？',{icon :3,title : '提示'},function(index){
             // 删除本地存储的token
             localStorage.removeItem('token')
            //  页面跳转到登陆界面
            window.location.href= '/login1.html'
        })
    })
  
    
})
function getUserInfo (){
    $.ajax({
        method : 'GET',
        url : '/my/userinfo',
     //    这部分已经在baseApi内部统一设置了
     //    headers : {
     //     Authorization: localStorage.getItem('token')
     //    },
        success : function(res){
           if (res.status !== 0){
               return layui.layer.msg ('获取用户信息失败！')
           }
           renderAvatar(res.data)
        },
        // ajax请求成功或者失败都回调用comlpete函数  控制未登录账号的用户访问权限
        // complete : function(res){
        //     console.log(res.responseJSON)
        //     // complete 返回值中responseJSON中 有status 及message值
        //     if(res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！'){
        //         // 清空token值 
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href= '/login1.html'
                
        //     }
        // }
    })
 }
 function renderAvatar(user){
     // 获取用户名
   var name = user.nickname||user.username
 //   设置欢迎
   $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
 //   渲染头像部分
 if(user.user_pic!==null) {
     $('.layui-nav-img').attr('src',user.user_pic).show()
     $('.text-avatar').hide()
 }else{
     $('.layui-nav-img').hide()
     firstname=name[0].toUpperCase()
     $('.text-avatar').html(firstname).show()
       
 }
 

 }
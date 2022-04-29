$(function(){
    $('.link-reg').on('click',function(){
        $('.loginbox').hide()
        $('.regbox').show()
    })
    $('.link-log').on('click',function(){
        $('.loginbox').show()
        $('.regbox').hide()
    })
      // 从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function(value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.regbox [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
   
  })
  $("#form_reg").on('submit',function(e){
    e.preventDefault();
    
     var data = {
         username : $('#form_reg [name=username]').val(),
         password : $('#form_reg [name=password]').val()
        }
       
     $.post('http://www.liulongbin.top:3007/api/reguser',data,function(res){
        
    if (res.status !== 0){
        return  layer.msg(res.message)
      }
       layer.msg("注册成功，请登录！")
       $('.ling-log').click();
     })
  })
  $('#form_login').submit(function(e){
    e.preventDefault();
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success:function(res){
            if (res.status !==0){
                return layer.msg ('登录失败')
            }
            localStorage.setItem('token',res.token)
            layer.msg('登陆成功！')
            window.location.href='/index1.html'
           
        }
    })
  })
})


$(function() {
    $('#username').focus(function(){$('.loginName').text('');})
    $('#password').focus(function(){$('.loginPass').text('');})
     $('#loginBtn').click(function(){
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();
         if(username==''){
             $('.loginName').text('用户名不能为空!');
             return false;
         }
         if(password==''){
             $('.loginPass').text('密码不能为空!');
             return false;
         }
        $.ajax({
            type: 'get',
             url: '../../websrvZniot/login',
            data: {
                username:username,
                password:password
            },
            success: function(data){
                if(data.statusCode==2){
                    window.location.href = window.location.origin+"/products/Web/index.html?userid="+data.userId
                }else{
                     swal({
                    title: "",
                    text: "账号或密码错误！",
                    type: "warning",     
                    confirmButtonText: "确定"     
                    })
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    })
})
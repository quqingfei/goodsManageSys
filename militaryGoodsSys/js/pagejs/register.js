$(function(){
    var username = $('#username');
    var password = $('#password');
    var repassword = $('#repassword');
    var email = $('#email');
    var phonenumber = $('#phonenumber');
    var authority = $('#authority'); 
    var role = null;
    username.blur(function(){
        emptytip($(this),$('.username'),'用户名不得为空');
    });
    username.focus(function(){        
        emptyfous($(this),$('.username'),'用户名为英文或数字组成, 不超过20位');
    });
    username.keyup(function(){
         emptytip($(this),$('.username'),'用户名不得为空');        
    });    
    password.blur(function(){
        emptytip($(this),$('.password'),'密码不得为空！');
        
    });
    password.focus(function(){
        emptyfous($(this),$('.password'),'密码为英文或数字组成, 不小于6位');
    });
    password.keyup(function(){
        emptytip($(this),$('.password'),'密码不得为空');
    });
    repassword.blur(function(){
        emptytip($(this),$('.password'),'重复密码不得为空！');
    });
//    repassword.focus(function(){        
//        emptypsd($(this),'重复密码');
//    });
    repassword.keyup(function(){
        emptytip($(this),$('.password'),'重复密码不得为空');
    });
    phonenumber.blur(function(){
        emptytip($(this),$('.phonenumber'),'手机号码不得为空！');
    });
    email.blur(function(){
        emptytip($(this),$('.email'),'电子邮箱不得为空！');
    });
    email.focus(function(){
        emptyfous($(this),$('.email'),'');
    });
    phonenumber.focus(function(){
        emptyfous($(this),$('.phonenumber'),'手机号码为11位数字');
    });
    function emptytip(ele,eles,n){
        if($(ele).val().trim().length == 0){
            eles.removeClass('text-gruy').addClass('text-danger').text(n);
        }else{
           eles.text(''); 
        }
    }
    function emptyfous(ele,eles,n){
        if($(ele).val().trim().length == 0){
            eles.removeClass('text-danger').addClass('text-gruy').text(n);
        }else{
           eles.text(''); 
        }
    }
    authority.change(function(){
        if(!$(this).val()){
            $('.authority').addClass('text-danger').text('请选择用户对象');
        }else{
            $('.authority').text('');
            role = $(this).val()
        }
    })
    
    var reg = /^[A-Za-z\d-.]+$/;  
    var phonereg = /^1[3|4|5|7|8]\d{9}$/;
    var emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    //提交数据
    $('#registerbtn').click(function(){
        var user = username.val().trim();
        var pass = password.val().trim();
        var repass = repassword.val().trim();
        var phone = phonenumber.val().trim();
        var emailword = email.val().trim();
        if(user.length <= 0){
            emptytip(username,$('.username'),'用户名不得为空');
            return false;
        }
        if(!reg.test(user)){
            $('.username').removeClass('text-gruy').addClass('text-danger').text('用户名由英文或者数字组成!');
//            emptytip(username,$('.username'),'用户名由英文或者数字组成');
            return false;
        }
        if(pass.length <= 0){
            emptytip(password,$('.password'),'密码不得为空');
            return false;
        }
        if(!reg.test(pass)){
            $('.password').removeClass('text-gruy').addClass('text-danger').text('密码由英文或者数字组成!');
//            emptytip(password,$('.password'),'密码由英文或者数字组成');
            return false;
        }
        if(repass.length <= 0){
            emptytip(repassword,$('.password'),'重复密码不得为空');
            return false;
        }
        if(repass != pass){
            $('.password').removeClass('text-gruy').addClass('text-danger').text('两次输入密码不一致!');
//            emptytip(repassword,$('.password'),'两次输入密码不一致!');
            return false;
        }
        if(phone.length <= 0){
            emptytip(phonenumber,$('.phonenumber'),'手机号不得为空');
            return false;
        }
        if(!phonereg.test(phone)){
            $('.phonenumber').removeClass('text-gruy').addClass('text-danger').text('请输入正确的手机号码!');
//            emptytip(phonenumber,$('.phonenumber'),'请输入正确的手机号码');
            return false;
        }
        if(!role){
            $('.authority').addClass('text-danger').text('请选择用户角色');
            return false;
        }
        if(emailword.length <= 0){
            emptytip(email,('.email'),'邮箱不得为空');
            return false;
        }else if(!emailreg.test(emailword)){
            $('.email').removeClass('text-gruy').addClass('text-danger').text('请输入正确的邮箱!');
            return false;
        }
        $.ajax({
            type: 'post',
             url: '../../websrvZniot/ieszlh',
            data: {
                userName:user,
                pass:pass,
                mobile:phone,
                email: emailword,
                role: role,
                name: $('#name').val().trim(),
                 sex: $('#sex input[name="sex"]:checked').val(),
       undertakeTime: $('.startdate').html(),
          finishTime: $('.enddate').html(),
             remarks: $('#remarks').val()
            },
            success: function(data){
                if(data.statusCode == 5){
                     swal({
                    title: "",
                    text: "注册成功！",
                    type: "success",     
                    confirmButtonText: "确定"     
                    })
                     window.location.href = window.location.origin+"/products/Web/login.html"
                }else if(data.statusCode == 17) {
                    $('.username').removeClass('text-gruy').addClass('text-danger').text('此用户名已被使用!');
                }else if(data.statusCode == 18){
                    $('.username').removeClass('text-gruy').addClass('text-danger').text('用户名不得包含中文!');
                }else if(data.statusCode == 19){
                    $('.email').removeClass('text-gruy').addClass('text-danger').text('邮箱格式不正确!');
                }else if(data.statusCode == 20){
                    $('.password').removeClass('text-gruy').addClass('text-danger').text('密码长度不得小于6位!');
                }else if(data.statusCode == 6){
                    swal({
                    title: "",
                    text: "注册失败！请重新提交！",
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
$(function () {  
    $(".login-box").on('click',function () {  
        $('.login-content').hide();
        $(".reg-content").show();
    })
    $(".reg-box").on('click',function () {  
        $('.login-content').show();
        $(".reg-content").hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({ 
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function (value) {  
            var pwd = $("#form-reg [name=password]").val();
            if(pwd !== value){
                return '两次输入的密码不同';
            }
        }
    });  
    //注册ajax的获取数据
    $('#form-reg').on('submit',function (e) {  
        e.preventDefault();
        // console.log($('#form-reg [name=password]').val())
        var data = {
            username:$("#form-reg [name=username]").val(),
            password:$('#form-reg [name=password]').val()
        }
        $.post('/api/reguser',data,function (res) { 
            console.log(res)
            if(res.status===0){  
                $(".reg-box").click();
                $("#form_login [name=username]").val($("#form-reg [name=username]").val())
                $("#form_login [name=password]").val($("#form-reg [name=password]").val())
            }else{
                layer.msg(res.message)
            }
        })
    })
    //登录ajax的获取数据
    $("#form_login").on("submit",function (e) {  
        console.log($('#form_login').serialize())
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$('#form_login').serialize(),
            success:function (res) {  
                if(res.status === 0){
                    localStorage.setItem("token",res.token);
                    location.href = './index.html'
                }else{
                    layer.msg(res.message)
                }
            }
        })
    })
})

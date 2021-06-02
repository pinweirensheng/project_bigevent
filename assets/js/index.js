$(function () {  
    getUserInfo();
    var layer = layui.layer;
    function getUserInfo() {  
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function (res) {  
                if(res.status==0){
                    renderAvatar(res.data);
                }else{
                    return layer.msg(res.message);
                }
            }
        })
    }
    function renderAvatar(data) {  
        var name = data.nickname||data.username;
        $('#welcome').html("欢迎"+name);
        if(data.user_pic!==null){
            $(".layui-nav-img").attr('src',data.user_pic).show();
            $('.img-circle').hide();
        }else{
            var first = name[0].toUpperCase();
            $(".layui-nav-img").hide();
            $('.img-circle').html(first).show();
        }
    }
    $("#outbtn").on('click',function () {  
        layer.confirm('确定退出登录?', {icon: 3, title:'确定退出登录?'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href='./login.html'
            layer.close(index);
        });
    })
})
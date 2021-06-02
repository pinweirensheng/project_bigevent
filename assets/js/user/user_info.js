$(function () {  
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function (value) {  
            if(value.length>6){
                return '昵称不能大于6个字符'
            }
        }
    })
    initUserInfo();
    function initUserInfo() {  
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function (res) {  
                if(res.status===0){
                    form.val('formInfo', res.data);
                }
            }
        })
    }
    $("#cz").on('click',function (e) { 
         e.preventDefault();
        initUserInfo()
    })
    $(".layui-form").on('submit',function (e) {  
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function (res) {  
                if(res.status!==0){
                   return layer.msg("更新用户信息失败！");
                }
                layer.msg('更新用户信息成功');
                // window.parent.getUserInfo();
            }
        })
    })
})
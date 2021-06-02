$(function () { 
    var layer = layui.layer; 
    var $image = $('#image') 
    // 1.2 配置选项 
    const options = { 
        // 纵横比 
        aspectRatio: 1, 
        // 指定预览区域 
        preview: '.img-preview' 
    }
    // 1.3 创建裁剪区域 
    $image.cropper(options);
    $('#imgBtn').on('click',function () {  
        $('#file').click();
    })
    $('#file').on('change',function (e) {  
        console.log(e)
        var files = e.target.files;
        if(files.length==0){
            return layer.msg('请选择图片')
        }
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image .cropper('destroy') // 销毁旧的裁剪区域 
        .attr('src', newImgURL) // 重新设置图片路径 
        .cropper(options)
    })
    //确实图片修改按钮事件
    $('#btnOk').on('click',function () {  
        var dataURL = $image .cropper('getCroppedCanvas', { 
            // 创建一个 Canvas 画布 
            width: 100, 
            height: 100 
        }).toDataURL('image/png')
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function (res) {  
                console.log(res)
                if(res.status!==0){
                    return layer.msg('更新头像失败');
                }
                layer.msg('更新头像成功');
            }
        })
    })
})
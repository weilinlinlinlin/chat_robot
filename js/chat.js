
$(function(){
    // 初始化右侧滚动条

    // 这个方法定义在scroll.js中

    // 为发送按钮绑定鼠标点击事件
    $("#btnSend").on('click',function(){
        var text = $("#ipt").val().trim()
        if(text.length <= 0) return $("#ipt").val('')

        // 若用户输入了内容 则将内容追加在聊天列表（页面）上显示
        $("#talk_list").append('<li class="right_word"><img src="img/person02.png"/><span>'+text+'</span></li>')
        $("#ipt").val('')

        resetui()   // 让滚动条重置到最底部

        // 发起请求获取消息
        getMsg(text)

    })

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: "GET",
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken: text
            },
            success: function(res){
                console.log(res)
                // 接收聊天消息
                if(res.message === 'success'){
                    var msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+msg+'</span></li>')
                    resetui()   // 让滚动条重置到最底部

                    // 播放语音
                    getVoice(msg)

                }
            }
        })
    }

    // 将机器人的聊天内容转换为音频
    function getVoice(text){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(res){
                console.log(res)
                if(res.status === 200){
                    // 播放语音
                    $("#voice").attr('src', res.voiceUrl)
                }
            }
        })
    }

    // 绑定键盘事件 回车发送消息
    $("#ipt").on('keyup', function(e){
        if(e.keyCode === 13){
            $("#btnSend").click()
        }
    })

  })
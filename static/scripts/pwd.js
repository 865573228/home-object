$(document).ready(function(){
    var regCode = /^\d{6}$/,
//        regId = /(^/d{15}$)|(^/d{17}([0-9]|X)$)/,

        regPhoneCode = /^.{6,}$/,
        regPhone = /^0?1[3458]\d{9}$/,
        apiRoot = 'http://192.168.0.100',
        $regNum=$('#regNum'),
        $getCaptcha = $('#getCode'),
        timer = 15000,
        getCoding = 'coding',
        defTips = '获取验证码',
        couTips = '秒后获取验证码',
        maxSecond = 60,
        interval = 1000,
        timeout = null,
        flag = false,
        errorInfo = '服务器忙，请稍后重试';

    function countdown() {
        maxSecond = 60;
        clearTimeout(timeout);

        $getCaptcha.text(maxSecond + couTips).addClass(getCoding);

        timeout = setTimeout(function(){
            maxSecond -= 1;
            if (maxSecond > 0) {
                $getCaptcha.text(maxSecond + couTips);
                timeout = setTimeout(arguments.callee, interval);
            } else {
                $getCaptcha.text(defTips).removeClass(getCoding);
            }
        }, interval);
    }
    function verifyInput(regexp,input){
        var returnValue = regexp.test($.trim(input.val()));
        if(!returnValue){
            input.focus();
        }
        return returnValue;
    }

    // 获取手机验证码
    $getCaptcha.click(function(){
        var user = verifyInput(regPhone, $regNum);

        if ($(this).hasClass(getCoding)) {
            return false;
        }

        flag = user;

        if (flag) {
            $.ajax({
                type: 'GET',
                url: apiRoot + 'api/',
                data: '',
                dataType: 'json',
                timeout: timer,
                success: function(data){
                    // alert('验证码已发送至您手机');
                    // 在返回成功的时候启用倒计时
                    countdown();
                },
                error: function(){
                    alert(errorInfo);
                }
            });
        } else {
            $regNum.focus();
        }

        return false;
    });

    //注册
    $(function(){
        var $regForm=$('#regForm'),
            $codeNum=$('#codeNum'),
            $regPwd=$('#regPwd');
        $regForm.submit(function(){
            var postData = {};
            if(!verifyInput(regPhone,$regNum)){
                $regNum.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if(!verifyInput(regCode,$codeNum)){
                $codeNum.parent().find('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if(!verifyInput(regPhoneCode,$regPwd)){
                $regPwd.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            postData = $(this).serialize();

            $.ajax({
                type:'POST',
                url:apiRoot + '/api',
                data:postData,
                dataType:'json',
                success:function(data){
                    $regForm.get(0).reset();
                },
                error:function(){
                    alert(errorInfo);
                }
            });
            return false;

        });

    });



    //登录
    $(function(){
        var $loginForm = $('#loginForm'),
            $loginPhone = $('#loginPhone'),
            $loginPwd = $('#loginPwd');
        $loginForm.submit(function(){
            var postData = {};
            if(!verifyInput(regPhone,$loginPhone)){
                $loginPhone.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if(!verifyInput(regPhoneCode,$loginPwd)){
                $loginPwd.next('.msg').show().fadeOut(1000);
                $loginPwd.focus();
                return false;
            }

            postData = $(this).serialize();

            $.ajax({
                type:'POST',
                url:apiRoot + '/api',
                data:postData,
                dataType:'json',
                success:function(data){
                    $loginForm.get(0).reset();
                },
                error:function(){
                    alert(errorInfo);
                }
            });
            return false;
        });
    });

    //重置密码
    $(function(){
        var $resetForm=$('#resetForm'),
            $codeNum=$('#codeNum'),
            $regPwd=$('#regPwd');
        $resetForm.submit(function(){
            var postData = {};
            if(!verifyInput(regPhone,$regNum)){
                $regNum.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if(!verifyInput(regCode,$codeNum)){
                $codeNum.parent().find('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if(!verifyInput(regPhoneCode,$regPwd)){
                $regPwd.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            postData = $(this).serialize();

            $.ajax({
                type:'POST',
                url:apiRoot + '/api',
                data:postData,
                dataType:'json',
                success:function(data){
                    $resetForm.get(0).reset();
                },
                error:function(){
                    alert(errorInfo);
                }
            });
            return false;

        });
    });

    //编辑收货地址
    $(function(){
        var $editForm=$('#editForm'),
            $rName=$('#rName'),
            $rNum=$('#rNum'),
            $Province=$('#Province'),
            $City=$('#City'),
            $Area=$('#Area'),
            $pCode=$('#pCode'),
            $rAddress=$('#rAddress');

        $editForm.submit(function(){
            var postData = {};
            if($rName.val()==''){
                $rName.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if(!verifyInput(regPhone,$rNum)){
                $rNum.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if($Province.val()==''){
                $Province.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if($City.val()==''){
                $City.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if($Area.val()==''){
                $Area.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if($pCode.val()==''){
                $pCode.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            if($rAddress.val()==''){
                $rAddress.next('.msg').show().fadeOut(1000);
                $(this).focus();
                return false;
            }
            postData = $(this).serialize();

            $.ajax({
                type:'POST',
                url:apiRoot + '/api',
                data:postData,
                dataType:'json',
                success:function(data){
                    $editForm.get(0).reset();
                },
                error:function(){
                    alert(errorInfo);
                }
            });
            return false;
        });
    });
});

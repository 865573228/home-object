$(document).ready(function(){
    //数量增减
    $('.num-right').click(function () {
        var $numValue = parseInt($(this).prev().val());
        $(this).prev().val($numValue + 1);
    });
    $('.num-left').click(function () {
        var $numValue = parseInt($(this).next().val());
        if ($numValue > 1) {
            $(this).next().val($numValue - 1);
        }
    });
    $('.num-in').keyup(function () {
        var $numValue = $(this).val();
        if ($numValue < 1) {
            $('.num-in').val(1);
        }
    });

    //地址编辑
    $('.edit-btn').click(function(){
        $('.r-tag').toggleClass('none');
        $('.r-title').toggleClass('selected');
    });

    //分享弹窗
    $('.share').click(function(){
        $('.s-mask,.share-box').removeClass('none');
        return false;
    });
    $('.share-cancel').click(function(){
        $('.s-mask,.share-box').addClass('none');
        return false;
    });

});

$(function() {
    $('#mastNav li a').hover(function() {
        $(this).after('<div class="arrow_down"></div>');
    }, function() {
        $('.arrow_down').remove();
    });
});

$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();

    if (scrollTop > 500) {
        $(".meter > span.one").stop().animate({
            width: "90%"
        }, 300);
        $(".meter > span.two").stop().animate({
            width: "70%"
        }, 300);
        $(".meter > span.three").stop().animate({
            width: "80%"
        }, 300);
        $(".meter > span.four").stop().animate({
            width: "50%"
        }, 300);
    }

});

$(function(){
    $('a[href^="index.html#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

$(function() {
    var mapHelper = new styledMapsHelper();
    mapHelper.createStyledMap($('.map'), 'leicester', gmapOldStyle, true);
});

$(function() {
    var mapHelper = new styledMapsHelper();
    mapHelper.createStyledMap($('.map'), 'leicester', gmapOldStyle, true);
});

$(function () {
    $('#mastNav').meanmenu();
});

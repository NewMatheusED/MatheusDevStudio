$(function(){
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    //----------------------------------------------------------------

    $('header .container .desktop ul li a').click(function(){
        var href = $(this).attr('href');
        var target = $(href);
        var offset = target.offset();
        $('html, body').animate({scrollTop: offset.top}, 300);
    })

    //----------------------------------------------------------------

    function isInViewport(element, offset = 200) {
        var elementTop = $(element).offset().top + offset;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function updateActiveMenuItem() {
        $('header .container .desktop ul li a').each(function() {
            var href = $(this).attr('href');
            var target = $(href);
            if (isInViewport(target)) {
                $('header .container .desktop ul li a').removeClass('active');
                $(this).addClass('active');
            }
        });
    }

    $(window).on('scroll', function() {
            updateActiveMenuItem();
    });

    //----------------------------------------------------------------
})

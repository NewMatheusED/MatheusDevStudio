$(function(){
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    //----------------------------------------------------------------

    // setTimeout(function(){
    //     $('.info h3').addClass('active');
    // },2000)

    //----------------------------------------------------------------

    $('header .container i').click(function(){
        $('header .container .mobile ul').slideToggle();
    
    })

    //----------------------------------------------------------------

    // $(window).on('scroll', function() {
    //     var scrollTop = $(window).scrollTop();
    //     var imgPos = scrollTop / 2 + 'px';
    //     imgPos = imgPos* (-1);
    //     $('.particles-js-canvas-el').css('transform', 'translateY(' + imgPos + ')');
    // });

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

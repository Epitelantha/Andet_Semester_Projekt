$(function () {

    var nav = $('.navbar'),
        doc = $(document),
        win = $(window),
        ico = $('.fa');
    
    var bckground = $('.headpicture')

    win.scroll(function () {

        if (doc.scrollTop() > 60) {
            nav.addClass('scrolled'),
            ico.removeClass('fa-2x'),
            ico.addClass('fa-lg');
        } else {
            nav.removeClass('scrolled'),
            ico.removeClass('fa-lg'),
            ico.addClass('fa-2x');
        }

    });
    
    bckground.height(function(){
        
        windowHeight = win.innerHeight();
        bckground.css('height', windowHeight - 70);
        
    });
    
    bckground.height();

    // Trigger the scroll listener on page load

    win.scroll();
    
});
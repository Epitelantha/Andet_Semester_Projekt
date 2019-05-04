var mainColor = '#ff0000';
var secondaryColor = '#ff5623';
var backgroundColor = '#442c2f';

$(function () {
    
    if (localStorage.getItem("mainColor") != null) {
        mainColor = localStorage.getItem("mainColor");
        console.log(mainColor);
    }
    if (localStorage.getItem("secondaryColor") != null) {
        secondaryColor = localStorage.getItem("secondaryColor");
    }
    if (localStorage.getItem("backgroundColor") != null) {
        backgroundColor = localStorage.getItem("backgroundColor");
    }
    

    if (localStorage.getItem("mainColor") == null) {
        localStorage.setItem("mainColor", mainColor);
    }
    if (localStorage.getItem("secondaryColor") == null) {
        localStorage.setItem("secondaryColor", secondaryColor);
    }
    if (localStorage.getItem("backgroundColor") == null) {
        localStorage.setItem("backgroundColor", backgroundColor);
    }
    
    

    $('.header-user-dropdown .header-limiter h1 span').css('color', mainColor),
        $('.header-user-dropdown .header-limiter .header-user-menu').css('background-color', secondaryColor),
        $('.footer-klasse .footer-center i').css('background-color', secondaryColor),
        $('.footer-klasse .footer-ikoner a').css('background-color', secondaryColor),
        $('.header-user-dropdown').css('background', backgroundColor),
        $('.footer-klasse').css('background-color', backgroundColor);

});

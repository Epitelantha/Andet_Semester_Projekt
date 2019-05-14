var mainColor = '#00ff4a';
var secondaryColor = '#36bc36';
var backgroundColor = '#228b22';

var titleOne = 'Frisør';
var titleTwo = 'Moii';

var adresse = 'Mageløs 10';
var teleNummer = '+45 66146250';
var mail = "salon@moii.dk";

$(function () {

    if (localStorage.getItem("titlePartOne") == null) {
        localStorage.setItem("titlePartOne", titleOne);
    }
    if (localStorage.getItem("titlePartTwo") == null) {
        localStorage.setItem("titlePartTwo", titleTwo);
    }

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

    if (localStorage.getItem("titlePartOne") != null) {
        titleOne = localStorage.getItem("titlePartOne");
    }
    if (localStorage.getItem("titlePartTwo") != null) {
        titleTwo = localStorage.getItem("titlePartTwo");
    }
    
    if (localStorage.getItem("adress") != null) {
        adresse = localStorage.getItem("adress");
    }
    if (localStorage.getItem("teleNummer") != null) {
        teleNummer = localStorage.getItem("teleNummer");
    }
    if (localStorage.getItem("mail") != null) {
        mail = localStorage.getItem("mail");
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

    $('#titlePartOne').html(titleOne + "<span>" + titleTwo + "</span>");
    
    $('.adresse').html("<span>" + adresse + "</span> Odense, Danmark</p>");
    $('.telefone').html(teleNummer);
    $('.mailAdresse').html("<a href='mailto:" + mail + "'>" + mail + "</a>");
    
    $('.header-user-dropdown .header-limiter h1 span').css('color', mainColor),
        $('.header-user-dropdown .header-limiter .header-user-menu').css('background-color', secondaryColor),
        $('.footer-klasse .footer-center i').css('background-color', secondaryColor),
        $('.footer-klasse .footer-ikoner a').css('background-color', secondaryColor),
        $('.header-user-dropdown').css('background', backgroundColor),
        $('.footer-klasse').css('background-color', backgroundColor);
    
    $('.kontaktDiv').css('border', '2px solid ' + secondaryColor);
    $('input[type=submit]').css('background-color', secondaryColor);
    $('input[type=submit]:hover').css('background-color', secondaryColor);
    $('body')[0].style.setProperty('--mainColor', mainColor);
    $('body')[0].style.setProperty('--backgroundColor', backgroundColor);
    
});

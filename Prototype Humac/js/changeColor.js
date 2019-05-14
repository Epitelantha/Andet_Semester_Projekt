var mainColor = '#003bff';
var secondaryColor = '#548ce5';
var backgroundColor = '#0d3942';

var titleOne = 'Hu';
var titleTwo = 'Mac';

var adresse = 'Vestergade 94';
var teleNummer = '+45 70215353';
var mail = "Businessdk@Humac.dk";

$(function () {

    if (localStorage.getItem("titlePartOne") == null) {
        localStorage.setItem("titlePartOne", titleOne);
    }
    if (localStorage.getItem("titlePartTwo") == null) {
        localStorage.setItem("titlePartTwo", titleTwo);
    }

    if (localStorage.getItem("mainColor") != null) {
        mainColor = localStorage.getItem("mainColor");
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

    if (localStorage.getItem("mainColor") == null) {
        localStorage.setItem("mainColor", mainColor);
    }
    if (localStorage.getItem("secondaryColor") == null) {
        localStorage.setItem("secondaryColor", secondaryColor);
    }
    if (localStorage.getItem("backgroundColor") == null) {
        localStorage.setItem("backgroundColor", backgroundColor);
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

    $('#titlePartOne').html(titleOne + "<span>" + titleTwo + "</span>");

    $('.adresse').html("<span>" + adresse + "</span> Odense, Danmark</p>"), $('.telefone').html(teleNummer), $('.mailAdresse').html("<a href='mailto:" + mail + "'>" + mail + "</a>");

    $('.header-user-dropdown .header-limiter h1 span').css('color', mainColor), $('.header-user-dropdown .header-limiter .header-user-menu').css('background-color', secondaryColor),
        $('.footer-klasse .footer-center i').css('background-color', secondaryColor), $('.footer-klasse .footer-ikoner a').css('background-color', secondaryColor),
        $('.header-user-dropdown').css('background', backgroundColor), $('.footer-klasse').css('background-color', backgroundColor);

    $('.kontaktDiv').css('border', '2px solid ' + secondaryColor), $('input[type=submit]').css('background-color', secondaryColor), $('input[type=submit]:hover').css('background-color', secondaryColor);
    $('body')[0].style.setProperty('--mainColor', mainColor);
    $('body')[0].style.setProperty('--backgroundColor', backgroundColor);

    $('.knap').css('background-color', backgroundColor), $('.knap' + ':' + 'hover').css('background-color', secondaryColor), $('.knap' + ':' + 'active').css('background-color', secondaryColor);

});

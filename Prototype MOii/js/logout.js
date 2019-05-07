$(document).ready(function () {


    $("#logout").click(function () {

        localStorage.setItem("access", "false");

        $(location).attr("href", "login.html");


    });

    $("#logout2").click(function () {

        localStorage.setItem("access", "false");

        $(location).attr("href", "login.html");


    });
});

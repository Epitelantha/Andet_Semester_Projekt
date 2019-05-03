$(document).ready (function(){

    adgangDB = localStorage.getItem("access");
    if(adgangDB != "true")
    {
         $(location).attr("href", "login.html");
    }


});
$(document).ready (function(){


$("#create").click(function(){

      brugernavnDB = $("#brugernavn").val();
      adgangskodeDB = $("#adgangskode").val();

      console.log(brugernavnDB);
      console.log(adgangskodeDB);

      localStorage.setItem("brugernavn",brugernavnDB);
       localStorage.setItem("adgangskode",adgangskodeDB);

       $(location).attr("href","login.html");

 });
});
$(document).ready (function()
{


    $("#login").click(function()

       {
        // Dette for værdien som er skrevet i username til at komme op i console
          brugernavnInput = $("#brugernavn").val();
          adgangskodeInput = $("#adgangskode").val();


           console.log(brugernavnInput);


          if (localStorage.getItem("brugernavn") == brugernavnInput && localStorage.getItem("adgangskode") == adgangskodeInput)
          { 
              // localStorage er der hvor ting bliver gemt og kan bruges senere, såsom brugernavne og koder//

            localStorage.setItem("access", "true");
            // Denne linje sender sig over til index.html siden/ 
            $(location).attr("href", "account.html");
          }

          else{
               //Dette er beskeden der kommer op, når man prøver at logge in/ 
            $(".message").html("Forkert Brugernavn eller Adgangskode").css({"font-size": "100%"});

            $(".message").css({"color": "red"});
              

             // Dette får det login til at ryste
            $("#loginForm").effect("shake");

          }
       });



});
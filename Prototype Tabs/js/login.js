$(document).ready (function()
{


    $("#login").click(function()

       {
        
          userNameInput = $("#brugernavn").val();
          passwordInput = $("#adgangskode").val();
        
        localStorage.setItem("accountName", userNameInput);
        
        var userNameCheck = localStorage.getItem("myUserName");
        var passwordCheck = localStorage.getItem("myPassword");
        console.log(userNameCheck);
        console.log(passwordCheck);
        
        console.log(userNameInput);
        console.log(passwordInput);
        
        console.log(userNameCheck.indexOf(userNameInput));
        
        userNameCheck = JSON.parse(userNameCheck);
        passwordCheck = JSON.parse(passwordCheck);
        
          if (userNameCheck.includes(userNameInput) && passwordCheck.includes(passwordInput) && userNameInput != "" && passwordInput != "" && userNameCheck.indexOf(userNameInput) == passwordCheck.indexOf(passwordInput))
          { 
              
            localStorage.setItem("access", "true");
             
            $(location).attr("href", "account.html");
          }

          else{
               //Dette er beskeden der kommer op, når man prøver at logge in/ 
            $(".message").html("Forkert Brugernavn eller Adgangskode").css({"font-size": "100%"});

            $(".message").css({"color": "red"});
              

             // Dette får det login til at ryste
            //$("#loginForm").effect("shake");

          }
       });



});
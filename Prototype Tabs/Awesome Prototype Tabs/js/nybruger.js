$(document).ready (function(){


$("#create").click(function(){

      var userName = $('#brugernavn').val();

            var userNames = localStorage.getItem('myUserName');
            if (userNames != null) {
                userNames = JSON.parse(userNames);
            } else {
                userNames = new Array();
            }
    if(userNames.includes(userName))
        {
            alert("Brugernavn allerede i brug!");
            
        }
    else
    {
        userNames.push(userName);
            localStorage.setItem('myUserName', JSON.stringify(userNames));
            
            var userPassword = $('#adgangskode').val();

            var userPasswords = localStorage.getItem('myPassword');
            if (userPasswords != null) {
                userPasswords = JSON.parse(userPasswords);
            } else {
                userPasswords = new Array();
            }

            userPasswords.push(userPassword);
            localStorage.setItem('myPassword', JSON.stringify(userPasswords));
        console.log(userNames);
        console.log(userPasswords);

       $(location).attr("href","login.html");

    }

            
 });
});
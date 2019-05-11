$(document).ready (function(){
    
    var accountLoginName = localStorage.getItem("accountName");

    var nameInput = $('#accountName');
    nameInput.html('');
    nameInput.append("Velkommen, " + accountLoginName + "!");
    
});
var titlePartOne = 'Hu';
var titlePartTwo = 'Mac';

var adresse = 'Opfundetgade 21';
var teleNummer = '+45 35752946';
var mail = "eksempel@eksempel.dk";

$(document).ready(function () {

    $(".color1").click(function () {
        localStorage.setItem("mainColor", '#ff0000');
        localStorage.setItem("secondaryColor", '#ff5623');
        localStorage.setItem("backgroundColor", '#442c2f');
        location.reload();
    });

    $(".color2").click(function () {
        localStorage.setItem("mainColor", '#003bff');
        localStorage.setItem("secondaryColor", '#548ce5');
        localStorage.setItem("backgroundColor", '#0d3942');
        location.reload();
    });

    $(".color3").click(function () {
        localStorage.setItem("mainColor", '#00ff4a');
        localStorage.setItem("secondaryColor", '#36bc36');
        localStorage.setItem("backgroundColor", '#55775f');
        location.reload();
    });

    $(".color4").click(function () {
        localStorage.setItem("mainColor", '#ffa500');
        localStorage.setItem("secondaryColor", '#bab134');
        localStorage.setItem("backgroundColor", '#443416');
        location.reload();
    });

    $(".color5").click(function () {
        localStorage.setItem("mainColor", '#d19cd6');
        localStorage.setItem("secondaryColor", '#ac2eba');
        localStorage.setItem("backgroundColor", '#522956');
        location.reload();
    });

    $("#titleChange").click(function () {

        titlePartOne = $("#titleOne").val();
        titlePartTwo = $("#titleTwo").val();

        localStorage.setItem("titlePartOne", titlePartOne);
        localStorage.setItem("titlePartTwo", titlePartTwo);
        
        location.reload();
    });
    
    $("#infoChange").click(function () {

        adresse = $("#adresse").val();
        teleNummer = $("#teleNummer").val();
        mail = $("#email").val();

        localStorage.setItem("adress", adresse);
        localStorage.setItem("teleNummer", teleNummer);
        localStorage.setItem("mail", mail);
        
        location.reload();
    });

});

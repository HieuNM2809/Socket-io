$(document).ready(function () {
    var socket = io("http://localhost:3000");
    $('.home').hide();
    $('.login').show();

    $('#login_m').click((e)=>{
        $('.login').hide();
        $('.home').show();
    });
});
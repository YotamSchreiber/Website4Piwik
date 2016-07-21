/**
 * Ex3 - 302856026 - Yotam Schreiber.
 */

var lb = document.getElementById("loginButton");
var pb = document.getElementById("profileButton");
var cb = document.getElementById("calculatorButton");
var rb = document.getElementById("readmeButton");
var npb = document.getElementById("openNewButton");
var plus = document.getElementById("+");
var minus = document.getElementById("-");
var mult = document.getElementById("*");
var divide = document.getElementById("/");

var vs = document.getElementById("virtual screen");
var pf = document.getElementById("formProfile");
var cf = document.getElementById("formCalculator");
var rf = document.getElementById("formReadme");
var fw = document.getElementById("formWrong");

var numberOnly = function (e) {
    var a = [];
    var k = e.which;

    for (i = 48; i < 58; i++) {
        a.push(i);
    }

    a.push(45);

    if (!(a.indexOf(k)>=0))
        e.preventDefault();
};

// open new page
npb.addEventListener("click", function() {
    $.ajax({
        url: '/openNewPage',
        type: 'GET',
        dataType: 'json',
		success: function (data) {
            data.open();
        }
    });
});

// in order to check if the user is already loged-in
$(document).ready(function(){
    $.ajax({
        url: '/isLogin',
        type: 'GET',
        success: function (data) {
            if(data == 'true') {
                vs.style.display = "none";
                fw.style.display = "none";
                rb.style.display = "block";
                pb.style.display = "block";
                cb.style.display = "block";
            } else {
                vs.style.display = "block";
            }
        }
    });
});

// log-in form
lb.addEventListener("click", function() {
    var userInfo = {
        'username' : $('input[id=Name]').val(),
        'userPassword' : $('input[id=Password]').val()
    };

    $.ajax({
        url: '/login',
        type: 'POST',
        data: userInfo,
        dataType: 'json',
		success: function (data) {
            // if the login operation was success
			if(data.isSuccess == 'true') {
            
                vs.style.display = "none";
                fw.style.display = "none";
                rb.style.display = "block";
                pb.style.display = "block";
                cb.style.display = "block";
                
			} else {
                
                fw.style.display = "block";
                
            }
        }
    });
});








pb.addEventListener("click", function () {

    // getting a random qoute
    $.ajax({
        url: '/quotes/random',
        type: 'GET',
        success: function (data) {
            $('#formRandomQuote').text(data);
        }
    });
	
	//dataLayer.push({'profile': 'clicked'});
	//window.alert(dataLayer[1].profile);
    pf.style.display = "block";
    cf.style.display = "none";
    rf.style.display = "none";
});







cb.addEventListener("click", function () {

    // getting a the last calculated value
    $.ajax({
        url: '/calc/value/',
        type: 'GET',
        success: function (data) {
            console.log(data);
            var r = document.getElementById("resultNum");
            r.value = data;
        }
    });

    pf.style.display = "none";
    cf.style.display = "block";
    rf.style.display = "none";
});

rb.addEventListener("click", function () {
    pf.style.display = "none";
    cf.style.display = "none";
    rf.style.display = "block";
});

plus.addEventListener("click", function () {
    var x = document.getElementById("firstNum");
    var y = document.getElementById("secondNum");
    var r = document.getElementById("resultNum");
    r.value = Number(x.value) + Number(y.value);
    var val = r.value;

    // send the calculated value
    $.ajax({
        url: '/calc/value/' + val,
        type: 'POST',
        success: function (data) {

        }
    });
});

minus.addEventListener("click", function () {
    var x = document.getElementById("firstNum");
    var y = document.getElementById("secondNum");
    var r = document.getElementById("resultNum");
    r.value = Number(x.value) - Number(y.value);
    var val = r.value;

    // send the calculated value
    $.ajax({
        url: '/calc/value/' + val,
        type: 'POST',
        success: function (data) {

        }
    });
});

mult.addEventListener("click", function () {
    var x = document.getElementById("firstNum");
    var y = document.getElementById("secondNum");
    var r = document.getElementById("resultNum");
    r.value = Number(x.value) * Number(y.value);
    var val = r.value;

    // send the calculated value
    $.ajax({
        url: '/calc/value/' + val,
        type: 'POST',
        success: function (data) {

        }
    });
});

divide.addEventListener("click", function () {
    var x = document.getElementById("firstNum");
    var y = document.getElementById("secondNum");
    var r = document.getElementById("resultNum");
    if(y.value == 0) {
        r.value = "Error";
    } else {
        r.value = Number(x.value) / Number(y.value);
    }
    var val = r.value;

    // send the calculated value
    $.ajax({
        url: '/calc/value/' + val,
        type: 'POST',
        success: function (data) {

        }
    });
});

document.getElementById('firstNum').addEventListener('keypress', numberOnly, false);
document.getElementById('secondNum').addEventListener('keypress', numberOnly, false);
/**
*word search maker
*@author https://4programmers.net/User/Pm/Submit?to=gk1982
*@version 02.2020
*/
{

//String of Polish letters available in the word search puzzle
const ALPHABET = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ";

//Array of words to be found in the word search
var words = [];

//Default size of the initial board
var default_board_size = 9;

//Size of the currently selected board
var board_size = default_board_size;

//Boards elements
var board9x9 = document.querySelector("#board9x9");
var board15x15 = document.querySelector("#board15x15");

//Function performed when the document is loaded. 
//Displays the default empty board filled with letters. 
//Hides the display of program information.
$(document).ready(function () {
displayBoard(default_board_size);
$("#infoShow").show();
$("#infoHide").hide();
$("#info").hide();
});

$("#infoHide").click(function(){
  $("#info").hide();
  $("#infoHide").hide();
});

$("#infoShow").click(function(){
	$("#infoHide").show();
	$("#info").show();
});

//display boards about the size of 9x9 or 15x15, board_type: 9 or 15
function displayBoard(board_type) {

if(board_type==9) {
$("#board15x15").remove();
$(".board").append(board9x9);
}
else {
$("#board9x9").remove();
$(".board").append(board15x15);
}

var str = words +"";
str = str.replace(/\,/g,"\n");

$("#podane_wyrazy").text(str);
$("#podane_wyrazy").val(str);

var str2 = words+"";
str2 = str2.replace(/\,/g,",\n");
$("#slowa").text(str2); 
wypelnij_plansze_losowymi_literami(board_type);

if(board_type==9){
board_size=9;
$("#board15x15").hide();
$("#board9x9").show();
$("#board15x15").addClass('hide');
$("#board9x9").removeClass('hide');
}

if(board_type==15){
board_size=15;
$("#board9x9").hide();
$("#board15x15").show();
$("#board9x9").addClass('hide');
$("#board15x15").removeClass('hide');
}

}

$("#wyczysc15x15").click(function() {

words = [];

displayBoard(15);
});

$("#wyczysc9x9").click(function() {

words = [];

displayBoard(9);

});

$("#podane_wyrazy").bind("input propertychange keydown", function(e) {

    if((e.keyCode < 91) && (e.keyCode > 64) || e.keyCode == 13 || e.keyCode == 8 || (e.keyCode < 41) && (e.keyCode > 36)){
    
	var val = $.trim($("textarea").val().toUpperCase());
    if (val != "") {
	words = val.split("\n");
	
	var str2 = words+"";
str2 = str2.replace(/\,/g,",\n");
$("#slowa").text(str2); 

	}
    }
	else
	{
	e.preventDefault();
	}
		
});


function wypelnij_plansze_losowo_slowami() {
	
	wypelnij_plansze_losowymi_literami(board_size);
	
	var dostepne_linie = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	
	words.sort(function(a, b){return b.length - a.length});
	
	for(var m=0;m<words.length;m++) {
		
		var oneOrZero = (Math.random()>0.5)? 1 : 0;
		
		if(oneOrZero) {
		
		var losowy_index = m;
		var losowa_linia = dostepne_linie[losowy_index];
		
		var start_index = Math.floor(Math.random()*(16-words[m].length-m))+m;
		for(var i=0;i<words[m].length;i++) {
	
			var id_pola_planszy = "#"+"linia"+(start_index+i)+"litera"+(losowa_linia);
			$(id_pola_planszy).text(words[m].charAt(i));
			$(id_pola_planszy).css("background-color","orange");
		}
		}
		else {
		
		var losowy_index = m;
		var losowa_linia = dostepne_linie[losowy_index];
		
		var start_index = Math.floor(Math.random()*(16-words[m].length-m))+m;
		for(var i=0;i<words[m].length;i++) {
	
			var id_pola_planszy = "#"+"linia"+losowa_linia+"litera"+(i+start_index);
			$(id_pola_planszy).text(words[m].charAt(i));
			$(id_pola_planszy).css("background-color","orange");
	}
		}
	
	}
}

function wypelnij_plansze_losowymi_literami(n) {

for(var i=0;i<n;i++) {
	for(var j=0;j<n;j++) {
	var id_pola_planszy = "#"+"linia"+i+"litera"+j;
	var losowa_litera = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
	
	
	$(id_pola_planszy).text(losowa_litera);
	$(id_pola_planszy).css("background-color","white");
	
	}
}
}

$("#generuj_wykreslanke_poziomo").click(function() {
	wypelnij_plansze_poziomo_slowami();
});

$("#generuj_wykreslanke_pionowo").click(function() {
	wypelnij_plansze_pionowo_slowami();
});

$("#generuj_wykreslanke_losowo").click(function() {
	wypelnij_plansze_losowo_slowami();
});

//9x9
$("#imiona").click(function(){
console.log(this);
words = ['ADAM','BASIA','DAREK','EWA','IGOR','KASIA'];
displayBoard(9);
});

$("#pory").click(function() {
words = ['WIOSNA','LATO','JESIEŃ','ZIMA'];
displayBoard(9);
});

$("#drzewa9x9").click(function() {
words = ['BRZOZA','BUK','DĄB','KASZTAN','KLON','LIPA','OLCHA'];
displayBoard(9);
});

$("#rzeki").click(function() {
words = ['WISŁA','ODRA','WARTA','BUG','NAREW','SAN','NOTEĆ'];
displayBoard(9);	
});

$("#panstwa").click(function() {
words = ['CZAD','BELGIA','EGIPT','POLSKA','ROSJA','WŁOCHY'];
displayBoard(9);		
});

$("#alfabet_grecki9x9").click(function() {
words = ['ALFA','BETA','GAMMA','DELTA','EPSILON'];
displayBoard(9);
});

//15x15
$("#dni_tygodnia").click(function(){
words = ['PONIEDZIAŁEK','WTOREK','ŚRODA','CZWARTEK','PIĄTEK','SOBOTA','NIEDZIELA'];
displayBoard(15);
});

$("#miesiace").click(function() {
words = ['STYCZEŃ','LUTY','MARZEC','KWIECIEŃ','MAJ','CZERWIEC','LIPIEC','SIERPIEŃ','WRZESIEŃ','PAŹDZIERNIK','LISTOPAD','GRUDZIEŃ'];
displayBoard(15);
});

$("#drzewa15x15").click(function() {
words = ['BRZOZA','BUK','DĄB','GRAB','KASZTAN','KLON','LIPA','OLCHA'];
displayBoard(15);
});

$("#wojewodztwa").click(function() {
		words = ['MAZOWIECKIE','POMORSKIE','WIELKOPOLSKIE','MAŁOPOLSKIE','ŚLĄSKIE','LUBELSKIE','OPOLSKIE','PODLASKIE','ŁÓDZKIE'];
		displayBoard(15);
});

$("#angielskie").click(function() {
words = ['BAG','PEN','CRAYON','SHARPENER','HEAD','EYES','NOSE','EARS','ARMS','HANDS','LEGS'];
displayBoard(15);
});

$("#alfabet_grecki15x15").click(function() {
words = ['ALFA','BETA','GAMMA','DELTA','EPSILON'];
displayBoard(15);
});

function wypelnij_plansze_poziomo_slowami() {
	
	wypelnij_plansze_losowymi_literami(board_size);
	
	var dostepne_linie = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	dostepne_linie = dostepne_linie.splice(0,board_size);
	console.log(dostepne_linie.length);
	
	for(var m=0;m<words.length;m++) {
		
		var losowy_index = Math.floor(Math.random()*dostepne_linie.length);
		var losowa_linia = dostepne_linie[losowy_index];
		dostepne_linie.splice(losowy_index,1);
		
		var start_index = Math.floor(Math.random()*(board_size+1-words[m].length));
		for(var i=0;i<words[m].length;i++) {
	
			var id_pola_planszy = "#"+"linia"+losowa_linia+"litera"+(i+start_index);
			$(id_pola_planszy).text(words[m].charAt(i));
			$(id_pola_planszy).css("background-color","orange");
	}
	}
}

function wypelnij_plansze_pionowo_slowami() {
	
	wypelnij_plansze_losowymi_literami(board_size);
	
	var dostepne_linie = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	dostepne_linie = dostepne_linie.splice(0,board_size);
	
	for(var m=0;m<words.length;m++) {
		
		var losowy_index = Math.floor(Math.random()*dostepne_linie.length);
		var losowa_linia = dostepne_linie[losowy_index];
		dostepne_linie.splice(losowy_index,1);
		
		var start_index = Math.floor(Math.random()*(board_size+1-words[m].length));
		for(var i=0;i<words[m].length;i++) {
	
			var id_pola_planszy = "#"+"linia"+(start_index+i)+"litera"+(losowa_linia);
			$(id_pola_planszy).text(words[m].charAt(i));
			$(id_pola_planszy).css("background-color","orange");
	}
	}
}

function wypelnij_plansze_losowo_slowami() {
	
	wypelnij_plansze_losowymi_literami(board_size);
	
	var dostepne_linie = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	dostepne_linie = dostepne_linie.splice(0,board_size);
	
	words.sort(function(a, b){return b.length - a.length});
	
	for(var m=0;m<words.length;m++) {
		
		var oneOrZero = (Math.random()>0.5)? 1 : 0;
		
		if(oneOrZero) {
		
		var losowy_index = m;
		var losowa_linia = dostepne_linie[losowy_index];
		
		var start_index = Math.floor(Math.random()*(board_size+1-words[m].length-m))+m;
		for(var i=0;i<words[m].length;i++) {
	
			var id_pola_planszy = "#"+"linia"+(start_index+i)+"litera"+(losowa_linia);
			$(id_pola_planszy).text(words[m].charAt(i));
			$(id_pola_planszy).css("background-color","orange");
		}
		}
		else {
		
		var losowy_index = m;
		var losowa_linia = dostepne_linie[losowy_index];
		
		var start_index = Math.floor(Math.random()*(board_size+1-words[m].length-m))+m;
		for(var i=0;i<words[m].length;i++) {
	
			var id_pola_planszy = "#"+"linia"+losowa_linia+"litera"+(i+start_index);
			$(id_pola_planszy).text(words[m].charAt(i));
			$(id_pola_planszy).css("background-color","orange");
		}
		}
	
	}
}

}
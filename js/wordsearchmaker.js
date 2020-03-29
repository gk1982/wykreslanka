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
var default_board_size = 0;

//Size of the currently selected board
var board_size = default_board_size;

//Boards elements
var board9x9 = document.querySelector("#board9x9");
var board15x15 = document.querySelector("#board15x15");
var boardCircle = document.querySelector("#boardCircle");

//Function performed when the document is loaded.
//Displays the default empty board filled with letters.
//Hides the display of program information.
$(document).ready(function () {
	
displayBoard(default_board_size);
$("#infoShow").show();
$("#infoHide").hide();
$("#info").hide();
$("select").val("");
});

//hide the info
$("#infoHide").click(function(){
$("#info").hide();
$("#infoHide").hide();
});

//show the info
$("#infoShow").click(function(){
$("#infoHide").show();
$("#info").show();
});

//display boards about the size of 9x9 or 15x15, board_type: 9 or 15
function displayBoard(board_type) {

if(board_type==9) {
$("#board15x15").remove();
$("#boardCircle").remove();
$(".board").append(board9x9);
}
else if(board_type==15) {
$("#board9x9").remove();
$("#boardCircle").remove();
$(".board").append(board15x15);
}
else if(board_type==0){
$("#board9x9").remove();
$("#board15x15").remove();
$(".board").append(boardCircle);
}

//change array with words to string and replace newline instead of a comma
var str = words+"";
str = str.replace(/\,/g,"\n");

$("#given_words").text(str);
$("#given_words").val(str);

//change array with words to string and replace comma+newline instead of a comma
var str2 = words+"";
str2 = str2.replace(/\,/g,",\n");
$("#slowa").text(str2);

fillBoardWithRandomLetters(board_type);

if(board_type==9){
board_size=9;
$("#board15x15").hide();
$("#boardCircle").hide();
$("#board9x9").show();
$("#board15x15").addClass('hide');
$("#boardCircle").addClass('hide');
$("#board9x9").removeClass('hide');
}

if(board_type==15){
board_size=15;
$("#board9x9").hide();
$("#boardCircle").hide();
$("#board15x15").show();
$("#board9x9").addClass('hide');
$("#boardCircle").addClass('hide');
$("#board15x15").removeClass('hide');
}

if(board_type==0){
$("#board9x9").hide();
$("#board15x15").hide();
$("boardCircle").show();
$("#board9x9").addClass('hide');
$("#board15x15").addClass('hide');
$("#boardCircle").removeClass('hide');
}
}

$("#kolo").click(function() {

$("select").val("");
words=[];
board_size=0;
displayBoard(0);

});

$("#wyczysc15x15").click(function() {
$("select").val("");	
words = [];
board_size=15;
displayBoard(15);
});

$("#wyczysc9x9").click(function() {
$("select").val("");	
words = [];
board_size=9;
displayBoard(9);
});

$("#given_words").on("input propertychange keydown", function(e) {
    if((e.keyCode < 91) && (e.keyCode > 64) || e.keyCode == 13 || e.keyCode == 8 || (e.keyCode < 41) && (e.keyCode > 36)){

	var val = $.trim($("textarea").val().toUpperCase());
    if (val != ""){
	words = val.split("\n");
	var str = words+"";
	str = str.replace(/\,/g,",\n");
	$("#slowa").text(str);
	}
    }
	else{
	e.preventDefault();
	}
});

function wypelnij_plansze_losowo_slowami() {

	fillBoardWithRandomLetters(board_size);

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

function fillBoardWithRandomLetters(n) {

if(n==0){
	//circle0
	for(var i=0;i<24;i++) {
		var id_pola_planszy = "#"+"circle"+0+"char"+i;
		var losowa_litera = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
		$(id_pola_planszy).text(losowa_litera);
		$(id_pola_planszy).css("color","black");
	}
	//circle1
	for(var i=0;i<18;i++) {
		var id_pola_planszy = "#"+"circle"+1+"char"+i;
		var losowa_litera = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
		$(id_pola_planszy).text(losowa_litera);
		$(id_pola_planszy).css("color","black");
	}
	//circle2
	for(var i=0;i<12;i++) {
		var id_pola_planszy = "#"+"circle"+2+"char"+i;
		var losowa_litera = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
		$(id_pola_planszy).text(losowa_litera);
		$(id_pola_planszy).css("color","black");
	}
	//circle3
	for(var i=0;i<8;i++) {
		var id_pola_planszy = "#"+"circle"+3+"char"+i;
		var losowa_litera = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
		$(id_pola_planszy).text(losowa_litera);
		$(id_pola_planszy).css("color","black");
	}
}

else {

for(var i=0;i<n;i++) {
	for(var j=0;j<n;j++) {
	var id_pola_planszy = "#"+"linia"+i+"litera"+j;
	var losowa_litera = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));


	$(id_pola_planszy).text(losowa_litera);
	$(id_pola_planszy).css("background-color","white");

	}
}
}
}

function fillBoardWithWords(){
	
	var rand = Math.floor(Math.random() * 3) + 1;
		
		if(rand==3) wypelnij_plansze_poziomo_slowami();
			else if(rand ==2) wypelnij_plansze_pionowo_slowami();
				else wypelnij_plansze_losowo_slowami();
}
/*
$("#generuj_wykreslanke_poziomo").click(function() {
	wypelnij_plansze_poziomo_slowami();
});

$("#generuj_wykreslanke_pionowo").click(function() {
	wypelnij_plansze_pionowo_slowami();
});

$("#generuj_wykreslanke_losowo").click(function() {
	wypelnij_plansze_losowo_slowami();
});
*/

//circle select option click handler
//firefox
$('#readyWordsCircle option').on('click', function(){
	var value = this.value;
	if(value=="box") {
		board_size=0;
		displayBoard(0);
		wypelnij_plansze_kolo_slowami();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA'];
		board_size=0;
		displayBoard(0);
		wypelnij_plansze_kolo_slowami();
	}
	else if(value=="seasons") {
		words = ['WIOSNA','LATO','JESIEŃ','ZIMA'];
		board_size=0;
		displayBoard(0);
		wypelnij_plansze_kolo_slowami();
	}
});

//chrome
$('#readyWordsCircle').on('click', function(ev){
	if((ev.offsetY < 0) && (navigator.userAgent.search("Chrome") >= 0)){
	var value = this.value;
	if(value=="box") {
		board_size=0;
		displayBoard(0);
		wypelnij_plansze_kolo_slowami();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA'];
		board_size=0;
		displayBoard(0);
		wypelnij_plansze_kolo_slowami();
	}
	else if(value=="seasons") {
		words = ['WIOSNA','LATO','JESIEŃ','ZIMA'];
		board_size=0;
		displayBoard(0);
		wypelnij_plansze_kolo_slowami();
	}
	}
});

//9x9 board select option click handler
//firefox

$('#readyWords9x9 option').on('click', function(){

	var value = this.value;
	
	if(value=="box") {
		board_size=9;
		displayBoard(board_size);
		fillBoardWithWords();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA','IGOR','KASIA'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="seasons") {
		words = ['WIOSNA','LATO','JESIEŃ','ZIMA'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="trees") {
		words = ['BRZOZA','BUK','DĄB','KASZTAN','KLON','LIPA','OLCHA'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="river") {
		words = ['WISŁA','ODRA','WARTA','BUG','NAREW','SAN','NOTEĆ'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="countries") {
		words = ['CZAD','BELGIA','EGIPT','POLSKA','ROSJA','WŁOCHY'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="greekAlphabet") {
		words = ['ALFA','BETA','GAMMA','DELTA','EPSILON'];
		displayBoard(9);
		fillBoardWithWords();
	}  
});

//chrome
$('#readyWords9x9').on('click', function(ev){
	if((ev.offsetY < 0) && (navigator.userAgent.search("Chrome") >= 0)){
	var value = this.value;
	if(value=="box") {
		board_size=9;
		displayBoard(board_size);
		fillBoardWithWords();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA','IGOR','KASIA'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="seasons") {
		words = ['WIOSNA','LATO','JESIEŃ','ZIMA'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="trees") {
		words = ['BRZOZA','BUK','DĄB','KASZTAN','KLON','LIPA','OLCHA'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="river") {
		words = ['WISŁA','ODRA','WARTA','BUG','NAREW','SAN','NOTEĆ'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="countries") {
		words = ['CZAD','BELGIA','EGIPT','POLSKA','ROSJA','WŁOCHY'];
		displayBoard(9);
		fillBoardWithWords();
	}
	else if(value=="greekAlphabet") {
		words = ['ALFA','BETA','GAMMA','DELTA','EPSILON'];
		displayBoard(9);
		fillBoardWithWords();
	}  
    }
});

//15x15 board select option click handler
//firefox

$("#readyWords15x15 option").on('click', function(){
	var value = this.value;
	
	if(value=="box") {
		board_size=15;
		displayBoard(board_size);
		fillBoardWithWords();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA','IGOR','KASIA','PAWEŁ'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="months") {
		words = ['STYCZEŃ','LUTY','MARZEC','KWIECIEŃ','MAJ','CZERWIEC','LIPIEC','SIERPIEŃ','WRZESIEŃ','PAŹDZIERNIK','LISTOPAD','GRUDZIEŃ'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="daysOfWeek") {
		words = ['PONIEDZIAŁEK','WTOREK','ŚRODA','CZWARTEK','PIĄTEK','SOBOTA','NIEDZIELA'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="trees") {
		words = ['BRZOZA','BUK','DĄB','GRAB','KASZTAN','KLON','LIPA','OLCHA'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="provinces") {
		words = ['MAZOWIECKIE','POMORSKIE','WIELKOPOLSKIE','MAŁOPOLSKIE','ŚLĄSKIE','LUBELSKIE','OPOLSKIE','PODLASKIE','ŁÓDZKIE'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="english") {
		words = ['BAG','PEN','CRAYON','SHARPENER','HEAD','EYES','NOSE','EARS','ARMS','HANDS','LEGS'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="greekAlphabet") {
		words = ['ALFA','BETA','GAMMA','DELTA','EPSILON'];
		displayBoard(15);
		fillBoardWithWords();
	}
});

//chrome
$("#readyWords15x15").on('click', function(ev){
	
	if((ev.offsetY < 0) && (navigator.userAgent.search("Chrome") >= 0)){
		var value = this.value;
	if(value=="box") {
		board_size=15;
		displayBoard(board_size);
		fillBoardWithWords();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA','IGOR','KASIA','PAWEŁ'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="months") {
		words = ['STYCZEŃ','LUTY','MARZEC','KWIECIEŃ','MAJ','CZERWIEC','LIPIEC','SIERPIEŃ','WRZESIEŃ','PAŹDZIERNIK','LISTOPAD','GRUDZIEŃ'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="daysOfWeek") {
		words = ['PONIEDZIAŁEK','WTOREK','ŚRODA','CZWARTEK','PIĄTEK','SOBOTA','NIEDZIELA'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="trees") {
		words = ['BRZOZA','BUK','DĄB','GRAB','KASZTAN','KLON','LIPA','OLCHA'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="provinces") {
		words = ['MAZOWIECKIE','POMORSKIE','WIELKOPOLSKIE','MAŁOPOLSKIE','ŚLĄSKIE','LUBELSKIE','OPOLSKIE','PODLASKIE','ŁÓDZKIE'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="english") {
		words = ['BAG','PEN','CRAYON','SHARPENER','HEAD','EYES','NOSE','EARS','ARMS','HANDS','LEGS'];
		displayBoard(15);
		fillBoardWithWords();
	}
	else if(value=="greekAlphabet") {
		words = ['ALFA','BETA','GAMMA','DELTA','EPSILON'];
		displayBoard(15);
		fillBoardWithWords();
	}
	}
});


function wypelnij_plansze_poziomo_slowami() {

	fillBoardWithRandomLetters(board_size);

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

	fillBoardWithRandomLetters(board_size);

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

function wypelnij_plansze_kolo_slowami() {
	fillBoardWithRandomLetters(0);
	var start_index = 0;
	//circle3
	start_index = Math.floor(Math.random()*8);
	for(var i=0;i<words[0].length;i++) {
		var j = i+start_index;
		if(j>=8) j=j-8;
		var id_pola_planszy = "#"+"circle3"+"char"+(j);
		$(id_pola_planszy).text(words[0].charAt(i));
		$(id_pola_planszy).css("color","darkorange");
	}
	//circle2
	start_index = Math.floor(Math.random()*12);
	for(var i=0;i<words[1].length;i++) {
		var j = i+start_index;
		if(j>=12) j=j-12;
		var id_pola_planszy = "#"+"circle2"+"char"+(j);
		$(id_pola_planszy).text(words[1].charAt(i));
		$(id_pola_planszy).css("color","darkorange");
	}
	//circle1
	start_index = Math.floor(Math.random()*18);
	for(var i=0;i<words[2].length;i++) {
		var j = i+start_index;
		if(j>=18) j=j-18;
		var id_pola_planszy = "#"+"circle1"+"char"+(j);
		$(id_pola_planszy).text(words[2].charAt(i));
		$(id_pola_planszy).css("color","darkorange");
	}
	//circle0
	start_index = Math.floor(Math.random()*24);
	for(var i=0;i<words[3].length;i++) {
		var j = i+start_index;
		if(j>=24) j=j-24;
		var id_pola_planszy = "#"+"circle0"+"char"+(j);
		$(id_pola_planszy).text(words[3].charAt(i));
		$(id_pola_planszy).css("color","darkorange");
	}
}

function wypelnij_plansze_losowo_slowami() {

	fillBoardWithRandomLetters(board_size);

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

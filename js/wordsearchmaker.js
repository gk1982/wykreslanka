/**
*word search maker
*@author https://4programmers.net/User/Pm/Submit?to=gk1982
*@version 04.2020
*/
{

//String of Polish letters available in the word search puzzle
const ALPHABET = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ";
//Array of words to be found in the word search
var words = [];

//Default size of the initial board
var defaultBoardSize = 0;

//The default value of select option
var defaultValueSelect = "";

//Size of the currently selected board
var boardSize = defaultBoardSize;

//color of markings
var mark_color = "tomato";

//Boards elements
var board9x9 = document.querySelector("#board9x9");
var board15x15 = document.querySelector("#board15x15");
var boardCircle = document.querySelector("#boardCircle");

//Function performed when the document is loaded.
//Displays the default empty board filled with letters.
//Hides the display of program information.
$(document).ready(function () {

displayBoard(defaultBoardSize);
$("#infoShow").show();
$("#infoHide").hide();
$(".infoWindow").hide();
$("select").val(defaultValueSelect);
});

//hide the info
$("#infoHide").click(function(){
$(".infoWindow").hide();
$("#infoHide").hide();
});

//show the info
$("#infoShow").click(function(){
$("#infoHide").show();
$(".infoWindow").show();
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
$("#searchWords").text(str2);

fillBoardWithRandomLetters(board_type);

if(board_type==9){
boardSize=9;
$("#board15x15").hide();
$("#boardCircle").hide();
$("#board9x9").show();
$("#board15x15").addClass('hide');
$("#boardCircle").addClass('hide');
$("#board9x9").removeClass('hide');
}

if(board_type==15){
boardSize=15;
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
$("#boardCircle").show();
$("#board9x9").addClass('hide');
$("#board15x15").addClass('hide');
$("#boardCircle").removeClass('hide');
}
}

//clear the board of the circle
$("#circle").click(function() {
$("select").val(defaultValueSelect);
words=[];
boardSize=0;
displayBoard(0);
});

//clear the board 15x15
$("#boardBtn15x15").click(function() {
$("select").val(defaultValueSelect);
words = [];
boardSize=15;
displayBoard(15);
});

//clear the board 9x9
$("#boardBtn9x9").click(function() {
$("select").val(defaultValueSelect);
words = [];
boardSize=9;
displayBoard(9);
});

$("#generateButton").click(function() {
if(boardSize==0) {
  displayBoard(boardSize);
  fillCircleWithWords();
}
else {
  displayBoard(boardSize);
  fillBoardWithWords();
}
});

/*
*	Event handler retrieves words from the text field and formats them by removing unnecessary lines and spaces and raising to uppercase.
*/
$("#given_words").on("keydown keyup", function(e) {
  if((e.keyCode < 91) && (e.keyCode > 64) || e.keyCode == 13 || e.keyCode == 8 || (e.keyCode < 41) && (e.keyCode > 36)){
  var val = $.trim($("#given_words").val());
    if (val != "") {
    val = val.replace(/^\s*[\r\n]/gm, '');
    val = val.toUpperCase();
    words = val.split("\n");
    }
  }
  else {
  e.preventDefault();
  }
});

//Fills the boards with random letters
function fillBoardWithRandomLetters(n) {

if(n==0){
//circle0
for(var i=0;i<24;i++) {
  var fieldId = "#"+"circle"+0+"char"+i;
  var letter = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
  $(fieldId).text(letter);
  $(fieldId).css("color","black");
}
//circle1
for(var i=0;i<18;i++) {
  var fieldId = "#"+"circle"+1+"char"+i;
  var letter = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
  $(fieldId).text(letter);
  $(fieldId).css("color","black");
}
//circle2
for(var i=0;i<12;i++) {
  var fieldId = "#"+"circle"+2+"char"+i;
  var letter = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
  $(fieldId).text(letter);
  $(fieldId).css("color","black");
}
//circle3
for(var i=0;i<8;i++) {
  var fieldId = "#"+"circle"+3+"char"+i;
  var letter = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
  $(fieldId).text(letter);
  $(fieldId).css("color","black");
}

} else {

for(var i=0;i<n;i++) {
  for(var j=0;j<n;j++) {
  var fieldId = "#"+"line"+i+"char"+j;
  var letter = ALPHABET.charAt(Math.floor(Math.random()*ALPHABET.length));
  $(fieldId).text(letter);
  $(fieldId).css("background-color","white");
  }
}
}
}

//Fill the board with given words in a random way
function fillBoardRandomly() {

  fillBoardWithRandomLetters(boardSize);

  var dostepne_linie = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  dostepne_linie = dostepne_linie.splice(0,boardSize);

  words.sort(function(a, b){return b.length - a.length});

  for(var m=0;m<words.length;m++) {

    var oneOrZero = (Math.random()>0.5)? 1 : 0;

    if(oneOrZero) {

    var losowy_index = m;
    var losowa_linia = dostepne_linie[losowy_index];

    var start_index = Math.floor(Math.random()*(boardSize+1-words[m].length-m))+m;
    for(var i=0;i<words[m].length;i++) {

      var fieldId = "#"+"line"+(start_index+i)+"char"+(losowa_linia);
      $(fieldId).text(words[m].charAt(i));
      $(fieldId).css("background-color",mark_color);
    }
    }
    else {

    var losowy_index = m;
    var losowa_linia = dostepne_linie[losowy_index];

    var start_index = Math.floor(Math.random()*(boardSize+1-words[m].length-m))+m;
    for(var i=0;i<words[m].length;i++) {

      var fieldId = "#"+"line"+losowa_linia+"char"+(i+start_index);
      $(fieldId).text(words[m].charAt(i));
      $(fieldId).css("background-color",mark_color);
    }
    }
  }
}



function fillBoardWithWords(){
  var rand = Math.floor(Math.random() * 3) + 1;
    if(rand==3) wypelnij_plansze_poziomo_slowami();
      else if(rand ==2) wypelnij_plansze_pionowo_slowami();
        else fillBoardRandomly();
}

//circle select option click handler
//firefox
$('#readyWordsCircle option').on('click', function(){
	var value = this.value;
	
	
	if(value==defaultValueSelect) {
		if(boardSize!=0) words=[];
		boardSize=0;
		displayBoard(0);
		fillCircleWithWords();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA'];
		boardSize=0;
		displayBoard(0);
		fillCircleWithWords();
	}
	else if(value=="seasons") {
		words = ['WIOSNA','JESIEŃ','LATO','ZIMA'];
		boardSize=0;
		displayBoard(0);
		fillCircleWithWords();
	}
	$("select").val(defaultValueSelect);
});

//chrome
$('#readyWordsCircle').on('click', function(ev){
	if((ev.offsetY < 0) && (navigator.userAgent.search("Chrome") >= 0)){
	var value = this.value;
	
	
	if(value==defaultValueSelect) {
		if(boardSize!=0) words=[];
		boardSize=0;
		displayBoard(0);
		fillCircleWithWords();
	}
	else if(value=="names") {
		words = ['ADAM','BASIA','DAREK','EWA'];
		boardSize=0;
		displayBoard(0);
		fillCircleWithWords();
	}
	else if(value=="seasons") {
		words = ['WIOSNA','LATO','JESIEŃ','ZIMA'];
		boardSize=0;
		displayBoard(0);
		fillCircleWithWords();
	}
	$("select").val(defaultValueSelect);	
	}
});

//9x9 board select option click handler
//firefox

$('#readyWords9x9 option').on('click', function(){

	var value = this.value;
	
	if(value==defaultValueSelect) {
		if(boardSize!=9) words=[];
		boardSize=9;
		displayBoard(boardSize);
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
	$("select").val(defaultValueSelect);
});

//chrome
$('#readyWords9x9').on('click', function(ev){
	if((ev.offsetY < 0) && (navigator.userAgent.search("Chrome") >= 0)){
	var value = this.value;
	
	
	if(value==defaultValueSelect) {
		if(boardSize!=9) words=[];
		boardSize=9;
		displayBoard(boardSize);
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
	$("select").val(defaultValueSelect);
    }
});

//15x15 board select option click handler
//firefox

$("#readyWords15x15 option").on('click', function(){
	
	var value = this.value;
	
	
	
	if(value==defaultValueSelect) {
		if(boardSize!=15) words=[];
		boardSize=15;
		displayBoard(boardSize);
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
	$("select").val(defaultValueSelect);
});

//chrome
$("#readyWords15x15").on('click', function(ev){
	
	if((ev.offsetY < 0) && (navigator.userAgent.search("Chrome") >= 0)){
		var value = this.value;
		
		
	if(value==defaultValueSelect) {
		if(boardSize!=15) words=[];
		boardSize=15;
		displayBoard(boardSize);
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
	$("select").val(defaultValueSelect);
	}
});


function wypelnij_plansze_poziomo_slowami() {

	fillBoardWithRandomLetters(boardSize);

	var dostepne_linie = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	dostepne_linie = dostepne_linie.splice(0,boardSize);
	console.log(dostepne_linie.length);

	for(var m=0;m<words.length;m++) {

		var losowy_index = Math.floor(Math.random()*dostepne_linie.length);
		var losowa_linia = dostepne_linie[losowy_index];
		dostepne_linie.splice(losowy_index,1);

		var start_index = Math.floor(Math.random()*(boardSize+1-words[m].length));
		for(var i=0;i<words[m].length;i++) {

			var fieldId = "#"+"line"+losowa_linia+"char"+(i+start_index);
			$(fieldId).text(words[m].charAt(i));
			$(fieldId).css("background-color",mark_color);
	}
	}
}

function wypelnij_plansze_pionowo_slowami() {

	fillBoardWithRandomLetters(boardSize);

	var dostepne_linie = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	dostepne_linie = dostepne_linie.splice(0,boardSize);

	for(var m=0;m<words.length;m++) {

		var losowy_index = Math.floor(Math.random()*dostepne_linie.length);
		var losowa_linia = dostepne_linie[losowy_index];
		dostepne_linie.splice(losowy_index,1);

		var start_index = Math.floor(Math.random()*(boardSize+1-words[m].length));
		for(var i=0;i<words[m].length;i++) {

			var fieldId = "#"+"line"+(start_index+i)+"char"+(losowa_linia);
			$(fieldId).text(words[m].charAt(i));
			$(fieldId).css("background-color",mark_color);
	}
	}
}

function fillCircleWithWords() {
	fillBoardWithRandomLetters(0);
	var start_index = 0;
	//circle3
	start_index = Math.floor(Math.random()*8);
	for(var i=0;i<words[0].length;i++) {
		var j = i+start_index;
		if(j>=8) j=j-8;
		var fieldId = "#"+"circle3"+"char"+(j);
		$(fieldId).text(words[0].charAt(i));
		$(fieldId).css("color",mark_color);
	}
	//circle2
	start_index = Math.floor(Math.random()*12);
	for(var i=0;i<words[1].length;i++) {
		var j = i+start_index;
		if(j>=12) j=j-12;
		var fieldId = "#"+"circle2"+"char"+(j);
		$(fieldId).text(words[1].charAt(i));
		$(fieldId).css("color",mark_color);
	}
	//circle1
	start_index = Math.floor(Math.random()*18);
	for(var i=0;i<words[2].length;i++) {
		var j = i+start_index;
		if(j>=18) j=j-18;
		var fieldId = "#"+"circle1"+"char"+(j);
		$(fieldId).text(words[2].charAt(i));
		$(fieldId).css("color",mark_color);
	}
	//circle0
	start_index = Math.floor(Math.random()*24);
	for(var i=0;i<words[3].length;i++) {
		var j = i+start_index;
		if(j>=24) j=j-24;
		var fieldId = "#"+"circle0"+"char"+(j);
		$(fieldId).text(words[3].charAt(i));
		$(fieldId).css("color",mark_color);
	}
}



}

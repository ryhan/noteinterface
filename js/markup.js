function load(){
	/*setEmpty();*/
	process();
}
var summaryText = "";

function process(){
	checkEmpty();
	applyClass();
	updateToolbar();
	var t = setTimeout("process()", 500);
}
var scrollpast = false;
function updateToolbar(){
	if (window.scrollY > 30){
		scrollpast = true;
		document.getElementById('toolbar').setAttribute('class','toolbar fullwidth');	
	} else if (scrollpast == true){
		document.getElementById('toolbar').setAttribute('class','toolbar fastopen');	
	} else{
		document.getElementById('toolbar').setAttribute('class','toolbar');
	}
}

function setEmpty(){
	var startText ="<div>Confused?</div>"
	document.getElementById('scratchpad').innerHTML = startText;
	clearLatex();
	renderedLatex();
	clearSummary();
	renderSummary();
}

function checkEmpty(){
	var content = document.getElementById('scratchpad').innerHTML
	if (content == ""){  setEmpty(); }
}

var renderedLatex = "";

function applyClass(){
	var lines = document.getElementById('scratchpad').getElementsByTagName('div');

	function getText(e){ 
		var line = ((e.innerText)||(e.innerHTML)).slice(1);
		return line;
	}

	clearLatex();
	clearSummary();
	var showSum = false;
	for (var i = 0; i < lines.length; i++){
		var line = lines[i];
		removeFormatting(line);
		var text = ((line.innerText)||(line.innerHTML));
		switch (text.substr(0, 2))
		{
			case '# ':
				line.setAttribute('class','h1');
				addSummary("<strong>" + text.slice(2) + "</strong>");
				showSum = true;
				break;
			case '//':
				line.setAttribute('class','desc');
				addSummary("<em>" + text.slice(2) + "</em>");
				showSum = true;
				break;
			case '$ ':
				line.setAttribute('class','latex');
				addLatexLine(getText(line),(line.offsetTop +5));
				break;
			default:
				line.setAttribute('class','');
		}
	}
	renderLatex();
	renderSummary();
	if (showSum == true){ showSummary();}
	else{ hideSummary();}
}

function removeFormatting(p){
	var children = p.getElementsByTagName('*');
	for (var j = 0; j<children.length; j++){
		children[j].setAttribute('style','');
	}
}

/* Start Latex */
function clearLatex(){ renderedLatex = ""; }
function renderLatex(){
	document.getElementById('latexLayer').innerHTML = renderedLatex;
}
function addLatexLine(str, lineOffset){
	renderString = "<img src='http://latex.codecogs.com/gif.latex?"+str + "' style='position:absolute; top:" + lineOffset + "px;'/>";
	if (/^\s+$/g.test(str)==false && str!=''){
		renderedLatex+= renderString;
	}
}
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}
/* End Latex */


/* Start Summary */
function showSummary(){
	document.getElementById('summary-toggle').setAttribute('class','show-summary');
}
function hideSummary(){
	document.getElementById('summary-toggle').setAttribute('class','hide-summary');
}
function addSummary(text){
	summaryText += text + "<br/>";
}
function clearSummary(){
	summaryText = "";
}
function renderSummary(){
	document.getElementById('summary').innerHTML= summaryText;
}
function toggleObscureSummary(){
	var e = document.getElementById('summary');
	if (e.getAttribute('class')=="summary obscured"){
		e.setAttribute('class','summary unobscured');
	}else{
		e.setAttribute('class','summary obscured');
	}
}

/* End Summary */

/* Start PDF

function generatePDF() {
	var doc = new jsPDF();
	doc.setFont('helvetiva');
	var pdfoffset = 30;
	doc.setFontSize(12);

	function writePDF(text, fontSize){
		doc.text(20,pdfoffset, text);
		pdfoffset += 8;
	}
	var lines = document.getElementById('scratchpad').getElementsByTagName('div');
	for (var i = 0; i < lines.length; i++){
		var line = lines[i];
		var text = ((line.innerText)||(line.innerHTML));
		switch (text.substr(0, 2))
		{	case '# ':
				doc.setFontType('bold');
				writePDF(text.slice(2));
				doc.setFontType('normal');
				break;
			default:
				writePDF(text);
				break;
		}
	}
		
	
	
	// Output as Data URI
	doc.output('datauri');
}
*/
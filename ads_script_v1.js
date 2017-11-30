/* Configurations Start */
var assignType = 1; /* type of assignment : [0]: self; [1]: consecutive; [2]: random; [3]: nonOnboarding */
var findValue = "ADS"; /* group value to find */
var designers = ["Developer1", "Developer2", "Developer3"]; /* array of designers */
var designer = "Developer1"; /* name of the designer */
var countLoop = 3; /* number of case you want to assign */
var row = 4; /* subtract 1 to satisfy for loop */
var autoAssign = false; /* set true || false */
var prior = true;
/* Configurations End */

function autoSave(autoAssign) {
	if(autoAssign) {
		setInterval(function(){  
			var y = 0;
			if ( y === 0 ) {
				$('#bottomButtonRow input')[0].click();
				y = 1;
		}}, 10000);
	}
}

function priority(row, i, prior) {
	$('#fchArea > table > tbody > tr:nth-child('+ (row + i) +') > td:nth-child(3) > a').attr('target','_blank');
	if(prior) {
		var href = $('#fchArea > table > tbody > tr:nth-child('+ (row + i) +') > td:nth-child(3) > a:contains("ENFRA")').attr('href'); /* ENFRA CASE */
	} else {
		var href = $('#fchArea > table > tbody > tr:nth-child('+ (row + i) +') > td:nth-child(3) > a').attr('href'); /* REG CASE */
	}

}

function selfAssign(designer, row, countLoop) {

		for(var i = 1; i <= countLoop; i++) {

			priority(row, i, prior);

	        console.log('HREF : ' + href);
			if(href !== undefined) {
				var newWindow = window.open(href + '/a?newOwn='+ designer, '_blank');
				autoSave(autoAssign);
			} /* endif */
			
		} /* endfor */
}

function consecutiveAssign(recordcount, row, designers) {
	console.log("Available Designers : " + designers + " Process Log : ");
    
	for(var i = 0; i <= recordcount; i++) {
		var newWindow;

		priority(row, i, prior);
        
		if(href !== undefined) {
			if(designers.length > i) {
				console.log('HREF : ' + href + '/a?newOwn='+ designers[i] + (i));
				newWindow = window.open(href + '/a?newOwn='+ designers[i], '_blank');
				autoSave(autoAssign);

			} else {
				console.log('HREF : ' + href + '/a?newOwn='+ designers[(i - (designers.length))] + (i - (designers.length)));
				
				newWindow = window.open(href + '/a?newOwn='+ designers[(i - (designers.length))], '_blank');
				autoSave(autoAssign);
			}
		} /* endif */
		
	} /* endfor */

} /* function end */

function randomAssign(recordcount, row, designers) {
	console.log(designers);
    
	for(var i = 0; i <= recordcount; i++) {

		priority(row, i, prior);

        console.log('HREF : ' + href);
		if(href !== undefined) {
			var r = Math.floor((Math.random() * 3) + 1) - 1;
			var newWindow = window.open(href + '/a?newOwn='+ designers[r], '_blank');
			autoSave(autoAssign);
		} /* endif */
		
	} /* endfor */

} /* function end */

var groupvalue = $('.bPageBlock .reportOutput .tabularReportTable .breakRowClass0Top > td span.groupvalue').first().text();
var sourceQueue = 'https://na43.salesforce.com/00O0G000007H22J';
console.log("Source : " + window.location.href);

/* Check if there is an ADS */
if(groupvalue === findValue) {
	var recordcountText = $('.bPageBlock .reportOutput .tabularReportTable .breakRowClass0Top > td span.recordcount').first().text();
	var recordcount = parseInt(recordcountText.replace(/[^0-9]/gi, ''), 10);

	if(recordcountText === null || recordcountText === '' || recordcountText === undefined) {
		if(recordcount !== 0) {
			$('title').text('Assigning Case to ...');
			console.log('Process assinging case...');
		} /* endif */
	} else {
	    $('title').text('ADS has ' + recordcountText);
	    console.log('ADS found! Total Record : ' + recordcountText);

		/* Selection of Assignment Type */
		switch (assignType) {
			case 0 : selfAssign(designer, row, countLoop); break;
			case 1 : consecutiveAssign(recordcount, row, designers); break;
			case 2 : randomAssign(recordcount, row, designers); break;
			case 3 : nonOnboarding(recordcount); break; /* Comming soon */
			default: console.log("Please setup configuration."); alert("Please setup configuration.");
		} /*endswitch */

	} /* endif */
} else {
	if(sourceQueue === window.location.href){
		$('title').text('No ADS Queue');
		console.log('No ADS found. Please try again later.');
		setInterval(function(){ location.reload(); }, 20000); /* Set Delay */		
	}

} /* endif */

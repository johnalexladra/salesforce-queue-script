var designer = 'Developer1'; /* name of the developer */
var findValue = 'ADS'; /* value to find */
var groupValue = $('#fchArea > table > tbody > tr.breakRowClass0Top').find('td:nth-child(2) > span > a:contains("'+ findValue +'")');
var recordcountText = groupValue.parent().next().first().text();
var recordcount = parseInt(recordcountText.replace(/[^0-9]/gi, ''), 10);
var sourceQueue = 'https://na43.salesforce.com/00O0G000007H22J'; /* salesforce queue url */

// console.log(groupValue.text()); // uncomment this to debug
// console.log(recordcountText); // uncomment this to debug

if(groupValue.text() === findValue) {
	if(recordcountText === '') {
		$('title').text('No '+ findValue +' Queue');
		console.log('Process assinging case...');
	} else {
		$('title').text(findValue +' has '+ recordcountText);
		console.log(findValue +' found! Total Record : ' + recordcountText);

		groupValue.parent().parent().parent().next().each(function() {
			$(this).nextUntil('tr.breakRowClass0.breakRowClass0Top').addClass('onBoarding');
		});

		$('tr.onBoarding > td:nth-child(3) > a:contains("ENFRA")').each(function() {
			$(this).attr('target','_blank').css({'background-color':'red'});
			var href = $(this).attr('href');
			var newWindow = window.open(href + '/a?newOwn='+ designer + '&retURL=%2F' + href.slice(1), '_blank');
		});
	}
} else {
	if(sourceQueue === window.location.href) {
		$('title').text('Case Owner : '+ findValue + ' not found!');
		console.log('No '+ findValue +' found. Please try again later.');
		setInterval(function(){ location.reload(); }, 20000);
	}
}

$(document).ready(function() {
	if(sourceQueue !== window.location.href) {
		$('title').text('Assigning Case to ' + designer);
		$('#bottomButtonRow input:first-child').click();
	}
});

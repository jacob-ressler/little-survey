$(document).ready(() => {
	// I was having some issues with the JSON data getting
	// pulled not having the updated counts from update.php.
	// By waiting for a little before getting the JSON, hopefully
	// that problem can be avoided.
	setTimeout(getSurveyData, 200);
});

function getSurveyData() {
	$.getJSON('survey.json', function(data) {
		getResults(data);
	});
}

function getResults(data) {
	// use an array to hold all the width values for the bar divs
	let widths = [];

	// construct a string from the data to be injected into the html
	let str = '';
	data.forEach(item => {
		str += '<div class="question">';
		str += '<h2 class="prompt">' + item.prompt + '</h2>';

		// find the total number of responses to this item
		let total = 0;
		item.options.forEach(op => {
			total += op.count;
		});

		// loop through again to display the results
		item.options.forEach(op => {
			let perc = percent(op.count, total);
			str += '<div class="result"><div class="option">' + op.content;
			str += '<span> (' + perc + '%, ' + op.count + '/' + total + ')</span></div>';
			str += '<div class="bar"></div></div>'; //style="width: ' + perc + '%"
			widths.push(perc);
		});

		str += '</div>';
	});

	// close off tags and display the string in 'results.html'
	str += '</div>';
	$('#results-container').html(str);

	if ($('.footer').length == 0) {
		// we don't have a footer yet so add it in
		addFooter();
	}

	animateBars(widths);
}

/* The results will be displayed following this general format
<div class="question">
	<h2 class="prompt">This is a sample.</h2>
	<div class="result">
		<div class="option">
			option 1
		</div>
		<div class="bar"></div>
	</div>
	<div class="result">
		option 2
	</div>
</div>

*/

function percent(part, whole) {
	if (whole == 0) return 0; // handle div by 0
	return Math.round((part * 100) / whole);
}

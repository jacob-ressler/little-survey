$(document).ready(() => {
	$.getJSON('survey.json', function (data) {
		getResults(data);
	});
});

function getResults(data) {
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
			str += '<div class="bar" style="width: ' + perc + '%"></div></div>';
		});

		str += '</div>';
	});

	// close off tags and display the string in 'results.html'
	str += '</div>';
	$('#results-container').html(str);
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
	return Math.round((part * 100) / whole);
}

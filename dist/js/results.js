$(document).ready(() => {
	$.getJSON('temp.json', function(data) {
		getResults(data);
	});
});

function getResults(data) {
	let str = '<div class="question">';
	data.forEach(item => {
		str += '<h2 class="prompt">' + item.prompt + '</h2>';

		// find the total number of responses to this item
		let total = 0;
		item.options.forEach(op => {
			total += op.count;
		});

		// loop through again to display the results
		item.options.forEach(op => {
			str += '<div class="result"><div class="option">' + op.content + '</div>';
			str += '<div class="bar"></div>';
			str += '<p>' + percent(op.count, total) + '% (' + op.count + '/' + total + ')</p></div>';
		});
	});

	// close off tags and display the string in 'results.html'
	str += '</div>';
	$('.container').html(str);
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

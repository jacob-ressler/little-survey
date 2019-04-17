$(document).ready(function() {
	$.getJSON('survey.json', function(data) {
		createSurvey(data);
	});
});

/* Each question will be formatted similarly to this:
<div class="question">
	<h2 class="prompt">Is this a test?</h2>
	<div>
		<input type="radio" id="q1-1" name="q1" value="Yes" />
		<label for="q1-1">Yes</label>
	</div>
	<div>
		<input type="radio" name="q1-2" value="No" />
		<label for="q1-2">No</label>
	</div>
</div> 
*/

function createSurvey(data) {
	let str = '';
	for (let i = 0; i < data.length; i++) {
		str += '<div class="question">';
		str += '<h2 class="prompt">' + data[i].prompt + '</h2>';
		str += '<div class="option-container">';

		// some questions may have more options than others,
		// so just go through them all and make sure they get added
		let temp = 1;
		data[i].options.forEach(op => {
			str += '<div><input type="radio" id="q' + (i + 1) + '-' + temp + '" ';
			str += 'name="q' + (i + 1) + '" ';
			str += 'value="' + op.content + '" class="radio" />';
			str += '<label for="q' + (i + 1) + '-' + temp + '">' + op.content + '</label></div>';
			temp++;
		});

		// close off any unclosed tags
		str += '</div></div>';
	}

	// make a submit button
	str += '<div class="submit"><input type="submit" value="Submit"></div>';

	// make str the html content of the form in 'index.html'
	$('#survey-form').html(str);
	addFooter();
}

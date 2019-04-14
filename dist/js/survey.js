$(document).ready(function() {
	$.getJSON('survey.json', function(data) {
		createSurvey(data);
	});
});

function createSurvey(data) {
	let str = '';
	for (let i = 0; i < data.length; i++) {
		str += '<div class="question">';
		str += '<h2 class="prompt">' + data[i].prompt + '</h2>';

		// some questions may have more options than others,
		// so just go through them all and make sure they get added
		data[i].options.forEach(op => {
			str += '<p><input type="radio" name="q' + i + '"';
			str += 'value="' + op.content + '" />' + op.content + '</p>';
		});

		// close off any unclosed tags
		str += '</div>';
	}

	// make a submit button
	str += '<input type="submit" value="Submit">';

	// make str the html content of the form in 'index.html'
	$('#survey-form').html(str);
}

/* Each question will be formatted similarly to this:
<div class="question">
	<h2 class="prompt">Is this a test?</h2>
	<input type="radio" name="q1" value="Yes" />Yes <br />
	<input type="radio" name="q1" value="No" />No
	
</div> 
*/

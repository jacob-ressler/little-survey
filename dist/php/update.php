<?php
	echo '<ul><li><a href="../index.html">Survey</a></li><li><a href="../results.html">Results</a></li></ul>';
	if (empty($_POST)) {
		// there is no post data (blank survey form was submitted)
		goToResults();
	}
	else {
		// first we need to get the json data
		$data = json_decode(file_get_contents('../survey.json'), true);

		echo "<h1>Old JSON</h1>";
		echo file_get_contents('../survey.json');

		// go through each question, update the public results with this user's results
		for ($i = 0; $i < count($data); $i++) { 
			// find which option matches the posted results and increment its count
			if (array_key_exists('q'.($i+1), $_POST)) {
				for ($j=0; $j < count($data[$i]['options']); $j++) { 
					if (strcmp($data[$i]['options'][$j]['content'], $_POST['q'.($i+1)]) == 0) {
						// we have a match so update and break
						$data[$i]['options'][$j]['count']++;
						break;
					}
				}
			}
		}

			// overwrite the json file to reflect the changes and go to the results page

	if (file_put_contents('../survey.json', json_encode($data, JSON_PRETTY_PRINT))) {
		echo '<h1 style="color: red">Data successfully updated!';
	}
	else {
		echo '<h1 style="color: red">Error updating data!';
	}
	

	echo "<h1>Updated JSON</h1>";
	echo file_get_contents('../survey.json');

	//goToResults();
	}


	// redirect to the results page
	function goToResults() {
		header('Location: ../results.html');
		// Note to self: don't put 'exit' here, because it stops the JSON file from getting updated...
	}
?>
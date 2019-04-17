<?php
	if (empty($_POST)) {
		// there is no post data (blank survey form was submitted)
		goToResults();
	}
	
	// first we need to get the json data
	$data = json_decode(file_get_contents('../survey.json'), true);

	// go through each question, update the public results with this user's results
	for ($i = 0; $i < count($data); $i++) { 
		// find which option matches the posted results and increment its count
		foreach ($data[$i]['options'] as $key => $op) {
			if (array_key_exists('q'.($i+1), $_POST)) {
				// there is post data for this question
				echo $_POST['q'.($i+1)].'<br>';
				echo $op['content'].'<br>';
				if (strcmp($op['content'], $_POST['q'.($i+1)]) == 0) {
					// we have a match so update and break
					$data[$i]['options'][$key]['count']++;
					break;
				}
			}
		}	
	}

	// overwrite the json file to reflect the changes and go to the results page
	file_put_contents('../survey.json', json_encode($data));
	//goToResults();

	// redirect to the results page
	function goToResults() {
		header('Location: ../results.html');
		exit;
	}
?>
<?php
	// first we need to get the json data
	$data = json_decode(file_get_contents('../survey.json'), true);

	// go through each question, update the public results with this user's results
	for ($i = 0; $i < count($data); $i++) { 
		// find which option matches the posted results and increment its count
		foreach ($data[$i]['options'] as $key => $op) {
			//echo $key.' :: '.$op;
			if (strcmp($op['content'], $_POST['q'.$i]) == 0) {
				// we have a match so update and break
				$data[$i]['options'][$key]['count']++;
				break;
			}
		}	
	}

	// overwrite the json file to reflect the changes
	//FIXME: this should be changed to survey.json once everything is working...
	file_put_contents('../temp.json', json_encode($data));

	// now redirect to a results page
	if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
		$uri = 'https://';
	} else {
		$uri = 'http://';
	}
	$uri .= $_SERVER['HTTP_HOST'];
	header('Location: '.$uri.'/little-survey/dist/results.html');
	exit;
?>
<?php
	echo '<ul><li><a href="../index.html">Survey</a></li><li><a href="../results.html">Results</a></li></ul>';
	if (empty($_POST)) {
		// there is no post data (blank survey form was submitted)
		goToResults();
	}
	else {
		// first we need to get the json data
		$data = json_decode(file_get_contents('../survey.json'), true);

		//echo "<h1>Old JSON</h1>";
		//echo file_get_contents('../survey.json');

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

		// overwrite the json file to reflect the changes

			
		/* create a stream context telling PHP to overwrite the file (may be needed since Grail is an SFTP server) */ 
		$options = array('ftp' => array('overwrite' => true)); 
		$stream = stream_context_create($options); 

		/* make sure we write the file (sometimes Grail just decides not to and I can't figure out why...) */
		if (file_put_contents('../survey.json', json_encode($data, JSON_PRETTY_PRINT), 0, $stream)) {
			echo '<h1 style="color: red">Data successfully updated!';
			echo "<h1>Updated JSON</h1>";
			echo file_get_contents('../survey.json');
			goToResults();
		}
		else {
			echo '<h1 style="color: red">Error updating data! The file survey.json was not able to be written to.</h1>';
			echo '<h3>This could be due to one or more of many things that I have encountered myself and have been trying to work through:'.
					 '<ul><li>Most likely I forgot to change the permissions in my \'public_html\' folder and contents (for whatever reason, they HAVE to be 0777). '.
					 'shoot me an <a href="mailto:jressler96@gmail.com">email</a> and I will fix this ASAP</li>'.
					 '<li>Grail server decided not to (it seems to just happen randomly without me even changing the code, never had this issue using localhost)</li>'.
					 '<li>Your browser is acting up and may need to be closed and reopened (not just this tab, the entire browser)</li>'.
					 '<li>There may be some weird stuff happening with page caching that I haven\'t really found a way to get around (sorry)</li></ul>';
			echo '<br>You can use the top navigation to return to the survey and try again or just give up and go to the un-updated results.</h3>';
		}
	}


	// redirect to the results page
	function goToResults() {
		header('Location: ../results.html');
		// Note to self: don't put 'exit' here, because it (maybe?) stops the JSON file from getting updated...
	}
?>
# Just a Little Survey

Take the survey and view your results... and the results of everyone else who has taken it.

Try it out [here](http://eecs.csuohio.edu/~jaressle/little-survey/dist/)!

## Languages Used
- HTML5
- Sass (extension language for writing cleaner and more compact CSS)
- JavaScript (mostly jQuery with a little vanilla JS)
- JSON
- PHP

## How it works

Upon loading  `index.html`, the `survey.js` script will run. This will pull question data from `survey.json`, process it, format it into an HTML string, and inject it into the page's form. 

After the user fills out and submits the form, `update.php` will be run, which will update the poll counts in `survey.json` according to the POST data from the form. The user will automatically be redirected to `results.html` after all relevant data has been updated.

Upon loading `results.html`, the `results.js` script will run. This will again pull question data from `survey.json`, process it, format it into an HTML string, and inject it into the page.

## Regarding usage...

All source code is my own and is free to be used or modified for your own projects as you see fit.

The following external libraries/extensions were used in this project:
- [jQuery](https://jquery.com/)
- [FontAwesome](https://fontawesome.com/)
- [Sass](https://sass-lang.com/)

## Project Information

- Developed by Jacob Ressler
- CIS 408 Internet Programming
- Cleveland State University
- Spring 2019

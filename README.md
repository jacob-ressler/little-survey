# Just a Little Survey

Take the survey and view your results... and the results of everyone else who has taken it.

## Languages Used
- HTML5
- [Sass](https://sass-lang.com/) (extension language for writing cleaner CSS)
- JavaScript (jQuery & vanilla)
- JSON
- PHP

## How it works

Upon loading  `index.html`, the `survey.js` script will run. This will pull question data from `survey.json`, process it, format it into an HTML string, and inject it into the page's form. 

After the user fills out and submits the form, `update.php` will be run, which will update the poll counts in `survey.json` according to the POST data from the form. The user will automatically be redirected to `results.html` after all relevant data has been updated.

Upon loading `results.html`, the `results.js` script will run. This will again pull question data from `survey.json`, process it, format it into an HTML string, and inject it into the page.

## Regarding usage...

All source code is my own and is free to be used or modified for your own projects as you see fit.

## Project Information

- Developed by Jacob Ressler
- CIS 408 Internet Programming
- Cleveland State University
- Spring 2019

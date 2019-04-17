function animateBars(widths) {
	$bars = $('.bar');
	//console.log($bars);

	// Animate the widths of the bars
	for (let i = 0; i < $bars.length; i++) {
		$($bars[i]).animate(
			{
				width: widths[i] + '%'
			},
			1000,
			'swing'
		);
	}
}

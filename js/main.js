$(function () {

	$('section').hide();

	$('nav ul li a').on('click', function(event) {
		event.preventDefault();

		var sectionSelected = $(this).attr('section');
	
		$('section').hide();
		$('.'+sectionSelected+'').show();
	});
});
function searchToggle(obj, evt) {
	var container = $(obj)
		.closest('.search-wrapper');
	if (!container.hasClass('active')) {
		container.addClass('active');
		evt.preventDefault();
	} else if (container.hasClass('active') && $(obj)
		.closest('.input-holder')
		.length == 0) {
		container.removeClass('active');
		// clear input
		container.find('.search-input')
			.val('');
	} else {
		searchWiki();
	}

}

function runSearch(evt) {
	if (event.which == 13 || event.keyCode == 13) {
		//code to execute here
		return searchWiki();
	}
}

function searchWiki() {
	if ($('.search-input')
		.val() != '') {
		$.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + encodeURI($('.search-input')
				.val()) + '&limit=10&format=json&callback=?',
			function(data) {
				if (data[1].length == 0)
					$('#result').html('<h5 align="center">No results found &#9785;</h5>');
				else {
					$('#result').html('<div class="valign-wrapper" style="width:100%;height:100%;position: absolute;">' +
						'<div class="valign" style="width:100%;"><ul class="collapsible popout" id="table" data-collapsible="expandable">'
					);
					for (var i = 0; i < data[1].length; i++) {
						$('#table').html($('#table').html() +
							'<li><div class="collapsible-header"><i class="material-icons">pageview</i>' +
							data[1][i] +
							'</div><div class="collapsible-body">' + data[2][i] + '</span><p><small><a href="' + data[3][i] +
							'"target=_blank>' + data[3][i] + '</a></p></small></div></li>');
					}
					$('#table').html($('#table').html() + '</ul></div></div>');
					$('.collapsible').collapsible();
				}
				console.log(data);
			});
	} else
		alert("Type something!");
}

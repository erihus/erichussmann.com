$(document).ready(function(){
	
	$.stellar({
		  responsive: true,
	});

	$('.hamburger').click(function(){
		var isMobile = $('#tab-down-mq').is(':visible');

		$(this).toggleClass('is-active');

		if(!isMobile) {
			$('header').toggleClass('scrolled');
			$(this).addClass('invisible');
		}
	});
	
});


$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 70) {
        $("header").addClass("scrolled");
        $('.hamburger').removeClass('invisible');
        if($('.hamburger').hasClass('is-active')) {
        	$('.hamburger').removeClass('is-active');
        }
    } else {
    	$("header").removeClass("scrolled");
    	$('.hamburger').addClass('invisible');
    }
});
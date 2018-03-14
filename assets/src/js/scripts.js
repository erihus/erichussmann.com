$(document).ready(function(){
	
	$.stellar({
		  responsive: true,
	});

	$('.testimonial-slider').slick({
		arrows: false,
		dots: true,
		autoplay: true
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


    $('.animate-when-visible').each(function(){
    	var top = $(this).offset().top;
    	var wh = $(window).height();
    	if(scroll >= top - wh/2) {
    		animateWhenVisible($(this));
    	}
    });
});

function animateWhenVisible(el) {
	var animation = el.data('animation');
	el.addClass('animated '+animation);
}
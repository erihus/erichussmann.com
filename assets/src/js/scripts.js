var isMobile = $('#phone-tablet-mq').is(':visible');

$(document).ready(function(){
	
	$.stellar({
		  responsive: true,
	});

	$('.testimonial-slider').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 6000	
	});

	$('header .hamburger').click(function(){

		$(this).toggleClass('is-active');

		if(!isMobile) {
			$('header').toggleClass('scrolled');
			$(this).addClass('invisible');
		} else {
			$("#mobile-menu").toggleClass('shown');
			$('html,body').toggleClass('overlay');
			$(this).removeClass('invisible');
		}
	});
	
	$('header .hamburger').each(function(){
		if(isMobile) {
			$(this).removeClass('invisible');
		}	
	});

	function anchorAutoScroll($el) {
		var offset = 50;
		var top = $el.offset().top;

		if($('header').hasClass('scrolled')) {
			offset += $('header').data('stuck-height');
		} 

		var scrollTo = top - offset;
		$('html, body').removeClass('overlay').animate({scrollTop: scrollTo}, 'slow');
		
	}

	$('nav li a:not(.external)').click(function(e){
		e.preventDefault();		
		var target = '';
		var hashURL = '';
		if($(this).is('a')) {
			hashURL = $(this).attr('href');
		} else {
			hashURL = $(this).find('a').attr('href');
		}

		target = hashURL.split('#')[1]; //in case the href starts with a slash or something	
		var	$el = $('#'+target);

		if(!$el.length) { // if the anchor is not on the page, follow the link through (usually if its the menu)
			window.location.replace(hashURL);
			return;
		}
			
		anchorAutoScroll($el);

		if($(this).closest('nav').is('#mobile-menu')) {
			$('#mobile-menu').removeClass('shown');
			$('header .hamburger').toggleClass('is-active');
		}

		ga('send', 'event', 'Nav', 'click', target);
	});

	$('.work-item').click(function(){
		var item = $(this).data('detail');
		var $overlay =  $('#'+item+'-work');
		var offset = window.pageYOffset;
		$overlay.addClass('shown');
		setTimeout(function(){
			$overlay.find('.hamburger').addClass('is-active');	
		}, 100)
		$('html,body').addClass('overlay');
		$overlay.css('top', offset+'px');
		ga('send', 'event', 'Porfolio', 'click', item);
	});

	$('.close-overlay').click(function(){
		$(this).closest('.work-detail').removeClass('shown');
		$(this).removeClass('is-active');
		$('html,body').removeClass('overlay');
	});
});


$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    var $hamburger = $('header .hamburger');
    
    if(!isMobile){
	    if (scroll >= 70) {
	        $("header").addClass("scrolled");
	        $hamburger.removeClass('invisible');
	        if($hamburger.hasClass('is-active')) {
	        	$hamburger.removeClass('is-active');
	        }
	    } else {
	    	$("header").removeClass("scrolled");
	    	$hamburger.addClass('invisible');
	    }
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
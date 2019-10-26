$('body').scrollspy({target: ".navbar", offset: 50});
$("#myNavbar a").on('click', function(event) {
	if (this.hash !== "") {
		event.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 800, function(){
			window.location.hash = hash;
		});
	}
});
//-----------------------------------------------
$(function(){
	$(window).on('scroll', function() {
		var scrollTop = $(this).scrollTop();
		$('.chgcolor').each(function() {
			var topDistance = $(this).offset().top;
			if ( (topDistance) < scrollTop ) {
				$('.navbar').css('background-color',$(this).attr('data-color'));
			}
		});
	});
});
//-----------------------------------------------
$(function() {
	var viewPortWidth = $(window).width();

	$(window).scroll(function(event) {
		event.preventDefault();
		if (viewPortWidth > 480) {
			if ($(this).scrollTop() > 180) {
				$('.scrollTo-top').fadeIn();
			} else {
				$('.scrollTo-top').fadeOut();
			}
		}
	});

	$('.scrollTo-top').click(function(event) {
		$('html, body').animate({scrollTop : 0 }, 600);
		event.preventDefault();
	});
});
//-----------------------------------------------
$('.slickYapindo-nav').slick({
    arrows: true,
    variableWidth: true,
    centerMode: true,
    asNavFor: '.slickYapindo-for',
    centerPadding: '60px',
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true
});

 $('.slickYapindo-for').slick({
  arrows: false,
  fade: true,
  slidesToShow: 1,
  asNavFor: '.slickYapindo-nav'
});

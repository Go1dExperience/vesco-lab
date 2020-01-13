// Services (Animation)
$(function() {
    // animate on scroll
    new WOW().init();
});
// Work (Magnific Popup)
$(function() {
    // magnific popup
    $('#work').magnificPopup({
        delegate: 'a',    
        type:'image',
        gallery: {
            enabled: true
        }
    });
});
// About (Owl Carousel)
$(function() {
    // owl carousel
    $("#team-members").owlCarousel({
        items: 3,
        loop: true,
        autoplay: true,
        smartSpeed: 700,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
        },
    });

});
// Testimonial (Owl Carousel)
$(function() {
    // owl carousel
    $("#testimonials").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        smartSpeed: 700,
        autoplayHoverPause: true,

    });

});
// Stats (Counter Up)
$(function(){
    // Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1500,
    });

});
// Clients (Owl Carousel)
$(function() {
    // owl carousel
    $("#client-list").owlCarousel({
        items: 6,
        loop: true,
        autoplay: true,
        smartSpeed: 700,
        autoplayHoverPause: true,
        responsive : {
            0 : {
                items: 1,
            },
            480 : {
                items: 3,
            },
            768 : {
                items: 5,
            },
            992 :{
                items: 6,
            },
        }
    });
});
// Navigation
$(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() < 40) {
            $("nav").removeClass("vesco-top-nav");
            $("#back-to-top").fadeOut();
        } else{
            $("nav").addClass("vesco-top-nav");
            $("#back-to-top").fadeIn();
        }
    });
});
// Smooth Scrolling
$(function(){
    $("a.smooth-scroll").click(function(event){
        event.preventDefault();
        var section = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(section).offset().top   
        }, 1250, "easeInOutExpo");
    });
});
// Close menu on mobile click
$(function(){
    $(".navbar-collapse ul li a").on("click touch",function(){
        console.log('click');
        $(".navbar-toggle").click();
    });
});
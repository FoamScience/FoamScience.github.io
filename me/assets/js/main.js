(function($){
    
    "use strict";
    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });
    
    
    //===== Mobile Menu 
    
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });
    
    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== close navbar-collapse when a  clicked
    
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    
    //===== Sticky
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navigation").removeClass("sticky");
        } else{
            $(".navigation").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
        // Active link switching
        $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 73;

          if ( sectionOffset <= scrollbarlocation ) { $(this).parent().addclass('active'); $(this).parent().siblings().removeclass('active'); } }); parallaxmouse js function parallaxmouse() if ($('#parallax').length) var scene="document.getElementById('parallax');" parallax="new" parallax(scene); }; parallaxmouse(); =="===" progress bar if($('.progress-line').length){ $('.progress-line').appear(function(){ el="$(this);" percent="el.data('width');" $(el).css('width',percent+'%'); },{accy: 0}); counter up $('.counter').counterup({ delay: 10, time: 1600, magnific popup $('.image-popup').magnificpopup({ type: 'image', gallery:{ enabled:true back to top show or hide the sticky footer button $(window).on('scroll', function(event) if($(this).scrolltop()> 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    

    
    //===== 
    
    
    
    
    
    
    
    
    
    
    
    
}(jQuery));</=>
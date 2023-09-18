"use strict";
$(document).ready(function() {
    var swiper = new Swiper(".slider1", {
        initialSlide: 1,
        spaceBetween: 8,
        speed: 2000,
        effect: "coverflow",
        autoResize:false,
        centeredSlides:true,
        allowTouchMove : true,
        loop: !1,
        autoplay:{
            delay:2500,
            disableOnInteraction: false,
        },
        autoplayDisableOnInteraction:true,
        coverflow: {
            rotate: 0,
            stretch: 500,
            depth: 300,
            modifier: 1,
            slideShadows: true
        },
        slidesPerView: 1.2,
        slideToClickedSlide: !0,
        pagination :".swiper-pagination",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        breakpoints: {
           480 : {
                effect: "slider",
                slidesPerView: 1,
                spaceBetween: 1,
            }
        }
    });
    var swiper_two = new Swiper(".last_lecture_content", {
        initialSlide: 1,
        spaceBetween: 20,
        speed: 2500,
        autoResize:false,
        centeredSlides:true,
        slidesPerView: 3,
        slideToClickedSlide: !0,
        loop: !1,
        observe:true,
        observerParents:true,
        autoplayDisableOnInteraction:true,
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });

});
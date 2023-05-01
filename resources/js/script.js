//========== Main JavaScript When Scroll The Site The main Navbar Will Fixed to the top ===========//

// Sticky Navbar and Go To Top BTN
const navbar = document.querySelector(".navbar");
const goTop = document.querySelector(".go-top");

window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

        //When scroll or go to any section in devices under 1024px the menu will close automatically
        navTogglerBtn.classList.remove("open");
        menuOpen = false;
        mainMenuContainer.classList.remove("menu-show");

    if ( scrollHeight > navHeight ) {
        navbar.classList.add("sticky-navbar");
    }else {
        navbar.classList.remove("sticky-navbar");
    }

    if ( scrollHeight > 500 ) {
        goTop.classList.add("show");
    }else {
        goTop.classList.remove("show");
    }
});



//========== Main JavaScript When The Device Width is Under 1024px Menu will Show as a Hamburger ===========//

// Hamburger Btn 
const mainMenuContainer = document.querySelector(".main-menu-container");
const navTogglerBtn = document.querySelector(".nav-toggler-btn");
let menuOpen = false;

navTogglerBtn.addEventListener('click', () => {
    if ( !menuOpen ) {
        navTogglerBtn.classList.add("open");
        menuOpen = true;
        mainMenuContainer.classList.add("menu-show");
    }else {
        navTogglerBtn.classList.remove("open");
        menuOpen = false;
        mainMenuContainer.classList.remove("menu-show");
    }
});



//========== Main JavaScript When Scroll The Site to a particular Section the menu will highlight ===========//

//Active Highlight Menu
// const navBrand = document.querySelector(".navbar-brand");

window.addEventListener('scroll', function(){
    highlightMenu()
});

window.addEventListener('click', function(){
    highlightMenu()
});

window.addEventListener('DOMContentLoaded', function(){
    highlightMenu()
});

function highlightMenu() {
    const elem = document.querySelector(".highlight");
    const homeMenu = document.querySelector(".home");
    const aboutMenu = document.querySelector(".about");
    const resumeMenu = document.querySelector(".resume");
    const serviceMenu = document.querySelector(".services");
    const portfolioMenu = document.querySelector(".portfolio");
    const blogMenu = document.querySelector(".blog");
    const contactMenu = document.querySelector(".contact");

    let scrollPos = window.pageYOffset;
    
    // console.log(scrollPos);

    if(window.innerWidth > 1023 && scrollPos < 300) {
        homeMenu.classList.add("highlight");
        aboutMenu.classList.remove("highlight");
        return;
    }else if(window.innerWidth > 1023 && scrollPos < 1400) {
        aboutMenu.classList.add("highlight");
        homeMenu.classList.remove("highlight");
        resumeMenu.classList.remove("highlight");
        return;
    }else if(window.innerWidth > 1023 && scrollPos < 2450) {
        resumeMenu.classList.add("highlight");
        aboutMenu.classList.remove("highlight");
        serviceMenu.classList.remove("highlight");
        return;
    }else if(window.innerWidth > 1023 && scrollPos < 3800) {
        serviceMenu.classList.add("highlight");
        resumeMenu.classList.remove("highlight");
        portfolioMenu.classList.remove("highlight");
        return;
    }else if(window.innerWidth > 1023 && scrollPos < 4800) {
        portfolioMenu.classList.add("highlight");
        serviceMenu.classList.remove("highlight");
        blogMenu.classList.remove("highlight");
        return;
    }else if(window.innerWidth > 1023 && scrollPos < 5650) {
        portfolioMenu.classList.remove("highlight");
        serviceMenu.classList.remove("highlight");
        blogMenu.classList.remove("highlight");
        return;
    }else if(window.innerWidth > 1023 && scrollPos < 6600) {
        blogMenu.classList.add("highlight");
        portfolioMenu.classList.remove("highlight");
        contactMenu.classList.remove("highlight");
        return;
    }else if(window.innerWidth > 1023 && scrollPos < 7450) {
        contactMenu.classList.add("highlight");
        blogMenu.classList.remove("highlight");
        return;
    }

    if ((elem && window.innerWidth < 1024 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight');
    }

}



//========== Main JavaScript JQuery Plugin When Scroll The Site to About Section Skill Sub-Section the ProgressBar will Animate  ===========/

// ProgressBar
(function($){

    $.fn.ProgressBar = function(){
        var targetParent = $(this); 
        targetParent.each(function(){

            //required variables
            var target = $(this).children();
            var offsetTop = $(this).offset().top;
            var winHeight = $(window).height(); 
            var data_width = target.attr("data-percent") + "%";
            var data_color = target.attr("data-color"); 

            //animation starts
            if( winHeight > offsetTop ) {
                target.css({
                    backgroundColor: data_color,
                });
                target.animate({
                    width: data_width,
                }, 1000);
            }

            //animation with scroll 
            $(window).scroll(function(){
                var scrollBar = $(this).scrollTop(); 
                var animateStart = offsetTop - winHeight; 
                if( scrollBar > animateStart ) {
                    target.css({
                        backgroundColor: data_color,
                    });
                    target.animate({
                        width: data_width,
                    }, 1000);
                }
            });
        });

        return this; 
    }
})(jQuery)



//========== Main JavaScript JQuery Plugin When Scroll The Site to Services Section Facts Sub-Section the Counter will Animate  ===========/

// Animated Counter Animation
$(function () {

    // CONFIG
    let visibilityIds = ['#counters_1'];
    let counterClass = '.counter';
    let defaultSpeed = 3000; //default value

    // END CONFIG

    //init if it becomes visible by scrolling
    $(window).on('scroll', function () {
        getVisibilityStatus();
    });

    //init if it's visible by page loading
    getVisibilityStatus();

    function getVisibilityStatus() {
        elValFromTop = [];
        var windowHeight = $(window).height(),
            windowScrollValFromTop = $(this).scrollTop();

        visibilityIds.forEach(function (item, index) { //Call each class
            try { //avoid error if class not exist
                elValFromTop[index] = Math.ceil($(item).offset().top);
            } catch (err) {
                return;
            }
            // if the sum of the window height and scroll distance from the top is greater than the target element's distance from the top, 
            //it should be in view and the event should fire, otherwise reverse any previously applied methods
            if ((windowHeight + windowScrollValFromTop) > elValFromTop[index]) {
                counter_init(item);
            }
        });
    }

    function counter_init(groupId) {
        let num, speed, direction, index = 0;
        $(counterClass).each(function () {
            num = $(this).attr('data-TargetNum');
            speed = $(this).attr('data-Speed');
            direction = $(this).attr('data-Direction');
            easing = $(this).attr('data-Easing');
            if (speed == undefined) speed = defaultSpeed;
            $(this).addClass('c_' + index); //add a class to recognize each counter
            doCount(num, index, speed, groupId, direction, easing);
            index++;
        });
    }

    function doCount(num, index, speed, groupClass, direction, easing) {
        let className = groupClass + ' ' + counterClass + '.' + 'c_' + index;
        if(easing == undefined) easing = "swing";
        $(className).animate({
            num
        }, {
            duration: +speed,
            easing: easing,
            step: function (now) {
                if (direction == 'reverse') {
                    $(this).text(num - Math.floor(now));
                } else {
                    $(this).text(Math.floor(now));
                }
            },
            complete: doCount
        });
    }
})



//========== Main JavaScript JQuery Plugin For Testimonials Section Client Feedback Slider ===========/

//JQuery Slider For Testimonials
$(document).ready(function(){
    $(".card-slider")
    .not(".slick-initialized")
    .slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed:2000,
        arrows: true,
        prevArrow:".slider-btn-left",
        nextArrow:".slider-btn-right",
    });
});


// Footer-end Date
const date = new Date();

document.querySelector('.date').innerText = date.getFullYear();
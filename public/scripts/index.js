// Solution for Mobile viewport found here
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// Written by: Louis Hoebregts
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const sideMenu = $('#sideMenu');
const sideMenuBtn = $('#sideMenuBtn');
const downArrow = $('#downArrow');
const downArrowImg = document.getElementById('downArrowImg');

// The four sections of the website
const sectionintro = document.getElementById('sectionIntro');
const sectionAboutMe = document.getElementById('sectionAboutMe');
const sectionProjects = document.getElementById('sectionProjects');
const sectionWork = document.getElementById('sectionWork');

// Opens/Closes the side menu bar
function toggleSideNav() {
  const isOpen = sideMenu.attr('data-open');
  if (isOpen == 'no') {
    sideMenuBtn.fadeOut(150);
    sideMenu.animate(
      { 'width': '187.5px' }, 400
    );
    sideMenu.attr('data-open', 'yes');
  } else {
    sideMenu.animate(
      { 'width': '0px' }, 400
    );
    sideMenuBtn.fadeIn(500);
    sideMenu.attr('data-open', 'no');
  }
}

// Scrolls to the specified section of the page
function nextSection() {
  var nextSection;
  var sections = [sectionintro, sectionAboutMe, sectionProjects, sectionWork];
  for (let i = 0; i < 4; i++) {
    var sectionTop = sections[i].getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight && sectionTop > 0) {
      nextSection = sections[i];
      break;
    }
  }
  if (!nextSection) {
    nextSection = sections[0];
  }
  if (nextSection == sections[3]) {
    rotate(180);
  } else {
    rotate(0);
  }
  $("html, body").animate({
    scrollTop: $(`#${nextSection.id}`).offset().top
  }, 750);
}


// Jquery function to rotate next section button, found
// on jsfiddle here https://jsfiddle.net/LTNPs/
function rotate(degree) {
  $('#downArrowImg').animate({ borderSpacing: degree }, {
    step: function (now, fx) {
      $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
      $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
      $(this).css('transform', 'rotate(' + now + 'deg)');
    },
    duration: 750
  }, 'linear');
}

// Change the color of the scroll buttton if scrolled down at all
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    downArrowImg.setAttribute('src', 'public/images/down-chevron-brown.png');
  } else {
    downArrowImg.setAttribute('src', 'public/images/down-chevron.png');
  }
});

// Fade the scroll button in on load
window.addEventListener('load', () => {
  setTimeout(() => {
    downArrow.fadeIn(350).css('display', 'grid');
  }, 1600);
});
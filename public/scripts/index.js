// Solution for Mobile viewport found here
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// Written by: Louis Hoebregts
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const sideMenu = $('#sideMenu');
const sideMenuBtn = $('#sideMenuBtn');

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
function nextSection(sectionId) {
  $("html, body").animate({
    scrollTop: $(`#${sectionId}`).offset().top
  }, 750);
}
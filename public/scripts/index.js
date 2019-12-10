const sideMenu = document.getElementById('sideMenu');
const sideMenuBtn = document.getElementById('sideMenuBtn');

// Solution for Mobile viewport found here
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// Written by: Louis Hoebregts
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Opens/Closes the side menu bar
function toggleSideNav() {
  const isOpen = sideMenu.getAttribute('data-open');
  if (isOpen == 'no') {
    sideMenuBtn.style.display = 'none';
    sideMenu.style.width = '187.5px';
    sideMenu.setAttribute('data-open', 'yes');
  } else {
    sideMenuBtn.style.display = 'block';
    sideMenu.style.width = '0';
    sideMenu.setAttribute('data-open', 'no');
  }
}

// Scrolls to the specified section of the page
function nextSection(sectionId) {
  $("html, body").animate({
    scrollTop: $(`#${sectionId}`).offset().top
  }, 750);
}
const sideMenu = document.getElementById('sideMenu');
const sideMenuBtn = document.getElementById('sideMenuBtn');

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
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
}
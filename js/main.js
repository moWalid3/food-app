///
///

let nav = document.querySelector("nav");
let tabNav = document.querySelector(".tab-nav");
let tabNavLinks = [...tabNav.querySelectorAll("li")];
let togglerIcon = document.querySelector(".toggler-icon");


function openSideNav() {
  nav.style.left = `0px`;
  togglerIcon.firstElementChild.classList.add("d-none");
  togglerIcon.lastElementChild.classList.remove("d-none");

  for(let i = 0; i<tabNavLinks.length; i++) {
    tabNavLinks[i].style.top = "0";
    tabNavLinks[i].style.transition = `${400+(i*200)}ms`;
  }
}

closeSideNav();

function closeSideNav() {
  let tabNavWidth = getComputedStyle(tabNav).width;
  nav.style.left = `-${tabNavWidth}`;
  togglerIcon.firstElementChild.classList.remove("d-none");
  togglerIcon.lastElementChild.classList.add("d-none");

  for(let i = 0; i<tabNavLinks.length; i++) {
    tabNavLinks[i].style.top = "100%";
    tabNavLinks[tabNavLinks.length-(i+1)].style.transition = `${400+(i*200)}ms`;
  }
}

togglerIcon.addEventListener("click", () => {
  
  if(getComputedStyle(nav).left == "0px") {
    
    closeSideNav();
    
  } else {
    
    openSideNav()

  }

});



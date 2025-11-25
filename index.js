//when page is loaded/refereshed,go to top/homepage.
window.scrollTo(0, 0);

//navigation
function openSidebarBtn() {
  let sidebar = document.getElementById("sidebar");
  //add active state
  sidebar.classList.add("active");
}

function closeSidebarBtn() {
  let sidebar = document.getElementById("sidebar");
  //remove active state
  sidebar.classList.remove("active");
}

let openSidebar = document.getElementById("open-sidebar");
let closeSidebar = document.getElementById("close-sidebar");
// Show sidebar on menu button click
openSidebar.addEventListener("click", openSidebarBtn);

// Hide sidebar on close menu button click
closeSidebar.addEventListener("click", closeSidebarBtn);

// When sidebar menu option/link is clicked, hide it
function linkClosesSidebar() {
  let sidebar = document.getElementById("sidebar");
  // remove active state on sidebar
  sidebar.classList.remove("active");
}

let sidebarLink = document.querySelectorAll(".sidebarList");
//add an eventlistener for each sidebar link on click
sidebarLink.forEach(function (sidebarLink) {
  sidebarLink.addEventListener("click", linkClosesSidebar);
});

//dive deeper button

function downButton() {
  // Scroll the window down by 100vh smoothly
  let scrollDistance = window.innerHeight; //get height of window
  window.scrollBy({
    top: scrollDistance,
    left: 0,
    behavior: "smooth",
  });
}

//select down buttons
let scrollDownButton = document.querySelectorAll(
  ".deeper-btn, .midnight-deeper-btn"
);

// add event listener for each down button on click
scrollDownButton.forEach(function (scrollDownButton) {
  scrollDownButton.addEventListener("click", downButton);
});

//Typewriter effect

/*Got stuck and troubleshooted this with the help of AI. 
Couldnt figure out why each letter was not being added, just needed to use slice
Also needed help figuring out how to begin the looped function once and only once.
Used my existing code and asked this prompt: 
What do I need to add to my code to have each individual letter typed on the homepage one at a time and begin the function loop only once;*/

function typeMainText() {
  let homepageString = "The Ocean Is Deeper Than You Realise";
  let element = document.getElementById("homeh3");
  let textLength = 0; //star position of the string
  let typeDelay = 70; // time between each letter showing up
  let resetFuncTime = 5000; // reset function after certain amount of time
  let timerId = null; // cancel if needed - AI added

  function typeLoop() {
    // create loop to type next character in sentence if there are remaining characters
    if (textLength < homepageString.length) {
      //adding 1 letter to substring and looping it
      element.textContent = homepageString.slice(0, textLength + 1); //AI helped
      textLength++;

      //run function/type each letter after a little delay
      timerId = setTimeout(typeLoop, typeDelay);
      return;
    }

    // Once text is fully typed, reset it and repeat
    timerId = setTimeout(function () {
      element.textContent = ""; // clear text on screen
      textLength = 0; // reset position
      typeLoop(); // start typing again after delay
    }, resetFuncTime);
  }

  // Start the loop only once
  if (!timerId) typeLoop(); //AI helped
}

//call function
typeMainText();

// Flip Card
let card = document.getElementsByClassName("animalCard");

// on click, starting at the first card, flip card and apply this for all cards until there are none
for (let i = 0; i < card.length; i++) {
  card[i].addEventListener("click", function () {
    // On click toggle flip on cards
    this.classList.toggle("flip");

    //remove flip animation after a certain amount of time to ('this') the clicked card using arrow function
    setTimeout(() => {
      this.classList.remove("flip");
    }, 7500);
  });
}

//Side Nav dots

/*Troubleshooted this with the help of AI, 
I couldnt figure out why dots werent hiding on homepage, just needed to fix my fromTop 'if' statement. 
Used my existing code and asked this prompt: 
Why is my code not working, im trying to hide the dots on homepage */

//function to control nav dots
function updateNavDots() {
  let links = document.querySelectorAll(".nav-link");
  let nav = document.querySelector(".nav");

  // to help calculate which section is in view and light up corresponding dot
  let fromTop = window.scrollY + window.innerHeight / 2;

  // using arrow function to loop function through each link
  links.forEach((link) => {
    //find section that matches href of each dot
    let section = document.querySelector(link.getAttribute("href"));

    //dots light up when in corresponding section
    if (
      section.offsetTop <= fromTop && //if fromTop is < or = bottom of section and if - AI helped
      section.offsetTop + section.offsetHeight > fromTop //fromTop is less than section height - AI helped
    ) {
      link.classList.add("active"); //add active class to dot
    } else {
      //or else remove active class
      link.classList.remove("active");
    }
  });

  // when on hompage hide the nav dots

  // When past half way from the top of the homepage,
  if (window.scrollY < window.innerHeight / 2) {
    nav.style.opacity = "0"; //change opacity style to 0 to hide the dots
  } else {
    //or else keeps the dots visible
    nav.style.opacity = "1";
  }
}

//call function when on scroll and when page is loaded
window.addEventListener("scroll", updateNavDots);
window.addEventListener("load", updateNavDots);

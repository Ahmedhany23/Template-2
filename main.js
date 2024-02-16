let menu = document.querySelector("header nav ul");
let nav = document.querySelector("header nav .toggle-menu");
let landingpng = document.querySelector(".landing");
let arrowleft = document.querySelector(".fa-angle-left");
let arrowright = document.querySelector(".fa-angle-right");
let bullets = document.querySelectorAll(".bullets");
let middle = document.querySelector(".middle");
let first = document.querySelector(".first");
let last = document.querySelector(".last");
let btn = document.querySelector(".upe");
let dice = document.querySelector("#dice");

function updateDice() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomImageSource = "images/dice" + randomNumber + ".jpg";

  // Apply a CSS class to trigger the transition
  dice.classList.add("fade-out");

  setTimeout(function () {
    dice.setAttribute("src", randomImageSource);

    // Apply a CSS class to trigger the fade-in
    dice.classList.remove("fade-out");
    dice.classList.add("fade-in");

    var liElements = document.querySelectorAll("li");
    liElements[7].classList.toggle("active", randomNumber === 2);
    liElements[8].classList.toggle("active", randomNumber === 1);
    liElements[6].classList.toggle("active", randomNumber === 3);
  }, 500); // Set timeout to match the transition duration
}

setInterval(updateDice, 2000);

arrowright.onclick = updateDice;
arrowleft.onclick = updateDice;

window.onscroll = function () {
  if (window.scrollY >= 200) {
    btn.style.opacity = 0.5;
    if (window.scrollY >= 300) {
      btn.style.opacity = 1;
    }
  } else {
    btn.style.opacity = 0;
  }
};
btn.onclick = function() {window.scrollTo(
  {
      left:0,
      top:0,
      behavior: "smooth",
  }
);}

nav.addEventListener("click", function () {
  if (menu.style.display == "none") {
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.position = "absolute";
    menu.style.top = "100%";
    menu.style.right = "0%";
    menu.style.width = "30%";
    menu.style.backgroundColor = "rgb(0 0 0 / 50%)";
  } else {
    menu.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  function updatePortfolioContent(category) {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      const boxCategory = box.dataset.category;

      if (category === "All" || boxCategory === category) {
        box.style.display = "block";
        box.classList.add("active"); // Add the 'active' class
      } else {
        box.style.display = "none";
        box.classList.remove("active"); // Remove the 'active' class
      }
    });
  }

  // Call the update function with "All" initially
  updatePortfolioContent("All");

  // Add click event listeners to filter options
  const filterOptions = document.querySelectorAll(".shuffle li");
  filterOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedCategory = this.textContent;
      updatePortfolioContent(selectedCategory);

      // Optional: Highlight the selected filter option
      filterOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Add an event listener to the "See More" link if needed
  const moreLink = document.querySelector(".more");
  moreLink.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("See More clicked");
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateNumber(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.box').forEach(box => {
    observer.observe(box);
  });

  function updateNumber(box) {
    const numberElement = box.querySelector('.number');
    let currentNumber = 0;
    const finalNumber = parseFloat(box.dataset.finalNumber);

    const incrementInterval = setInterval(() => {
      currentNumber += 1;
      numberElement.textContent = currentNumber.toLocaleString();

      if (currentNumber >= finalNumber) {
        clearInterval(incrementInterval);
      }
    }, 1);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBar(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.prog-holder').forEach(holder => {
    observer.observe(holder);
  });

  function animateProgressBar(holder) {
    const progressBar = holder.querySelector('.prog span');
    let currentProgress = 0;
    const finalProgress = parseFloat(holder.dataset.finalProgress);

    const incrementInterval = setInterval(() => {
      currentProgress += 1;
      progressBar.style.width = currentProgress + '%';
      progressBar.dataset.progress = currentProgress + '%';

      if (currentProgress >= finalProgress) {
        clearInterval(incrementInterval);
      }
    }, 10);
  }
});
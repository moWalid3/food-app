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

/////////// contact form validation

let contactInputs = document.querySelectorAll(".contact-section input");

contactInputs.forEach(input => {

  input.addEventListener("focus",()=> {
    input.classList.remove("unfocus","border-0");
    if(!validationForm(input)) {
      input.classList.add("is-invalid");
    }
  })

  input.addEventListener("input",()=> {
    if(validationForm(input)) {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
    } else {
      input.classList.add("is-invalid")
      input.classList.remove("is-valid")
    }

    if(checkValidation()) {
      document.querySelector("#submit").classList.remove("disabled");
    } else {
      document.querySelector("#submit").classList.add("disabled");
    }
  })

})

function validationForm (input) {
  let id = input.getAttribute("id");
  if( id == "name" || id == "age" || id == "phone") {

    return (input.value.length >= 1);

  } else if (id == "email") {

    let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return reg.test(input.value);

  } else if (id == "password" ) {

    return (input.value.length >= 5);

  } else if (id == "repassword") {

    let passInput =  document.querySelector("#password");
    if(input.value == passInput.value && passInput.classList.contains("is-valid")) {
      return true;
    }

  }

  return false;
}

function checkValidation (){
  return [...contactInputs].every(input => input.classList.contains("is-valid"));
}


//////////// display meals 

let main = document.querySelector("main");

// searchByName();

async function searchByName(name = "") {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  res = await res.json();
  console.log(res.meals);
  displayMeals(res.meals);
}

function displayMeals(meals) {
  let box = `
    <h1 class="text-center text-uppercase">Meals</h1>
      <div class="row g-4">
  `;
  for(let i = 0; i < meals.length; i++) {
    box += `    
        <div class="col-xsm-6 col-md-6 col-lg-4 col-xl-3">
            <div class="item position-relative overflow-hidden rounded-1">
              <img
                class="img-fluid"
                src="${meals[i].strMealThumb}"
              />
              <div class="overlay p-4 d-flex align-items-end">
                <h3>${meals[i].strMeal}</h3>
              </div>
            </div>
        </div>
    `;  
  }
  box += `</div>`;
  main.innerHTML = box;
}


function displayCategories() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(res => res.json())
  .then(data => data.categories)
  .then(categories => {
    categories.length = categories.length - 2;
    
    let box = `
    <h1 class="text-center cat-head text-uppercase">Categories</h1>
      <div class="row g-4">
    `;
    
    for(let i = 0; i < categories.length; i++) {
      box += `    
          <div class="col-xsm-6 col-md-6 col-lg-4 col-xl-3">
              <div class="item text-center position-relative overflow-hidden rounded-1">
                <img
                  class="img-fluid"
                  src="${categories[i].strCategoryThumb}"
                />
                <div class="overlay d-flex flex-column justify-content-center p-2 pt-3">
                  <h3 class="mb-1" >${categories[i].strCategory}</h3>
                  <p>${categories[i].strCategoryDescription.toString().split(" ").slice(0, 10).join(" ")}...</p>
                </div>
              </div>
          </div>
      `;
    }

    box += `</div>`;
    main.innerHTML = box;
  })
}
displayArea();
function displayArea() {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  .then(res => res.json())
  .then(data => data.meals)
  .then(meals => {
    
    
    let box = `
    <h1 class="text-center text-uppercase">Area</h1>
      <div class="row g-4">
    `;
    
    for(let i = 0; i < meals.length; i++) {
      box += `    
          <div class="col-xsm-6 col-md-6 col-lg-4 col-xl-3">
              <div class="item area-item text-center position-relative overflow-hidden rounded-1">
                <span ><i class="fa-solid fa-3x fa-city"></i></span>
                <h3 class="mt-2" >${meals[i].strArea}</h3>
              </div>
          </div>
      `;
    }

    box += `</div>`;
    main.innerHTML = box;
  })
}


////////  customize transformation
document.querySelectorAll("nav ul a").forEach((link)=> {
  link.addEventListener("click", (e)=> {
    e.preventDefault();
    if(link.getAttribute("id") == "meals") {
      searchByName();
    } else if (link.getAttribute("id") == "categories") {
      displayCategories();
    } else if (link.getAttribute("id") == "area") {
      displayArea();
    }
  })
})

document.querySelector("#logo").addEventListener("click", (e)=> {
  e.preventDefault();
  searchByName();
})

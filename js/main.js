///
///

let spinner = document.querySelector(".spinner");
let nav = document.querySelector("nav");
let tabNav = document.querySelector(".tab-nav");
let tabNavLinks = [...tabNav.querySelectorAll("li")];
let togglerIcon = document.querySelector(".toggler-icon");
let main = document.querySelector("main");


document.addEventListener("DOMContentLoaded", () => {
  startSpinner ();
  closeSideNav();
  searchByName("","Daily Meals");
})

function startSpinner () {
  spinner.classList.replace("d-none", "d-flex");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    spinner.classList.replace("d-flex", "d-none");
    document.body.style.overflow = "auto";
  }, 500);
}

function sectionSpinner () {
  spinner.classList.replace("d-none", "d-flex");
  spinner.style.left = "72px";
  spinner.style.zIndex = 11;
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    spinner.classList.replace("d-flex", "d-none");
    document.body.style.overflow = "auto";
  }, 250);
}


function openSideNav() {
  nav.style.left = `0px`;
  togglerIcon.firstElementChild.classList.add("d-none");
  togglerIcon.lastElementChild.classList.remove("d-none");

  for(let i = 0; i<tabNavLinks.length; i++) {
    tabNavLinks[i].style.top = "0";
    tabNavLinks[i].style.transition = `${400+(i*200)}ms`;
  }
}

function closeSideNav() {
  // let tabNavWidth = getComputedStyle(tabNav).width;
  let tabNavWidth = "317.8px";
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


//////////// main side

async function searchByName(name = "", head = "") {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  res = await res.json();
  displayMeals(res.meals, head);
}

function displayMeals(meals, head) {
  let box = `
    <h1 class="text-center text-uppercase">${head}</h1>
      <div class="row g-4">
  `;
  for(let i = 0; i < meals?.length; i++) {
    box += `    
        <div class="col-xsm-6 col-md-6 col-lg-4 col-xl-3">
            <div onclick="displayMealDetails(${meals[i].idMeal})" class="item position-relative overflow-hidden rounded-1">
              <img
                class="img-fluid w-100"
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
  sectionSpinner();
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
              <div onclick="getCategoryMeals('${categories[i].strCategory}')" class="item text-center position-relative overflow-hidden rounded-1">
                <img
                  class="img-fluid"
                  src="${categories[i].strCategoryThumb}"
                />
                <div class="overlay d-flex flex-column justify-content-center p-2 pt-3">
                  <h3 class="mb-1 fs-4" >${categories[i].strCategory}</h3>
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
              <div onclick="getAreaMeals('${meals[i].strArea}')" class="item p-3 area-item text-center position-relative overflow-hidden rounded-1">
                <span ><i class="fa-solid fa-3x fa-city"></i></span>
                <h3 class="mt-2 mb-0" >${meals[i].strArea}</h3>
              </div>
          </div>
      `;
    }

    box += `</div>`;
    main.innerHTML = box;
  })
}

function displayIngredients() {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  .then(res => res.json())
  .then(data => data.meals)
  .then(meals => {
    meals.length = 20;
    
    let box = `
    <h1 class="text-center ing-head text-uppercase">Ingredients</h1>
      <div class="row g-4 ">
    `;
  
    for(let i = 0; i < meals.length; i++) {  
      box += `    
          <div class="col-xsm-6 col-md-6 col-lg-4 col-xl-3">
              <div onclick="getIngredientsMeals('${meals[i].strIngredient}')" class="item p-3 ing-item text-center position-relative overflow-hidden rounded-1">
                <span ><i class="fa-solid fa-3x fa-cookie-bite"></i></span>
                <h3 class="mt-2 mb-2" >${meals[i].strIngredient}</h3>
                <p class="mb-0">${meals[i].strDescription.split(" ").slice(0, 15).join(" ")}...</p>
              </div>
          </div>
      `;
    }

    box += `</div>`;
    main.innerHTML = box;
  })
}


async function getCategoryMeals(categoryName) {
  sectionSpinner();
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
  res = await res.json();
  displayMeals(res.meals, categoryName);
}

async function getAreaMeals(area) {
  sectionSpinner();
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  res = await res.json();
  displayMeals(res.meals, area);
}

async function getIngredientsMeals(name) {
  sectionSpinner();
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
  res = await res.json();
  displayMeals(res.meals, name);
}

function displayMealDetails(id) {
  sectionSpinner();
  document.querySelector(".search-section").innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then(res => res.json())
  .then(data => data.meals[0])
  .then(meal => {
    
    let recipes = "";
    let tags = "";

    if(meal.strTags == null) {
      tags += `<p class="mb-0 h5 fw-light">There are no tags</p>`;
    } else {
      for (const tag of meal.strTags.split(",")) {
        tags += `<span>${tag}</span>`
      }
    }

    let i = 1;
    while (meal[`strIngredient${i}`] != 0) {
      recipes += `<span>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`
      i++;
    }

    let box = `
      <div class="row meal-details pt-5">
        <div class="col-lg-4">
          <img
            class="img-fluid w-100 rounded-1"
            src="${meal.strMealThumb}"
          />
          <h1 class="mt-2 mb-4 h2">${meal.strMeal}</h1>
        </div>
        <div class="col-lg-8">
          <h3>Instructions</h3>
          <p class="mb-3">${meal.strInstructions}</p>
          <div class="d-flex align-items-center mb-3">
            <h3 class="mb-0">Area :</h3>
            <p class="mb-0 ms-2 h5 fw-light">${meal.strArea}</p>
          </div>
          <div class="d-flex align-items-center mb-3">
            <h3 class="mb-0">Category :</h3>
            <p class="mb-0 ms-2 h5 fw-light">${meal.strCategory}</p>
          </div>
          <div class="mb-4 recipes d-flex">
            <h3  class="me-2 pe-2 mb-0">Recipes<span class="ms-2 semicolon">:</span></h3>
            <div class="d-flex gap-2 flex-wrap">
              ${recipes}
            </div>
          </div>
          <div class="mb-4 d-flex align-items-center gap-2 flex-wrap tags">
            <h3 class="mb-0 me-2">Tags :</h3>
            ${tags}
          </div>
          <button class="btn btn-success me-2">
            <a href="${meal.strSource}" target="_blank">Source</a>
          </button>
          <button class="btn btn-danger">
            <a href="${meal.strYoutube}" target="_blank">Youtube</a>
          </button>
        </div>
      </div>
    `

    main.innerHTML = box;
  })
}


function searchSection() {

  main.innerHTML = "";

  document.querySelector(".search-section").innerHTML = `
    <div class=" section-padding pt-5 pb-0  container-fluid  d-flex flex-column flex-md-row gap-4">
      <input oninput="searchByName(this.value)" id="searchByName" type="text" class="form-control shadow-none bg-transparent border-0" placeholder="Search By Name">
      <input oninput="searchByFirstLetter(this.value)" maxlength="1" type="text" class="form-control shadow-none bg-transparent border-0" placeholder="Search By First Letter...">
    </div>
  `;
}

function searchByFirstLetter(name) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
  .then(res => res.json())
  .then(data => displayMeals(data.meals, "") );
}


function displayContact() {
  main.innerHTML = `
      <h1 class="mb-5 text-center">Contact Us</h1>
        <form class="row contact-section gx-4 gy-4  mx-auto">
          <div class="col-md-6">
            <input type="text" id="name" class="form-control py-2 border-0 unfocus bg-transparent shadow-none" placeholder="Enter Your Name"  required>
            <div class="invalid-feedback">
              Enter Valid Name.
            </div>
          </div>
          <div class="col-md-6">
            <input type="email" id="email" class="form-control py-2 border-0 unfocus bg-transparent shadow-none" placeholder="Your Email"  required>
            <div class="invalid-feedback">
              Enter Valid Email.
            </div>
          </div>
          <div class="col-md-6">
            <input type="tel" id="phone" class="form-control py-2 border-0 unfocus bg-transparent shadow-none" placeholder="Your Phone"  required>
            <div class="invalid-feedback">
              Enter Valid Phone.
            </div>
          </div>
          <div class="col-md-6">
            <input type="number" id="age" min="1" class="form-control py-2 border-0 unfocus bg-transparent shadow-none" placeholder="Enter Your Age"  required>
            <div class="invalid-feedback">
              Enter Valid Age.
            </div>
          </div>
          <div class="col-md-6">
            <input type="password" id="password" class="form-control py-2 border-0 unfocus bg-transparent shadow-none" placeholder="Enter Password"  required>
            <div class="invalid-feedback">
              Password Must Contain at lest 5 character.
            </div>
          </div>
          <div class="col-md-6">
            <input type="password" id="repassword" class="form-control py-2 border-0 unfocus bg-transparent shadow-none" placeholder="Enter RePassword"  required>
            <div class="invalid-feedback">
              Enter the same password again.
            </div>
          </div>
  
          <div class="col-12 text-center">
            <button id="submit" class="btn btn-outline-warning disabled mt-2" type="submit">Submit</button>
          </div>
        </form>
  `

  startValidation ();
}

/////////// contact form validation

function startValidation () {
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
        input.classList.replace("is-invalid", "is-valid");
        } else {
        input.classList.replace("is-valid", "is-invalid");
      }

      if(checkValidation()) {
        document.querySelector("#submit").classList.remove("disabled");
      } else {
        document.querySelector("#submit").classList.add("disabled");
      }

    })

  })
}

function validationForm (input) {
  let id = input.getAttribute("id");

  if( id == "name" ) {

    let reg = /^[a-zA-Z\s-]+$/;
    return reg.test(input.value);

  } else if (id == "email") {

    let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return reg.test(input.value);

  } else if (id == "phone" ) {

    let reg = /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/;
    return reg.test(input.value);
    
  } else if (id == "age" ) {

    let reg = /^\S[0-9]{0,1}$/;
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
  let contactInputs = document.querySelectorAll(".contact-section input");
  return [...contactInputs].every(input => input.classList.contains("is-valid"));
}


////////  customize transformation
document.querySelectorAll("nav ul a").forEach((link)=> {
  link.addEventListener("click", (e)=> {
    commonActionAtLinkClick(e);

    let id = link.getAttribute("id");

    switch (id) {
      case "meals":
        searchByName("", "Daily Meals");
        break;
      case "categories":
        displayCategories();
        break;
      case "area":
        displayArea();
        break;
      case "ingredients":
        displayIngredients();
        break;
      case "search":
        searchSection();
        break;
      case "contact":
        displayContact();
        break;
    
      default:
        break;
    }

  })
})

document.querySelector("#logo").addEventListener("click", (e)=> {
  searchByName("", "Daily Meals");
  commonActionAtLinkClick(e);
})

function commonActionAtLinkClick(e) {
  e.preventDefault();
  closeSideNav();
  sectionSpinner();
  document.querySelector(".search-section").innerHTML = "";
}

main.addEventListener("click",() => closeSideNav());
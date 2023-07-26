$(document).ready(function () {
   $('#loading').fadeOut(2000, function () {
      $('body').css('overflow', 'visible')
   })
});


let wMenuNav = $('#menuNav').outerWidth();
let meals = [];
let mealsShN = [];
let mealsShL = [];
let Tags = [];
let indexmeal = '';

/* navBar */
$('#btnOpenNav').click(function () {
   if ($('#openNav').css('left') == '0px') {
      $('#openNav').animate({ 'left': wMenuNav }, 1000)
      $('#menuNav').animate({ 'left': 0 }, 1000)
      $('.nav-category').animate({ paddingTop: "20px" }, 1200)
      $('#btnOpenNav').removeClass('fa-align-justify').addClass(' fa-align-justify fa-times')
   } else {
      $('#openNav').animate({ 'left': 0 }, 1000)
      $('#menuNav').animate({ 'left': -wMenuNav }, 1000)
      $('.nav-category').animate({ paddingTop: "-20px" }, 1200)
      $('#btnOpenNav').removeClass('fa-align-justify fa-times').addClass('fa-align-justify')
   }
});

/* dif */
difmain()
async function difmain() {
   await dif()
   await displaydif()
}

async function dif() {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
   var sMeals = await pMeals.json();
   meals = sMeals.meals
   console.log(meals)


}

async function displaydif() {
   let cartona = ""
   for (var i = 0; i < meals.length; i++) {
      cartona += `
   <div class="col-md-6 col-lg-3 ">
       <div class="   position-relative m-3 meal-item ">
               <img src="${meals[i].strMealThumb}" class="  w-100" alt="">
               <div class='filter-meals-item d-flex justify-content-center align-content-center'>
               <h2 class="text-black text-center name-meal">${meals[i].strMeal}</h2>
               </div>
           </div>
       </div>
   </div>`
   }

   $('#disPlay').html(cartona)
   $('.filter-meals-item').click(function () {
      let name = $(this).children().text();
      console.log(name)
      getInfo(name)
   }
   )
}
/* Info */
async function getInfo(i) {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`)
   var sMeals = await pMeals.json();
   console.log(sMeals.meals[0])
   let meals = sMeals.meals[0]


   displayClickMeal(i, meals.strInstructions, meals.strArea, meals.strCategory
      , meals.strMealThumb, meals.strTags, meals.strSource, meals.strYoutube)

   if (meals.strTags != null) {
      gettage(meals.strTags)
   } else { $('#listtages').html("") }

   displayRecipes(meals)

}

function displayRecipes(meal) {
   let recipes = ""
   for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
         recipes += `<li class="my-3 list-group-item-info list-unstyled d-inline-block mx-1 p-1 alert-success rounded">
           ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }
      $('#Recipes').html(recipes)
   }
}


async function gettage(tage) {
   Tags = tage.split(",");
   let tag = '<h2  class="my-3">Tags :</h2>'
   for (let i = 0; i < Tags.length; i++) {
      tag += `<p  class="my-3 m-2 p-1 text-danger btn btn-light rounded ">${Tags[i]} </p>`
      $('#listtages').html(tag)
   }
}

async function displayClickMeal(name, strInstructions, Area, Category, image, tage, Sourse, Youtube) {

   let cartona = `
   <section class="container">
   <div class=" row ">
   <div class="img col-4">
   <img class="w-100" src="${image}" alt="">
   <br>
   <h2 class="text-white mt-3">${name}</h2>
   </div>

<div class="info text-white col-8">
<div class="w-100">
<h2>Instructions</h2>
<div class="d-flex justify-content-center">
<p>${strInstructions}</p></div></div>
<br>
<p>Area : <span>${Area}</span></p>
<p>Category : <span>${Category}</span></p>
<br><br>
<h2 class="mt-3">Recipes :</h2>
<ul id ="Recipes">
</ul>
<br><br>
<div id="listtages">
<h2  class="my-3">Tags :</h2>
<div id="tags"></div>
</div>


<br><br><br>
<button  type="button" class="btn btn-success"><a class="link-light text-decoration-none "href="${Sourse}">Sourse</a></button>
<buttontype="button" class="btn btn-danger"><a  class="link-light text-decoration-none" href="${Youtube}">Youtube</a></button>
</div>
</div>


   </div>
   </section>`

   $('#disPlay').html('')
   $('#view').html(cartona)
}





/* Search */
$('#Search').click(function () {

   $('#openNav').animate({ 'left': 0 }, 1000)
   $('#menuNav').animate({ 'left': -wMenuNav }, 1000)
   $('.nav-category').animate({ paddingTop: "-20px" }, 1200)
   $('#btnOpenNav').removeClass('fa-align-justify fa-times').addClass('fa-align-justify')

   let cartona = `
   <section class=" w-100" >
   <div class=" d-flex justify-content-between">
   <div class="col-5">
          <input id="searchName" placeholder="Search By Name" type="text" class=" p-2 bg-black text-white inputSearh w-100 ">
          </div>

          <div class="col-5">
          <input id="searchFrtL" placeholder="Search By Frist Letter.." type="text" class=" p-2 bg-black text-white inputSearh w-100 ">
          </div>
          </div>

          <div class="container"> 
          <div id="displaySearch"  class="row ">
          </div>
          </div>

   </section>
   `
   $('#view').html(cartona)
   $('#searchName').keyup(function (a) {
      SearchN(a.target.value)
   })
   $('#searchFrtL').keyup(function (a) {
      SearchL(a.target.value)
   })


})

async function SearchL(i) {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${i}`)
   var sMeals = await pMeals.json();
   let meals = sMeals.meals
   desplaySearchL(meals)
}
    function desplaySearchL(meals) {
   let cartona = ""
   for (let i = 0; i < meals.length; i++) {
      cartona += `
   <div class="col-md-6 col-lg-3 ">
       <div class=" position-relative m-3 meal-item ">
               <img src="${meals[i].strMealThumb}" class="  w-100" alt="">
               <div class='filter-meals-item d-flex justify-content-center align-content-center '>
               <h2 class="text-black text-center name-meal">${meals[i].strMeal}</h2>
               </div>
           </div>
       </div>
   </div>`
   }

   $('#displaySearch').html(cartona);
   $('.filter-meals-item').click(function () {
      let name = $(this).children().text();
      getInfo(name)
   })
}

async function SearchN(i) {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`)
   var sMeals = await pMeals.json();
   let meals = sMeals.meals
   desplaySearchN(meals)
}
async function desplaySearchN(meals) {
   let cartona = ""
   for (let i = 0; i < meals.length; i++) {
      cartona += `
   <div class="col-md-6 col-lg-3 ">
       <div class=" position-relative m-3 meal-item ">
               <img src="${meals[i].strMealThumb}" class="  w-100" alt="">
               <div class='filter-meals-item d-flex justify-content-center align-content-center '>
               <h2 class="text-black text-center name-meal">${meals[i].strMeal}</h2>
               </div>
           </div>
       </div>
   </div>`
   }

   $('#displaySearch').html(cartona);
   $('.filter-meals-item').click(function () {
      let name = $(this).children().text();
      getInfo(name)
   })
}

/* Categories */
$('#Categories').click(function () {

   $('#openNav').animate({ 'left': 0 }, 1000)
   $('#menuNav').animate({ 'left': -wMenuNav }, 1000)
   $('.nav-category').animate({ paddingTop: "-20px" }, 1200)
   $('#btnOpenNav').removeClass('fa-align-justify fa-times').addClass('fa-align-justify')
   getCategories()
   let cartona = `
   <section class=" w-100" >

          <div class="container"> 
          <div id="displayCategories"  class="row ">
          </div>
          </div>


   </section>
   `

   $('#view').html(cartona)
})

async function getCategories() {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
   var sMeals = await pMeals.json();
   let categories = sMeals.categories
   displayCategories(categories)
}

async function displayCategories(meals) {
   let cartona = "";
   for (let i = 0; i < meals.length; i++) {
      cartona += `
      <div class="col-md-6 col-lg-3 ">
          <div class=" position-relative m-3 meal-item ">
                  <img src="${meals[i].strCategoryThumb}" class="  w-100" alt="">
                  <div class='filter-meals-item '>
                  <div>
                  <h2 class="text-black text-center name-meal text-center">${meals[i].strCategory}</h2>
                  <p class="text-black text-center name-meal">${meals[i].strCategoryDescription}</p>
                  </div>
                  </div>
              </div>
          </div>
      </div>`
   }
   $('#displayCategories').html(cartona);

   $('.filter-meals-item').click(function () {
      let name = $(this).find('h2').text();
      getListCg(name)
   })
}

async function getListCg(i) {
   var pList = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${i}`)
   var sList = await pList.json();
   arraylist = sList.meals;
   choosedCategories(arraylist)
}
async function choosedCategories(arraylist) {
   let cartona = ""
   for (let i = 0; i < arraylist.length; i++) {
      cartona += `
   <div class="col-md-6 col-lg-3 ">
       <div class=" position-relative m-3 meal-item ">
               <img src="${arraylist[i].strMealThumb}" class="  w-100" alt="">
               <div class='filter-meals-item d-flex justify-content-center align-content-center '>
               <h2 class="text-black text-center name-meal">${arraylist[i].strMeal}</h2>
               </div>
           </div>
       </div>
   </div>`
   }

   $('#displayCategories').html(cartona);
   $('.filter-meals-item').click(function () {
      let name = $(this).children().text();
      getInfo(name)
   })
}

/* Area */
$('#Area').click(function () {

   $('#openNav').animate({ 'left': 0 }, 1000)
   $('#menuNav').animate({ 'left': -wMenuNav }, 1000)
   $('.nav-category').animate({ paddingTop: "-20px" }, 1200)
   $('#btnOpenNav').removeClass('fa-align-justify fa-times').addClass('fa-align-justify')
   getAreas()
   let cartona = `
   <section class=" w-100" >

          <div class="container"> 
          <div id="displayAreas"  class="row ">
          </div>
          </div>


   </section>
   `

   $('#view').html(cartona)
})
async function getAreas() {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   var sMeals = await pMeals.json();
   console.log(sMeals)
   let Area = sMeals.meals
   displayArea(Area)
}
async function displayArea(Area) {
   let cartona = "";
   for (let i = 0; i < Area.length; i++) {
      cartona += `
      <div class="col-md-6 col-lg-3 ">
          <div class="  m-3 meal-item ">
                  <div class="area">
                  <i class="text-center fa-solid w-100 text-danger fa-city fa-3x"></i>
                  <h2 class=" text-white text-center name-meal text-center">${Area[i].strArea}</h2>
                  </div>
                  
              </div>
          </div>
      </div>`
   }
   $('#displayAreas').html(cartona);

   $('.area').click(function () {
      let name = $(this).find('h2').text();
      getAreaMeals(name)
   })
}

async function getAreaMeals(name) {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
   var sMeals = await pMeals.json();
   let AreaMeals = sMeals.meals
   console.log(AreaMeals)
   displayAreaMeals(AreaMeals)
}
async function displayAreaMeals(AreaMeals) {
   let cartona = "";
   for (let i = 0; i < AreaMeals.length; i++) {
      cartona += `<div class="col-md-6 col-lg-3 ">
      <div class=" position-relative m-3 meal-item ">
              <img src="${AreaMeals[i].strMealThumb}" class="  w-100" alt="">
              <div class='filter-meals-item d-flex justify-content-center align-content-center '>
              <h2 class="text-black text-center name-meal">${AreaMeals[i].strMeal}</h2>
              </div>
          </div>
      </div>
  </div>`
   }

   $('#displayAreas').html(cartona);
   $('.filter-meals-item').click(function () {
      let name = $(this).children().text();
      getInfo(name)
   })
}

/* Ingredients */
$('#Ingredients').click(function () {

   $('#openNav').animate({ 'left': 0 }, 1000)
   $('#menuNav').animate({ 'left': -wMenuNav }, 1000)
   $('.nav-category').animate({ paddingTop: "-20px" }, 1200)
   $('#btnOpenNav').removeClass('fa-align-justify fa-times').addClass('fa-align-justify')
   getIngredients()
   let cartona = `
   <section class=" w-100" >

          <div class="container"> 
          <div id="displayIngredients"  class="row ">
          </div>
          </div>


   </section>
   `

   $('#view').html(cartona)
})
async function getIngredients() {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   var sMeals = await pMeals.json();
   let Ingredients = sMeals.meals
   displayIngredients(Ingredients)
}
async function displayIngredients(meals) {
   let cartona = "";
   for (let i = 0; i < meals.length; i++) {
      cartona += `
      <div class="col-md-6 col-lg-3 ">
          <div class="  m-3 meal-item ">
                  <div class="area">
                  <i class="fa-solid fa-bowl-food text-success text-center w-100 fa-3x"></i>
                  <h2 class=" text-white text-center name-meal text-center">${meals[i].strIngredient}</h2>
                  </div>
                  
              </div>
          </div>
      </div>`
   }
   $('#displayIngredients').html(cartona);

   $('.area').click(function () {
      let name = $(this).find('h2').text();
      getIngredientsMeals(name)
   })
}

async function getIngredientsMeals(name) {
   var pMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
   var sMeals = await pMeals.json();
   let AreaMeals = sMeals.meals
   displayIngredientsMeals(AreaMeals)
}
async function displayIngredientsMeals(AreaMeals) {
   let cartona = "";
   for (let i = 0; i < AreaMeals.length; i++) {
      cartona += `<div class="col-md-6 col-lg-3 ">
      <div class=" position-relative m-3 meal-item ">
              <img src="${AreaMeals[i].strMealThumb}" class="  w-100" alt="">
              <div class='filter-meals-item d-flex justify-content-center align-content-center '>
              <h2 class="text-black text-center name-meal">${AreaMeals[i].strMeal}</h2>
              </div>
          </div>
      </div>
  </div>`
   }

   $('#displayIngredients').html(cartona);
   $('.filter-meals-item').click(function () {
      let name = $(this).children().text();
      getInfo(name)
   })
}

/* ContactUs */

$('#ContactUs').click(function () {

   $('#openNav').animate({ 'left': 0 }, 1000)
   $('#menuNav').animate({ 'left': -wMenuNav }, 1000)
   $('.nav-category').animate({ paddingTop: "-20px" }, 1200)
   $('#btnOpenNav').removeClass('fa-align-justify fa-times').addClass('fa-align-justify')

   let cartona = `
   <div>
   <div class=" d-flex justify-content-center">
   <div class="col-6 p-2 ">
          <input id="Name" placeholder="Enter Your Name" type="text" class=" p-2 bg-black text-white inputSearh w-100 my-3 ">
          <div id="alrtName" class="d-none text-danger Alert">  You have to start with it upperlitter  </div>
          <br>
          <input id="Phone" placeholder="Enter Phone" type="number" class=" p-2 bg-black text-white inputSearh w-100 my-3">
          <div id="alrtPhone" class="d-none text-danger Alert">  Enter valid Phone Number </div>
          <br>
          <input id="Password" placeholder="Enter Password" type="Password" class=" p-2 bg-black text-white inputSearh w-100 my-3">
          <div id="alrtPassword" class="d-none text-danger Alert"> Enter valid password *Minimum eight characters, at least one letter and one number:* </div>
          </div>

          <div class="col-6 p-2">
          <input id="Email" placeholder="Enter Email" type="email" class=" p-2 bg-black text-white inputSearh w-100 my-3">
          <div id="alrtEmail" class="d-none text-danger Alert"> Enter valid email. *Ex: xxx@yyy.zzz  </div>
          <br>
          <input id="Age" placeholder="Enter Age" type="number" class=" p-2 bg-black text-white inputSearh w-100 my-3">
          <div id="alrtAge" class="d-none text-danger Alert">Enter valid Age  </div>
          <br>
          <input id="RePassword" placeholder="Enter RePassword" type="Password" class=" p-2 bg-black text-white inputSearh w-100 my-3">
          <div id="alrtRePassword" class="d-none text-danger Alert"> not matshed  </div>
          </div>
          </div>

          <div class="container d-flex justify-content-center w-100"> 
          <button type="button" id="signUp" class="btn btn-danger"><a  class="link-light text-decoration-none visibility-hidden " >submit</a></button>
          </div>
          </div>

   `
   $('#view').html(cartona)

   /* .......validation...... */
   let nameInput = document.getElementById('Name');
   let emailInput = document.getElementById('Email');
   let phoneInput = document.getElementById('Phone');
   let ageInput = document.getElementById('Age');
   let passwordInput = document.getElementById('Password');
   let rePasswordInput = document.getElementById('RePassword');

   let nameAlert = document.getElementById('alrtName');
   let emailAlert = document.getElementById('alrtEmail');
   let phoneAlert = document.getElementById('alrtPhone');
   let ageAlert = document.getElementById('alrtAge');
   let passwordAlert = document.getElementById('alrtPassword');
   let rePasswordAlert = document.getElementById('alrtRePassword');
   let signUpBtm = document.getElementById('signUp')
   let Alert = document.getElementsByClassName('Alert')

   nameInput.onkeyup = function () {
      var nameRejex = /[a-z A-Z]{1,20}$/
      if ($('#Name').val().match(nameRejex)) {
         nameInput.classList.add('is-valid');
         nameInput.classList.remove('is-invalid');
         signUpBtm.classList.remove('d-none');


      }
      else {
         alertName.classList.remove('d-none');
         nameInput.classList.add('is-invalid');
         nameInput.classList.remove('is-valid');
         nameAlert.classList.remove('d-none');
         signUpBtm.classList.add('d-none');
      }
   }

   phoneInput.onkeyup = function () {
      var nameRejex = /^01[0125][0-9]{8}$/
      if ($('#Phone').val().match(nameRejex)) {
         phoneInput.classList.add('is-valid');
         phoneInput.classList.remove('is-invalid');
         phoneAlert.classList.add('d-none')
         signUpBtm.classList.remove('d-none');


      }
      else {
         phoneInput.classList.add('is-invalid');
         phoneInput.classList.remove('is-valid');
         phoneAlert.classList.remove('d-none')
         signUpBtm.classList.add('d-none');
      }
   }

   passwordInput.onkeyup = function () {
      var nameRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if ($('#Password').val().match(nameRejex)) {
         passwordInput.classList.add('is-valid');
         passwordInput.classList.remove('is-invalid');
         passwordAlert.classList.add('d-none')
         signUpBtm.classList.remove('d-none');


      }
      else {
         passwordInput.classList.add('is-invalid');
         passwordInput.classList.remove('is-valid');
         passwordAlert.classList.remove('d-none')
         signUpBtm.classList.add('d-none');
      }
   }

   emailInput.onkeyup = function () {
      var nameRejex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if ($('#Email').val().match(nameRejex)) {
         emailInput.classList.add('is-valid');
         emailInput.classList.remove('is-invalid');
         emailAlert.classList.add('d-none')
         signUpBtm.classList.remove('d-none');


      }
      else {
         emailInput.classList.add('is-invalid');
         emailInput.classList.remove('is-valid');
         emailAlert.classList.remove('d-none')
         signUpBtm.classList.add('d-none');
      }
   }

   ageInput.onkeyup = function () {
      var nameRejex = /^[1-9]?[0-9]{1}$|^100$/
      if ($('#Age').val().match(nameRejex)) {
         ageInput.classList.add('is-valid');
         ageInput.classList.remove('is-invalid');
         ageAlert.classList.add('d-none')
         signUpBtm.classList.remove('d-none');
         x = +1;

      }
      else {
         ageInput.classList.add('is-invalid');
         ageInput.classList.remove('is-valid');
         ageAlert.classList.remove('d-none')
         signUpBtm.classList.add('d-none');
      }
   }

   rePasswordInput.onkeyup = function () {
      var nameRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if ($('#Password').val().match($('#RePassword').val())) {
         rePasswordInput.classList.add('is-valid');
         rePasswordInput.classList.remove('is-invalid');
         rePasswordAlert.classList.add('d-none')
         signUpBtm.classList.remove('d-none');


      }
      else {
         rePasswordInput.classList.add('is-invalid');
         rePasswordInput.classList.remove('is-valid');
         rePasswordAlert.classList.remove('d-none')
         signUpBtm.classList.add('d-none');
      }
   }

   signUpBtm.onclick = function () {
      if ($('.Alert').addClass('d-none')) {
         alert('error')
      } else {
         $('#signUp').css({ 'opacity': '1' })
         alert('hi')
      }

   }
})
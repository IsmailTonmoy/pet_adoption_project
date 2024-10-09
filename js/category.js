const loadCategories = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));

};

const removeActiveClass =()=>{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove("active");
    }
};

const loadPetCategories = (category) => {
    //  alert(id);

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${category}`);
        // console.log(activeBtn)
        activeBtn.classList.add("active");
        displayPets(data.data);
    })
    .catch((error) => console.log(error));

};



const displayCategories = (data) => {

 const categoryContainer= document.getElementById("p-categories")
//  petsProfileCon.innerHTML=""
  data.forEach ((item) => {

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML= `
    <button id="btn-${item.category}" onclick="loadPetCategories('${item.category}')" class="btn category-btn">
    <img src="${item.category_icon}" alt="${item.category}" width="30" height="30" />
   ${item.category}
    </button>

    `


    //  const button = document.createElement("button");
    //  button.classList ="btn";
    //  button.innerHTML=`
    //   <img src="${item.category_icon}" alt="${item.category}" width="30" height="30" />
    //   ${item.category}
    // `       
     

    //  add button
     categoryContainer.append(buttonContainer);

  });

};
const loadLikeDetails= async (petId) =>{
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data =await res.json();
    displayLikePet(data.petData);

};
const displayLikePet =(petData) =>{
    const petLikeC = document.getElementById("likePet");
    const newLikeC = document.createElement("div");
    newLikeC.innerHTML=`
    <img
      src=${petData.image}
      alt="Shoes"
      class="rounded-xl" />
    `
    ;
    petLikeC.append(newLikeC);
}

const loadPetDetails= async (petId) =>{
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data =await res.json();
    displayPetdetails(data.petData);

};

const displayPetdetails =(petData) =>{
const petDetailsC = document.getElementById("modalDetails");
petDetailsC.innerHTML= `<img
      src=${petData.image}
      alt="Shoes"
      class="rounded-xl" />
      <h2 class="card-title"> ${petData.pet_name}</h2>
  <p><i class="fa-solid fa-table-list"></i> Breed:${petData.breed === undefined ? "Not Available": petData.breed}</p>
  <p><i class="fa-solid fa-calendar-days"></i> Birth:${petData.date_of_birth }</p>
  <p><i class="fa-solid fa-mercury"></i> Gender:${petData.gender}</p>
  <p><i class="fa-solid fa-tags"></i> Price:${petData.price}</p>
   <p><i class="fa-solid fa-syringe"></i> Vaccinated status:${petData.vaccinated_status}</p>
    <div class="divider"></div>
   <p>Details Information</p>
   <p>${petData.pet_details}</p>
`
document.getElementById("showData").click();
};

const loadPetsProfile = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/pets ")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));

};

const displayPets = (pets) => {
    const petsProfileCon = document.getElementById("petsPro");
    petsProfileCon.innerHTML=""

    if(pets.length == 0){
        petsProfileCon.classList.remove("grid");
        petsProfileCon.innerHTML=`<div class ="w-full h-96 text-center  shadow-xl"> 
        <img class= "w-40 mx-auto pt-6" src="images/error.webp" alt="" />
        <h2 class=" text-3xl font-bold "> "No Information Available"</h2>
        <p class= "w-10/12 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
          </div>
        `
        return;
    }else{
        petsProfileCon.classList.add("grid");
    }
     

    pets.forEach((pets) => {

        const card = document.createElement("div");
        card.classList="card bg-base-100 w-78 shadow-xl"
        card.innerHTML=`<figure class="px-4 pt-4">
    <img
      src=${pets.image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="p-4">
  <h2 class="card-title"> ${pets.pet_name}</h2>
  <p><i class="fa-solid fa-table-list"></i> Breed:${pets.breed === undefined ? "Not Available": pets.breed}</p>
  <p><i class="fa-solid fa-calendar-days"></i> Birth:${pets.date_of_birth }</p>
  <p><i class="fa-solid fa-mercury"></i> Gender:${pets.gender}</p>
  <p><i class="fa-solid fa-tags"></i> Price:${pets.price}</p>
    <div class="divider"></div>
    <div class="card-actions flex justify-around">
    <button onclick="loadLikeDetails(${pets.petId})" class="btn btn-outline"><i class="fa-regular fa-thumbs-up"></i></button>
    <button class="btn btn-outline text-lime-600 font-bold">Adopt</button>
    <button onclick="loadPetDetails(${pets.petId})"  class="btn btn-outline text-lime-600 font-bold">Details</button>
    </div>
  </div>
        `
        petsProfileCon.append(card)

    })
   };

   document.getElementById('sortPets').addEventListener('click',(e)=>{
    sortPetsPrice();

})

function sortPetsPrice(){
    fetch("https://openapi.programming-hero.com/api/peddy/pets ")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets.sort((a,b)=>b.price-a.price)))
    .catch((error) => console.log(error));

}

   
   
loadCategories();
loadPetsProfile()



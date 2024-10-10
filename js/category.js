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
    const spinner = document.getElementById("loading-spinner");
    const petSection = document.getElementById("petsPro");
  
    spinner.classList.remove("hidden");
    petSection.classList.add("hidden");
  
    setTimeout(() => {
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          removeActiveClass();
          const activeBtn = document.getElementById(`btn-${category}`);
          activeBtn.classList.add("active");

          spinner.classList.add("hidden");
          petSection.classList.remove("hidden");
  
          displayPets(data.data);
        })
        .catch((error) => {
          console.log(error);
          spinner.classList.add("hidden");
          petSection.classList.remove("hidden");
        });
    }, 2000); 
   
  };

const displayCategories = (data) => {

 const categoryContainer= document.getElementById("p-categories")

  data.forEach ((item) => {

    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "";
    buttonContainer.innerHTML= `
    <button id="btn-${item.category}" onclick="loadPetCategories('${item.category}')" class="btn w-72  lg:w-40 h-14 text-xl category-btn ">
    <img src="${item.category_icon}" alt="${item.category}" class="w-10" />
   ${item.category}
    </button>

    `


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
      class="rounded-md w-40" />
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
      class="rounded-xl w-full h-72" />
      <h2 class="card-title pt-4"> ${petData.pet_name}</h2>
  <p><i class="fa-solid fa-table-list"></i> Breed:${petData.breed ?? "Not Available"}</p>
  <p><i class="fa-solid fa-calendar-days"></i> Birth:${petData.date_of_birth === undefined || petData.date_of_birth === null ? "Not Available": petData.date_of_birth }</p>
  <p><i class="fa-solid fa-mercury"></i> Gender:${petData.gender === undefined  ? "Not Available": petData.gender}</p>
  <p><i class="fa-solid fa-tags"></i> Price:${petData.price === undefined || petData.price === null  ? "Not Available":petData.price}</p>
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
      class="rounded-xl w-72 h-44" />
  </figure>
  <div class="p-4">
  <h2 class="card-title"> ${pets.pet_name}</h2>
  <p><i class="fa-solid fa-table-list"></i> Breed:${pets.breed === undefined ? "Not Available": pets.breed}</p>
  <p><i class="fa-solid fa-calendar-days"></i> Birth:${pets.date_of_birth === undefined || pets.date_of_birth === null  ? "Not Available": pets.date_of_birth }</p>
  <p><i class="fa-solid fa-mercury"></i> Gender:${pets.gender === undefined ? "Not Available": pets.gender}</p>
  <p><i class="fa-solid fa-tags"></i> Price:$${pets.price === undefined || pets.price === null  ? "Not Available":pets.price}</p>
    <div class="divider"></div>
    <div class="card-actions flex justify-around">
    <button onclick="loadLikeDetails(${pets.petId})" class="btn btn-outline"><i class="fa-regular fa-thumbs-up"></i></button>
    <button onclick="clickAdopt(this)" class="adopt-btn btn btn-outline text-[#0E7A81] font-bold">Adopt</button>
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

const clickAdopt = (button) => {
    const modal = document.getElementById('my_modal_5');
    modal.showModal();
  
    let counter = 3; 
    const countdownElement = modal.querySelector('.countdown span');
    countdownElement.style.setProperty('--value', counter);
    const interval = setInterval(() => {
      counter--;
      countdownElement.style.setProperty('--value', counter);

      if (counter <= 0) {
        clearInterval(interval);
        modal.close();
        button.textContent = 'Adopted'; 
        button.classList.add('bg-blue-200')
      }
    }, 1000); 
    
    
  };
  


   
   
loadCategories();
loadPetsProfile()



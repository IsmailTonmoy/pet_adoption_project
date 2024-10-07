const loadCategories = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));

};

const loadPetCategories = (category) => {
    //  alert(id);

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayPets(data.data))
    .catch((error) => console.log(error));

};



const displayCategories = (data) => {

 const categoryContainer= document.getElementById("p-categories")
//  petsProfileCon.innerHTML=""
  data.forEach ((item) => {

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML= `
    <button onclick="loadPetCategories('${item.category}')" class="btn">
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



const loadPetsProfile = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/pets ")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));

};

const displayPets = (pets) => {
    const petsProfileCon = document.getElementById("petsPro");
    petsProfileCon.innerHTML=""
     

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
    <button class="btn btn-outline"><i class="fa-regular fa-thumbs-up"></i></button>
    <button class="btn btn-outline text-lime-600 font-bold">Adopt</button>
    <button class="btn btn-outline text-lime-600 font-bold">Details</button>
    </div>
  </div>
        `
        petsProfileCon.append(card)

    })
   };







loadCategories();
loadPetsProfile()



const loadCategories = () => {

    fetch(" https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));

};



const displayCategories = (data) => {

 const categoryConatainer= document.getElementById("p-categories")
  data.forEach ((item) => {

     const button = document.createElement("button");
     button.classList ="btn";
     button.innerHTML=`
      <img src="${item.category_icon}" alt="${item.category}" width="30" height="30" />
      ${item.category}
    `       
     

    //  add button
     categoryConatainer.append(button);

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

    pets.forEach((pets) => {

        const card = document.createElement("div");
        card.classList="card bg-base-100 w-96 shadow-xl"
        card.innerHTML=`<figure class="px-10 pt-10">
    <img
      src=${pets.image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
        `
        petsProfileCon.append(card)

    })
   };







loadCategories();
loadPetsProfile()



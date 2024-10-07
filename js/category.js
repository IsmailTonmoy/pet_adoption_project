const loadCategories = () => {

    fetch(" https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))

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


loadCategories();



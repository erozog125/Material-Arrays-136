const products = [
  {
    id: 1,
    name: "Iphone ProMax",
    price: 4000000,
    category: "Nuevo",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
  },

  {
    id: 2,
    name: "Tennis",
    price: 4000000,
    category: "Nuevo",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
  },


];


const cart = [

]

const makeCard = (id, name, price, category, img) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const badge = document.createElement("div");
  badge.classList.add("badge");
  badge.textContent = category;

  const imgProduct = document.createElement("img");
  imgProduct.src = img;
  imgProduct.alt = name;

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const tituloProduct = document.createElement("h3");
  tituloProduct.textContent = name;

  const priceProduct = document.createElement("div");
  priceProduct.classList.add("price");

  const span = document.createElement("span");
  span.textContent = `$${price}`;

  priceProduct.appendChild(span);

  const buttonProduct = document.createElement("button");

  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-cart-plus");

  buttonProduct.appendChild(i);
  buttonProduct.innerHTML += " Agregar";

  card.appendChild(badge);
  card.appendChild(imgProduct);
  card.appendChild(cardContent);

  cardContent.appendChild(tituloProduct);
  cardContent.appendChild(priceProduct);
  cardContent.appendChild(buttonProduct);

  document.querySelector(".products-grid").appendChild(card);
};

const renderProducts = () => {
  products.forEach((product) => {
    makeCard(
      product.id,
      product.name,
      product.price,
      product.category,
      product.img,
    );
  });
};

window.addEventListener("DOMContentLoaded", renderProducts);

buttonProduct.addEventListener('click', () => {

})


const addToItems = (id) => {
cart.forEach(item => {
    if(item.id === id){

    }
  });
} 
window.addEventListener("DOMContentLoaded", renderProducts);

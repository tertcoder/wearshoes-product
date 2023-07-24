import { products } from "./products.js";

const productBar = document.querySelector(".product-bar");
const currentProductImage = document.querySelector(".currentProductImage");
const productInfoContainer = document.querySelector(".product-info");

let current;
let likedProduct = products.filter((el) => el.isLiked === true) || [];
console.log(likedProduct);
// let currentId;
// console.log(current);
function renderProductBar() {
  productBar.innerHTML = "";
  const element = products
    .map(
      (prod) => ` 
    <img src="${prod.image}" alt="" id="product"  data-id="${prod.id}" class="shadow-md object-cover w-24 rounded-md">
    `
    )
    .join("");
  productBar.insertAdjacentHTML("afterbegin", element);
}
function renderCurrentImage(current) {
  currentProductImage.innerHTML = "";
  const image = `
    <img src="${current.image}" alt="" data-id="${current.id}" class="rounded-md rounded-b-none rounded-r-none ">
    `;
  currentProductImage.insertAdjacentHTML("afterbegin", image);
}
function renderCurrentProduct(id = 1) {
  current = products.find((el) => el.id === id);
  // const isLiked = likedProduct.find((el) => el.id === id);
  productInfoContainer.innerHTML = "";
  renderCurrentImage(current);
  const prodInfo = `
    <div class="flex items-center justify-between ">
      <span
        class="block px-2 py-1 text-xs text-orange-400 font-bold border-2 border-orange-400 rounded-full ">${
          current.new ? "NEW" : "Out of Stock"
        }</span>
      <div class="relative w-8 h-8 fav" id=${current.id}>
     
        <img src="./images/${
          current.isLiked ? "" : "non"
        }like.svg" class="duration-150 w-8 h-8 favSVG" alt=""></img>
      
      </div>
    </div>
    <p class="mt-2 text-lg brand md:text-base md1:text-lg text-stone-500">${
      current.brand
    }</p>
    <h1 class="text-3xl font-semibold tracking-tight name md:text-2xl md1:text-3xl text-stone-900 ">${
      current.name
    }</h1>
    <div class="relative flex mt-2">
      <span class="text-base rating md:text-sm md1:text-base text-stone-500">${
        current.rating
      } </span>
      <div class="flex -space-x-1">
        <img src="./images/star.svg" alt="" class="w-5 h-5 md:w-4 md:h-4 md1:w-5 md1:h-5"/>
        <img src="./images/star.svg" alt="" class="w-5 h-5 md:w-4 md:h-4 md1:w-5 md1:h-5"/>
        <img src="./images/star.svg" alt="" class="w-5 h-5 md:w-4 md:h-4 md1:w-5 md1:h-5"/>
        <img src="./images/star.svg" alt="" class="w-5 h-5 md:w-4 md:h-4 md1:w-5 md1:h-5"/>
        <img src="./images/star.svg" alt="" class="w-5 h-5 md:w-4 md:h-4 md1:w-5 md1:h-5"/>
      </div>
      <a href="#"
        class="absolute text-sm underline duration-150 translate-y-6 md:text-xs md1:text-sm text-stone-400 hover:text-stone-500">Rate
        now</a>
    </div>
    <div class="mt-10 mb-4 price lg:mb-4 lg:mt-10">
      <span class="text-xl font-semibold md:text-lg md1:text-xl text-stone-900">$</span>
      <span class="text-6xl font-bold md:text-4xl text-stone-900 md1:text-6xl pricing">${
        current.price
      }</span>
    </div>
  `;
  productInfoContainer.insertAdjacentHTML("afterbegin", prodInfo);
}

function toggleLikedProduct(current) {
  if (current.isLiked) likedProduct.push(current);
  else {
    const index = likedProduct.findIndex((el) => el.id === current.id);
    if (!(index == 1)) likedProduct.splice(index, 1);
  }
  localStorage.setItem("likedProduct", JSON.stringify(likedProduct));
  console.log(likedProduct);
}
function addLikedProduct(current) {
  productInfoContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest(".fav");
    if (!clicked) return;
    current.isLiked = !current.isLiked;
    toggleLoveBtn(current);
    toggleLikedProduct(current);
  });
}

function toggleLoveBtn(current) {
  const loveBtn = productInfoContainer.querySelector(".fav");
  const loveSvg = loveBtn.querySelector("img");
  loveSvg.src = `./images/${current.isLiked ? "" : "non"}like.svg`;
}

function showCurrentProduct(e) {
  const clickedEl = e.target.closest("#product");
  if (!clickedEl) return;
  const currentId = clickedEl.dataset.id;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  renderCurrentProduct(currentId);
}
productBar.addEventListener("click", showCurrentProduct);

// On Load
function onLoad() {
  if (!localStorage.getItem("currentId")) return 1;
  const id = JSON.parse(localStorage.getItem("currentId"));
  renderCurrentProduct(id);
  addLikedProduct(current);
}
function loadLikedProducts() {
  const savedProduct = localStorage.getItem("likedProduct");
  if (!savedProduct) return;
  likedProduct = JSON.parse(savedProduct);
}
renderProductBar();
onLoad();

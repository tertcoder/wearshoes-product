import { products } from "./products.js";
import { AppStorage } from "./storage.js";

const storage = new AppStorage();

storage.saveItem("products", products);

const productBar = document.querySelector(".product-bar");
const currentProductImage = document.querySelector(".currentProductImage");
const productInfoContainer = document.querySelector(".product-info");
const sizeContainer = document.querySelector(".size-container");

let current;
let likedProduct = products.filter(el => el.isLiked === true) || [];

// Adding the product images bar on the page
function renderProductBar() {
  productBar.textContent = "";
  const element = products
    .map(
      prod => ` 
    <img src="${prod.image}" alt="" id="product"  data-id="${prod.id}" class="duration-150  shadow-md object-cover w-24 rounded-md">
    `
    )
    .join("");
  productBar.insertAdjacentHTML("afterbegin", element);
}

// Adding the current Image of the product selected on the page
function renderCurrentImage(current) {
  currentProductImage.textContent = "";
  const image = `
    <img src="${current.image}" alt="" data-id="${current.id}" class="rounded-md rounded-b-none rounded-r-none ">
    `;

  const img = productBar.querySelectorAll("img");
  img.forEach(img => {
    if (img.dataset.id === current.id)
      img.classList.add("border-2", "border-orange-400", "scale-110");
  });

  currentProductImage.insertAdjacentHTML("afterbegin", image);
}

// Adding information about the current product selected  and calling the function to render the current image
function renderCurrentProduct(id = "01") {
  productInfoContainer.textContent = "";
  current = products.find(el => el.id === id);
  renderCurrentImage(current);
  const prodInfo = `
    <div class="flex items-center justify-between ">
      <span
        class="block px-2 py-1 text-xs text-orange-400 font-bold border-2 border-orange-400 rounded-full ">${
          current.new ? "NEW" : "Out of Stock"
        }</span>
      <button class="relative w-8 h-8 fav" id=${current.id}>
     
        <img src="./images/${
          current.isLiked ? "" : "non"
        }like.svg" class="duration-150 w-8 h-8 favSVG" alt=""></img>
      
      </button>
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
    <div class="mt-10 mb-4 price lg:mb-4 lg:mt-10 price">
      <span class="text-xl font-semibold md:text-lg md1:text-xl text-stone-900">$</span>
      <span class="text-6xl font-bold md:text-4xl text-stone-900 md1:text-6xl pricing">${
        current.price
      }</span>
    </div>
  `;
  productInfoContainer.insertAdjacentHTML("afterbegin", prodInfo);
}

// Add and Remove bookmarked product from array likedProduct then save anytime in localStorage
function toggleLikedProduct(current) {
  if (current.isLiked) likedProduct.push(current);
  else {
    const index = likedProduct.findIndex(el => el.id === current.id);
    if (index !== -1) likedProduct.splice(index, 1);
  }
  localStorage.setItem("likedProduct", JSON.stringify(likedProduct));
}

// Making functional the two function toggleLikedProduct() & toggleLoveBtn() on every click to the bookmark btn
function addLikedProduct(current) {
  productInfoContainer.addEventListener("click", e => {
    const clicked = e.target.closest(".fav");
    if (!clicked) return;
    current.isLiked = !current.isLiked;
    toggleLoveBtn(current);
    toggleLikedProduct(current);
  });
}

// Change bookmark icon
function toggleLoveBtn(current) {
  const loveBtn = productInfoContainer.querySelector(".fav");
  const loveSvg = loveBtn.querySelector("img");
  loveSvg.src = `./images/${current.isLiked ? "" : "non"}like.svg`;
}

// Changing size
function changePricePerSize(current, rate) {
  const fixedPrice = current.price;
  const priceContainer = productInfoContainer.querySelector(".price");
  const priceValue = priceContainer.querySelector(".pricing");
  priceValue.textContent = `${(fixedPrice * rate).toFixed(2)}`;
}
function changeStylePerSize(e) {
  const clickedEl = e.target.closest("button");
  if (!clickedEl) return;
  const elements = sizeContainer.querySelectorAll("button");
  elements.forEach(el => {
    el.classList.remove("border-orange-300");
    if (!el.classList.contains("border-stone-200"))
      el.classList.add("border-stone-200");
  });

  clickedEl.classList.replace("border-stone-200", "border-orange-300");

  const rate = +clickedEl.dataset.priceRate;
  changePricePerSize(current, rate);
}
sizeContainer.addEventListener("click", changeStylePerSize);

// Current Product style on product bar
function activeProduct(e) {
  const clickedEl = e.target.closest("#product");
  if (!clickedEl) return;
  const img = productBar.querySelectorAll("img");
  img.forEach(img =>
    img.classList.remove("border-2", "border-orange-400", "scale-110")
  );
  clickedEl.classList.add("border-2", "border-orange-400", "scale-110");

  const elements = sizeContainer.querySelectorAll("button");
  elements.forEach(el => {
    el.classList.remove("border-orange-300");
  });
  elements[0].classList.replace("border-stone-200", "border-orange-300");
}
productBar.addEventListener("click", activeProduct);

// Making functional the function renderCurrentProduct() to every click to the element from the product bar
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
  if (!localStorage.getItem("currentId")) return renderCurrentProduct();
  const id = JSON.parse(localStorage.getItem("currentId"));
  renderCurrentProduct(id);
  addLikedProduct(current);
}
renderProductBar();
onLoad();

import { products } from "./products.js";

const productBar = document.querySelector(".product-bar");
const currentProductImage = document.querySelector(".currentProductImage");
const name = document.querySelector(".name");
const brand = document.querySelector(".brand");
const price = document.querySelector(".pricing");
const rating = document.querySelector(".rating");
const newBoolean = document.querySelector(".new");
const info = document.querySelector(".info");
const love = document.querySelector(".love");
const nonLove = document.querySelector(".nonLove");

let current;
let likedProduct = [];
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
function renderCurrentProduct(id) {
  currentProductImage.innerHTML = "";
  info.innerHTML = "";

  current = products.find((el) => el.id === id);
  const image = `
  <img src="${current.image}" alt="" data-id="${current.id}" class="rounded-md rounded-b-none rounded-r-none ">
  `;

  info.dataset.id = current.id;

  currentProductImage.insertAdjacentHTML("afterbegin", image);
  name.textContent = current.name;
  brand.textContent = current.brand;
  rating.textContent = current.rating;
  price.textContent = current.price;
  let html = `
    <svg class="like w-8 h-8 duration-150 " version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="189px" height="189px" viewBox="0 0 64.00 64.00" enable-background="new 0 0 64 64" xml:space="preserve" fill="#f87171" stroke="#f87171"stroke-width="0.768">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path fill="#f87171"
            d="M48,6c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0 c0,0-3.971-3.97-3.979-3.961C24.418,7.791,20.418,6,16,6C7.163,6,0,13.163,0,22c0,3.338,1.024,6.436,2.773,9 c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,58.609,30.977,59,32,59s2.047-0.391,2.828-1.172 c0,0,23.93-23.93,24.797-24.797S61.227,31,61.227,31C62.976,28.436,64,25.338,64,22C64,13.163,56.837,6,48,6z M58.714,30.977 c0,0-0.612,0.75-1.823,1.961S33.414,56.414,33.414,56.414C33.023,56.805,32.512,57,32,57s-1.023-0.195-1.414-0.586 c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,28.545,2,25.424,2,22C2,14.268,8.268,8,16,8 c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677l0.009,0.009 C40.634,9.566,44.134,8,48,8c7.732,0,14,6.268,14,14C62,25.424,60.755,28.545,58.714,30.977z">
          </path>
          <path fill="#f87171"
            d="M48,12c-0.553,0-1,0.447-1,1s0.447,1,1,1c4.418,0,8,3.582,8,8c0,0.553,0.447,1,1,1s1-0.447,1-1 C58,16.478,53.522,12,48,12z">
          </path>
        </g>
      </g>
    </svg>
    <!-- liked -->
    <svg class=" like w-8 h-8 duration-150 hidden" version="1.0" id="Layer_1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"
      enable-background="new 0 0 64 64" xml:space="preserve" fill="#f87171">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path fill="class=" w-8="" h-8""=""
          d="M48,5c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0 c0,0-3.971-3.97-3.979-3.961C24.418,6.791,20.418,5,16,5C7.163,5,0,12.163,0,21c0,3.338,1.024,6.436,2.773,9 c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,57.609,30.977,58,32,58s2.047-0.391,2.828-1.172 c0,0,23.93-23.93,24.797-24.797S61.227,30,61.227,30C62.976,27.436,64,24.338,64,21C64,12.163,56.837,5,48,5z M57,22 c-0.553,0-1-0.447-1-1c0-4.418-3.582-8-8-8c-0.553,0-1-0.447-1-1s0.447-1,1-1c5.522,0,10,4.478,10,10C58,21.553,57.553,22,57,22z">
        </path>
      </g>
    </svg>
  `;
  info.insertAdjacentHTML("afterbegin", html);

  info.addEventListener("click", (e) => {
    current.isLiked = current.isLiked ? false : true;
    console.log(e.target.closest("svg"));
    if (!e.target.closest("svg")) return;
    if (current.isLiked) {
      info.children[0].classList.add("hidden");
      info.children[1].classList.remove("hidden");
      likedProduct.push(current);
    } else {
      info.children[0].classList.remove("hidden");
      info.children[1].classList.add("hidden");
    }
    console.log(likedProduct);
  });
  // info.addEventListener("click", () => {
  //   if (current.isLiked) {
  //     let index = likedProduct.indexOf(current);
  //     likedProduct.pop(current);
  //   }
  //   console.log(likedProduct);
  // });
}
function showCurrentProduct(e) {
  const clickedEl = e.target.closest("#product");
  if (!clickedEl) return;
  const currentId = clickedEl.dataset.id;
  localStorage.setItem("currentId", JSON.stringify(currentId));
  renderCurrentProduct(currentId);
}

productBar.addEventListener("click", showCurrentProduct);

renderProductBar();

// On Load
function onLoad() {
  if (!localStorage.getItem("currentId")) return 1;
  const id = JSON.parse(localStorage.getItem("currentId"));
  renderCurrentProduct(id);
}
onLoad();

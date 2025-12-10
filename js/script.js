// Toggle class active untuk humburger menu
const navbarNav = document.querySelector ('.navbar-nav');
// Ketika humburger menu di klik
document.querySelector('#humburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
};

// Toggle class active untuk search button
const searchForm = document.querySelector ('.search-form');
const searchBox = document.querySelector ('#search-box');
// Ketika search button di klik
document.querySelector('#search-btn').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// Toggle class active untuk shopping cart button
const shoppingCart = document.querySelector ('.shopping-cart');
// Ketika shopping cart button di klik
document.querySelector('#shopping-cart-btn').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

// Klik di luar elemen
const menu = document.querySelector('#humburger-menu');
const search = document.querySelector('#search-btn');
const cart = document.querySelector('#shopping-cart-btn')

document.addEventListener('click', function(e){
    if(!menu.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }

    if(!search.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active');
    }

    if(!cart.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active');
    }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');

// tunggu klik pada document, cek apakah target ada class .item-detail-btn
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.item-detail-btn');
  if (!btn) return;
  e.preventDefault();
  itemDetailModal.style.display = 'flex';
});



//Tombol close
const closeIcon = document.querySelector('.modal .close-icon');
// menghilangkan modal box atau mengubah style item detail modal menjadi display none
closeIcon.onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

// klik diluar modal
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none'
    }
};

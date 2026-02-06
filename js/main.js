// main.js
import { products } from './data.js';
import { createProductCard } from './render.js';
import { showSkeletons } from './loader.js';

const productList = document.getElementById('product-list');
export let cartItems = [];

// 1. Logika Menu (Hamburger)
function initMenu() {
    const btnOpen = document.getElementById('hamburger-menu');
    const btnClose = document.getElementById('close-menu');
    const overlay = document.getElementById('menu-overlay');

    if (btnOpen && overlay) {
        btnOpen.addEventListener('click', () => overlay.classList.add('active'));
    }
    if (btnClose && overlay) {
        btnClose.addEventListener('click', () => overlay.classList.remove('active'));
    }
}

// 2. Logika Keranjang & UI
function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const countDisplay = document.getElementById('count');
    const totalDisplay = document.getElementById('total-amount');

    if (countDisplay) countDisplay.innerText = cartItems.length;
    if (!list) return;

    list.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:gray; margin-top:20px;">Keranjang kosong</p>';
    } else {
        cartItems.forEach((item, index) => {
            const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ''));
            total += priceNumber;

            list.innerHTML += `
                <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                    <div style="flex: 1;">
                        <span style="font-size:14px; display:block;">${item.name}</span>
                        <strong style="font-size:13px; color:#8B5E3C;">${item.price}</strong>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:18px; padding:0 10px;">&times;</button>
                </div>
            `;
        });
    }

    if (totalDisplay) {
        totalDisplay.innerText = "Rp " + total.toLocaleString('id-ID');
    }
}

export function addToCart(product) {
    cartItems.push(product);
    updateCartUI();
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) cartOverlay.classList.add('active');
}

import { openCheckoutModal } from './checkout.js';

function initWhatsAppCheckout() {
    const waBtn = document.getElementById('whatsapp-btn');
    if (waBtn) {
        waBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                alert("Keranjang kamu masih kosong!");
                return;
            }
            const totalHarga = document.getElementById('total-amount').innerText;
            // Buka modal konfirmasi dulu, bukan langsung ke WA
            openCheckoutModal(cartItems, totalHarga);
        });
    }
}

// 4. Logika Tampilan Keranjang (Open/Close)
function initCartLogic() {
    const cartIcon = document.getElementById('cart-icon');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');

    if (cartIcon && cartOverlay) {
        cartIcon.addEventListener('click', () => cartOverlay.classList.add('active'));
    }
    if (closeCart && cartOverlay) {
        cartOverlay.classList.remove('active'); // Perbaikan logic close
    }
}

// 5. Logika Tema (Dark Mode)
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    if (!themeBtn) return; 

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.innerText = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.innerText = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.innerText = '☀️';
        }
    });
}

// 6. Inisialisasi Utama (Gabungan Skeleton)
function init() {
    console.log("Aplikasi Rona Rotan Dimuat...");
    
    initMenu();
    initCartLogic();
    initWhatsAppCheckout(); 
    initTheme();
    updateCartUI(); 
    
    if (productList) {
        // Tampilkan Skeleton dulu
        showSkeletons('product-list', 6);

        // Render produk asli setelah delay 1 detik
        setTimeout(() => {
            productList.innerHTML = ''; 
            products.forEach(product => {
                const cardElement = createProductCard(product);
                productList.appendChild(cardElement);
            });
        }, 1000);
    }
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', init);

// Global Function untuk tombol hapus
window.removeFromCart = function(index) {
    cartItems.splice(index, 1);
    updateCartUI();
};

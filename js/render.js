// js/render.js
import { addToCart } from './main.js';
import { openModal } from './modal.js';

export function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    
    // Gunakan class khusus 'clickable-img' agar mudah ditangkap oleh JS
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" class="clickable-img" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;">
        </div>
        <div class="product-info">
            <span class="seller-badge">${product.seller}</span>
            <h2 class="product-name">${product.name}</h2>
            <p style="font-size: 0.8rem; color: #555;">${product.detail}</p>
            <span class="price">${product.price}</span>
            <button class="btn-add" id="btn-${product.id}">Beli Sekarang</button>
        </div>
    `;

    // 1. Logika Klik Gambar (Buka Modal)
    const imgElement = card.querySelector('.clickable-img');
    imgElement.addEventListener('click', () => {
        openModal(product); // Membuka pop-up detail
    });

    // 2. Logika Klik Tombol Beli (Tambah ke Keranjang)
    const button = card.querySelector(`#btn-${product.id}`);
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah klik tombol ikut memicu klik gambar
        addToCart(product); 
    });

    return card;
}

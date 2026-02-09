import { addToCart } from './main.js';
import { openModal } from './modal.js';

export function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
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
    
    const imgElement = card.querySelector('.clickable-img');
    imgElement.addEventListener('click', () => {
        openModal(product); 
    });

   
    const button = card.querySelector(`#btn-${product.id}`);
    button.addEventListener('click', (e) => {
        e.stopPropagation(); 
        addToCart(product); 
    });

    return card;
}

// js/modal.js

// js/modal.js

// js/modal.js
import { addToCart } from './main.js'; // Import agar bisa dipanggil langsung

export function openModal(product) {
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-body');

    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="modal-layout">
            <div class="modal-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="modal-img">
            </div>
            <div class="modal-info">
                <span class="seller-badge">${product.seller}</span>
                <h2 class="product-name" style="margin-top: 10px;">${product.name}</h2>
                <p class="modal-price" style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); margin: 15px 0;">${product.price}</p>
                <p class="modal-desc" style="margin-bottom: 20px; line-height: 1.6;">${product.detail || 'Produk kerajinan rotan pilihan dengan anyaman rapi.'}</p>
                
                <button class="btn-add modal-btn-buy" id="modal-add-to-cart">
                    Tambahkan ke Keranjang
                </button>
            </div>
        </div>
    `;

    modal.classList.add('show');

    // --- SEMUA LOGIKA HARUS DI DALAM FUNGSI openModal ---

    // 1. Tombol X
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.onclick = () => closeModal();
    }

    // 2. Klik di luar area putih (Overlay)
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    // 3. Tombol Beli di dalam Modal
    const modalBuyBtn = document.getElementById('modal-add-to-cart');
    if (modalBuyBtn) {
        modalBuyBtn.onclick = () => {
            addToCart(product); // Panggil fungsi dari main.js
            closeModal();
        };
    }
} // <--- Penutup fungsi openModal

export function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

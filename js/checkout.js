export function openCheckoutModal(cartItems, totalPrice) {
    const checkoutOverlay = document.createElement('div');
    checkoutOverlay.id = 'checkout-modal';
    checkoutOverlay.className = 'modal-overlay show';

    checkoutOverlay.innerHTML = `
        <div class="modal-container checkout-container">
            <h2>Konfirmasi Pesanan</h2>
            <p>Lengkapi data di bawah untuk mengirim pesanan via WhatsApp.</p>
            
            <form id="checkout-form">
                <input type="text" id="cust-name" placeholder="Nama Lengkap" required>
                <input type="text" id="cust-address" placeholder="Alamat Pengiriman" required>
                <select id="cust-shipping">
                    <option value="JNE">JNE</option>
                    <option value="J&T">J&T</option>
                    <option value="Sicepat">Sicepat</option>
                    <option value="Ambil Sendiri">Ambil di Galeri</option>
                </select>
                <div class="checkout-summary">
                    <span>Total yang harus dibayar:</span>
                    <strong>${totalPrice}</strong>
                </div>
                <button type="submit" class="btn-confirm">Kirim ke WhatsApp</button>
                <button type="button" class="btn-cancel" id="close-checkout">Batal</button>
            </form>
        </div>
    `;

    document.body.appendChild(checkoutOverlay);
    const form = document.getElementById('checkout-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('cust-name').value;
        const address = document.getElementById('cust-address').value;
        const shipping = document.getElementById('cust-shipping').value;

        sendToWhatsApp(name, address, shipping, cartItems, totalPrice);
    };

    document.getElementById('close-checkout').onclick = () => checkoutOverlay.remove();
}

function sendToWhatsApp(name, address, shipping, items, total) {
    let pesan = `*PESANAN BARU - RONA ROTAN*\n\n`;
    pesan += `*Nama:* ${name}\n`;
    pesan += `*Alamat:* ${address}\n`;
    pesan += `*Ekspedisi:* ${shipping}\n\n`;
    pesan += `*Daftar Produk:*\n`;

    items.forEach((item, i) => {
        pesan += `${i + 1}. ${item.name} (${item.price})\n`;
    });

    pesan += `\n*Total: ${total}*`;
    
    const nomorWA = "6283116544838";
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');

}

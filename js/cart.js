export let cartItems = [];

export function addToCart(product) {
    cartItems.push(product);
    updateCartUI();
    document.getElementById('cart-overlay').classList.add('active');
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const countDisplay = document.getElementById('count');
    const totalDisplay = document.getElementById('total-amount');
    countDisplay.innerText = cartItems.length;
    list.innerHTML = '';

    if (cartItems.length === 0) {
        list.innerHTML = '<p>Keranjang kosong</p>';
    } else {
        cartItems.forEach((item, index) => {
            list.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4 style="margin:0">${item.name}</h4>
                        <small>${item.price}</small>
                    </div>
                    <button onclick="window.removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer">Hapus</button>
                </div>
            `;
        });
    }
}

export function initCartLogic() {
    const cartIcon = document.getElementById('cart-icon');
    const closeBtn = document.getElementById('close-cart');
    const overlay = document.getElementById('cart-overlay');

    cartIcon.addEventListener('click', () => overlay.classList.add('active'));
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));

}

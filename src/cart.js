// =============== ADD TO CART (dipakai di product detail) ===============
function addToCart(productName, productPrice, productImg) {
  const qty = parseInt(document.querySelector("input[type='number']").value) || 1;
  const size = document.querySelector("select") ? document.querySelector("select").value : "-";

  const product = {
    name: productName,
    price: productPrice,
    image: productImg,
    size: size,
    quantity: qty
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();
  alert("Product added to cart!");
}

// =============== RENDER CART (dipakai di cart.html) ===============
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const table = document.getElementById("cart-items");

  if (!table) return; // kalau bukan di cart.html, stop

  // header tabel
  table.innerHTML = `
    <tr>
      <th>Product</th>
      <th>Size</th>
      <th>Quantity</th>
      <th>Subtotal</th>
    </tr>
  `;

  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="cart-info">
          <img src="${item.image}" width="80px">
          <div>
            <p>${item.name}</p>
            <small>$${item.price.toFixed(2)}</small>
            <br>
            <a href="#" onclick="removeItem(${index})">Remove</a>
          </div>
        </div>
      </td>
      <td>${item.size}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1"
          onchange="updateQuantity(${index}, this.value)">
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    `;
    table.appendChild(row);

    subtotal += item.price * item.quantity;
  });

  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  document.querySelector(".cart-subtotal-price").textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(".cart-tax-price").textContent = `$${tax.toFixed(2)}`;
  document.querySelector(".cart-total-price").textContent = `$${total.toFixed(2)}`;

  updateCartBadge();
}

// =============== UPDATE BADGE ===============
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = cart.length;
  }
}

// =============== REMOVE ITEM ===============
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// =============== UPDATE QTY ===============
function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// =============== INIT ===============
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
});

// ================= CHECKOUT =================
function checkoutOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  alert("✅ Pesanan kamu sudah terkirim!");

  localStorage.removeItem("cart");
  updateCartBadge();
  renderCart();

  // pesan  3 detik
  setTimeout(() => {
    msg.classList.remove("show");
  }, 3000);
}
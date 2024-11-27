// Coșul de cumpărături (stocat într-un obiect)
let cart = [];

// Funcția pentru a adăuga produse în coș
function addToCart(id, name, price, imageUrl) {
  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      imageUrl: imageUrl,
      quantity: 1,
    });
  }
  renderCart();
}

// Funcția pentru a actualiza coșul
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = ""; // Resetăm lista de produse din coș

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    // Creăm elementul pentru fiecare produs din coș
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div>
                <h4 style="font-size: 1rem;">${item.name}</h4>
                <p>${item.price} RON</p>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item.id}', -1)">-</button>
                <input type="number" value="${item.quantity}" disabled>
                <button onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>
            <button onclick="removeFromCart('${item.id}')">Sterge</button>
        `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Actualizăm suma totală
  document.getElementById("totalAmount").textContent = total.toFixed(2);
}

// Funcția pentru a schimba cantitatea unui produs
function changeQuantity(id, change) {
  const product = cart.find((item) => item.id === id);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      product.quantity = 1;
    }
    renderCart();
  }
}

// Funcția pentru a șterge un produs din coș
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

// Funcția pentru a finaliza comanda
function checkout() {
  if (cart.length === 0) {
    alert("Coșul de cumpărături este gol! Nu poți finaliza comanda.");
    return;
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  Swal.fire({
    title: "Felicitari!",
    text: "Ai finalizat cu succes cumparaturile",
    icon: "success",
  });

  // Resetăm coșul
  cart = [];
  renderCart();
}


// filtrare produse
function filterByCategory(category){
      // selectam toate produsele
      const prodPag = document.querySelectorAll('.produs');

      prodPag.forEach(produs => {
          // obtinem categoria fiecarui produs
          const productCategory = produs.getAttribute('data-category');
  
          // afisam sau ascundem produsul in functie de categorie
          if(category==='all' || productCategory===category){
              produs.classList.remove('hidden');
          }else{
              produs.classList.add('hidden');
          }
      });
  

}
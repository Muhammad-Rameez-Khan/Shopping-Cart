class Product {
    constructor(name, price, id) {
      this.name = name;
      this.price = price;
      this.id = id;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      this.updateCart();
    }
  
    removeItem(id) {
      const index = this.items.findIndex(item => item.product.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      this.updateCart();
    }
  
    getTotal() {
      return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
  
    updateCart() {
      const cartItems = document.getElementById("cart-items");
      const total = document.getElementById("total");
  
      cartItems.innerHTML = "";
      this.items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.product.name} (Qty: ${item.quantity}): $${(item.product.price * item.quantity).toFixed(2)} <button class="remove-btn" data-id="${item.product.id}">Remove</button>`;
        cartItems.appendChild(li);
      });
  
      total.textContent = `Total: $${this.getTotal().toFixed(2)}`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const products = [
      new Product("Apple", 0.50, 1),
      new Product("Banana", 0.75, 2),
      new Product("Milk", 2.00, 3)
    ];
  
    const productList = document.getElementById("product-list");
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `${product.name}: $${product.price} <input type="number" min="1" value="1" id="qty-${product.id}"> <button class="add-btn" data-id="${product.id}">Add to Cart</button>`;
      productList.appendChild(div);
  
      div.querySelector(".add-btn").addEventListener("click", () => {
        const quantity = parseInt(document.getElementById(`qty-${product.id}`).value);
        shoppingCart.addItem(product, quantity);
      });
    });
  
    const shoppingCart = new ShoppingCart();
  
    document.getElementById("cart").addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-btn")) {
        const id = parseInt(event.target.dataset.id);
        shoppingCart.removeItem(id);
      }
    });
  
    document.getElementById("checkout-btn").addEventListener("click", function () {
      alert("Thank you for shopping with us!");
    });
  });
  
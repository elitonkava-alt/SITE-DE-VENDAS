/*
========================================================
|            CÓDIGO JAVASCRIPT (CARRINHO)              |
========================================================
*/

// Lista de produtos (simulando a base de dados)
const products = [
  { id: 1, name: "Cyberpunk 2077", price: 199.90, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgK020HdJlnxesOkODk-1vJc7aVnM0aBd6Eg&s" },
  { id: 2, name: "The Witcher 3", price: 99.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0luKkWyzTO6oBg_DBlhrjJQlYTD9Z3FoBw&s" },
  { id: 3, name: "Elden Ring", price: 249.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Nou4oHurJxom1LW1QZvXbvtsRRzpNTD28g&s" },
  { id: 4, name: "Stardew Valley", price: 49.90, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeLlFQDTHsYjSHtbBsInAYl2aIF54Qz_8zQ&s" },
  ];
  // Adicione mais produtos aqui
let cart = []; // Array que armazenará os itens do carrinho

// Referências aos elementos do DOM
const catalogElement = document.querySelector('.catalog');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-value');


// Função para renderizar os produtos no catálogo
function renderProducts() {
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="Capa do jogo ${product.name}" class="product-image">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
        <button class="btn-add" data-id="${product.id}">Adicionar ao Carrinho</button>
      </div>
    `;
    catalogElement.appendChild(productCard);
  });

  // Adiciona event listeners aos botões "Adicionar ao Carrinho"
  document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', (e) => {
      // Pega o ID do produto através do atributo data-id
      const productId = parseInt(e.target.dataset.id); 
      addToCart(productId);
    });
  });
}

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (product) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1; // Se existe, aumenta a quantidade
    } else {
      cart.push({ ...product, quantity: 1 }); // Se não existe, adiciona o novo item
    }

    renderCart(); // Atualiza o visual do carrinho
  }
}

// Função para remover um item do carrinho
function removeFromCart(productId) {
  // Filtra o array, removendo o item com o ID correspondente
  cart = cart.filter(item => item.id !== productId); 
  renderCart();
}

// Função para calcular o total do carrinho
function calculateTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Função para renderizar os itens do carrinho e o total
function renderCart() {
  cartItemsElement.innerHTML = ''; // Limpa a lista atual

  if (cart.length === 0) {
    cartItemsElement.innerHTML = '<li id="empty-cart-message">O carrinho está vazio.</li>';
  } else {
    cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('cart-item');
      listItem.innerHTML = `
        <span class="cart-item-name">${item.name} (${item.quantity}x)</span>
        <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
        <button class="cart-item-remove" data-id="${item.id}">X</button>
      `;
      cartItemsElement.appendChild(listItem);
    });

    // Adiciona event listeners aos botões de remover recém-criados
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        removeFromCart(productId);
      });
    });
  }

  // Atualiza o total
  const total = calculateTotal();
  cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Inicialização da página: Renderiza os produtos e o carrinho ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
});
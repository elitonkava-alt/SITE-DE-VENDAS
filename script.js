// Carrinho
let cart = [];

function renderCatalog() {
  const catalog = document.querySelector('.catalog');
  catalog.innerHTML = '';
  PRODUCTS.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${prod.image}')"></div>
      <div class="meta">
        <div class="title">${prod.title}</div>
        <div class="price">${prod.price > 0 ? 'R$ ' + prod.price.toFixed(2) : 'Grátis'}</div>
      </div>
      <div class="tags">${prod.tags.map(t => `<div class="tag">${t}</div>`).join('')}</div>
      <p class="muted">${prod.description}</p>
      <button class="btn" onclick="addToCart('${prod.id}')">Adicionar ao Carrinho</button>
    `;
    catalog.appendChild(card);
  });
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({...product, qty: 1});
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function renderCart() {
  const list = document.querySelector('.cart-list');
  const totalElem = document.querySelector('.total span');
  list.innerHTML = '';

  if (cart.length === 0) {
    list.innerHTML = '<div class="empty">Carrinho vazio</div>';
    totalElem.textContent = 'Total: R$ 0,00';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-thumb" style="background-image:url('${item.image}')"></div>
      <div class="cart-info">
        <div>${item.title}</div>
        <div class="muted">Qtd: ${item.qty}</div>
      </div>
      <div>R$ ${(item.price * item.qty).toFixed(2)}</div>
      <button class="small btn" onclick="removeFromCart('${item.id}')">x</button>
    `;
    list.appendChild(el);
  });

  totalElem.textContent = `Total: R$ ${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', renderCatalog);
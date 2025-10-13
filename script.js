const PRODUCTS = [
  {
    id: 'cs2',
    title: 'Counter-Strike 2',
    price: 0,
    platform: 'PC',
    tags: ['FPS','Multiplayer'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    description: 'Nova versão do clássico jogo de tiro em equipe.'
  },
  {
    id: 'dota2',
    title: 'Dota 2',
    price: 0,
    platform: 'PC',
    tags: ['MOBA','Competitivo'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
    description: 'MOBA de grande sucesso, jogue com amigos ou solo.'
  },
  {
    id: 'valheim',
    title: 'Valheim',
    price: 44.99,
    platform: 'PC',
    tags: ['Sobrevivência','Co-op'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
    description: 'Sandbox viking com exploração, construção e combate.'
  },
  {
    id: 'cyberpunk2077',
    title: 'Cyberpunk 2077',
    price: 199.99,
    platform: 'PC',
    tags: ['RPG','Mundo Aberto'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    description: 'Grande RPG futurista com narrativa envolvente.'
  },
  {
    id: 'eldenring',
    title: 'Elden Ring',
    price: 249.99,
    platform: 'PC',
    tags: ['Aventura','RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    description: 'Mundo aberto com combate desafiador e exploração profunda.'
  },
  {
    id: 'baldursgate3',
    title: 'Baldur’s Gate 3',
    price: 249.99,
    platform: 'PC',
    tags: ['RPG','História'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
    description: 'RPG baseado em D&D com escolhas e narrativa incríveis.'
  },
  {
    id: 'hades2',
    title: 'Hades II',
    price: 129.99,
    platform: 'PC',
    tags: ['Ação','Roguelike'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145350/header.jpg',
    description: 'Sequência do premiado roguelike mitológico da Supergiant Games.'
  },
  {
    id: 'palworld',
    title: 'Palworld',
    price: 139.99,
    platform: 'PC',
    tags: ['Sobrevivência','Multiplayer'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
    description: 'Crie, lute e capture criaturas em um mundo aberto vasto.'
  },
  {
    id: 'helldivers2',
    title: 'Helldivers 2',
    price: 199.99,
    platform: 'PC',
    tags: ['Tiro','Co-op'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg',
    description: 'Lute em equipe para salvar a galáxia em missões intensas.'
  },
  {
    id: 'rust',
    title: 'Rust',
    price: 110.99,
    platform: 'PC',
    tags: ['Sobrevivência','PVP'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
    description: 'Sobreviva em um mundo hostil, construa bases e lute pela vida.'
  }
];

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
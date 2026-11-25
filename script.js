let cartCount = 0;
let allItems = [];

document.getElementById('cart-btn').addEventListener('click', () => {
  alert('В корзине товаров: ' + cartCount);
});

function updateCart() {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
}

// Загрузка данных
fetch('menu.json')
  .then(r => r.json())
  .then(data => {
    allItems = data.items;
    
    // Рендер категорий
    const tabsContainer = document.getElementById('category-tabs');
    data.categories.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.className = 'tab-btn' + (index === 0 ? ' active' : '');
      btn.textContent = cat.name;
      btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(cat.id);
      };
      tabsContainer.appendChild(btn);
    });

    // Первый рендер (шаурма)
    renderMenu('shaurma');
  });

function renderMenu(catId) {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  
  const filtered = allItems.filter(i => i.cat === catId);
  
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div>
        <div class="name">${item.name}</div>
        <div class="desc">${item.desc}</div>
        <div class="weight">${item.weight}</div>
      </div>
      <div class="bottom">
        <div class="price">${item.price}</div>
        <button class="buy-btn">+</button>
      </div>
    `;
    card.querySelector('.buy-btn').onclick = () => updateCart();
    grid.appendChild(card);
  });
}

// Логика конструктора
function selectOpt(btn) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function toggleOpt(btn) {
  btn.classList.toggle('active');
}

function addCustomToCart() {
  updateCart();
  alert('Твоя уникальная шаурма добавлена в корзину!');
}
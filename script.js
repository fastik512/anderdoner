/* ============================================================
   Андер Донер — логика сайта
   Цены в копейках BYN: 790 = 7.90 BYN
   ============================================================ */

const DELIVERY_FREE_FROM = 5000;   // 50 BYN — бесплатная доставка
const DELIVERY_FEE       = 500;    // 5 BYN

const products = [
  // Донеры
  { id:1,  cat:'doner', name:'Донер классический', desc:'Лепёшка, курица, капуста, огурец, помидор, чесночный соус', price:790,  glyph:'🌯', tag:'Хит' },
  { id:2,  cat:'doner', name:'Донер сырный', desc:'Двойной чеддер, курица, сырный соус, свежий огурец', price:1450, glyph:'🧀', tag:'' },
  { id:3,  cat:'doner', name:'Донер с говядиной', desc:'Мраморная говядина, пекинская капуста, барбекю', price:1450, glyph:'🥩', tag:'' },
  { id:4,  cat:'doner', name:'Донер с беконом', desc:'Бекон, курица, свежий огурец, чесночный соус', price:1250, glyph:'🥓', tag:'Хит' },
  { id:5,  cat:'doner', name:'Донер с креветками', desc:'Королевские креветки, пекинская капуста, кунжутный соус', price:1450, glyph:'🍤', tag:'' },
  { id:6,  cat:'doner', name:'Донер с фалафелем', desc:'Фалафель, пекинская капуста, хумус, свежий огурец', price:1050, glyph:'🧆', tag:'Веган' },
  // Стики
  { id:7,  cat:'stick', name:'Стик с курицей', desc:'Курица, сырный и чесночный соусы', price:490,  glyph:'🌯', tag:'' },
  { id:8,  cat:'stick', name:'Стик барбекю', desc:'Курица, барбекю, чесночный соус', price:490,  glyph:'🌯', tag:'' },
  { id:9,  cat:'stick', name:'Стик с сухариками', desc:'Курица, сухарики, соус цезарь', price:490,  glyph:'🌯', tag:'' },
  { id:10, cat:'stick', name:'Стик терияки', desc:'Курица, терияки, чесночный соус', price:490,  glyph:'🌯', tag:'' },
  { id:11, cat:'stick', name:'Стик с сыром', desc:'Сливочный сыр, курица, чесночный соус', price:490,  glyph:'🌯', tag:'' },
  // Боксы
  { id:12, cat:'box', name:'Ланч-бокс классический', desc:'Курица, картофель фри, овощи, два соуса', price:1690, glyph:'🍱', tag:'' },
  { id:13, cat:'box', name:'Ланч-бокс сырный', desc:'Курица, фри, жидкий чеддер, овощи', price:1890, glyph:'🍱', tag:'' },
  { id:14, cat:'box', name:'Наггетсы 6 шт.', desc:'Куриные наггетсы, соус на выбор', price:710,  glyph:'🍗', tag:'' },
  // Картошка
  { id:15, cat:'side', name:'Картофель фри', desc:'Порция 110 г, соль', price:490,  glyph:'🍟', tag:'' },
  { id:16, cat:'side', name:'Картофель по-деревенски', desc:'Порция 110 г, специи', price:550,  glyph:'🍟', tag:'' },
  { id:17, cat:'side', name:'Фритос с беконом', desc:'Картофель фри, бекон, плавленый сыр', price:890, glyph:'🥔', tag:'Хит' },
  // Напитки
  { id:18, cat:'drink', name:'Кола 0.5 л', desc:'Классическая, холодная', price:350,  glyph:'🥤', tag:'' },
  { id:19, cat:'drink', name:'Вода 0.5 л', desc:'Негазированная', price:160,  glyph:'💧', tag:'' },
  { id:20, cat:'drink', name:'Лимонад 0.5 л', desc:'Цитрус, охлаждённый', price:350,  glyph:'🍋', tag:'' },
  // Соусы
  { id:21, cat:'sauce', name:'Чесночный соус', desc:'25 г', price:120,  glyph:'🧄', tag:'' },
  { id:22, cat:'sauce', name:'Барбекю', desc:'25 г', price:120,  glyph:'🍯', tag:'' },
  { id:23, cat:'sauce', name:'Сырный соус', desc:'25 г', price:120,  glyph:'🧀', tag:'' },
];

const categories = [
  { key:'all',   label:'Всё' },
  { key:'doner', label:'Донеры' },
  { key:'stick', label:'Стики' },
  { key:'box',   label:'Боксы' },
  { key:'side',  label:'Картошка' },
  { key:'drink', label:'Напитки' },
  { key:'sauce', label:'Соусы' },
];

const addresses = [
  { name:'ст.м. Каменная горка', time:'09:00–23:00', metro:'М1' },
  { name:'ст.м. Уручье', time:'09:00–23:00', metro:'М1' },
  { name:'ст.м. Кунцевщина', time:'09:00–23:00', metro:'М1' },
  { name:'ст.м. Автозаводская', time:'09:00–23:00', metro:'М2' },
  { name:'ст.м. Институт культуры', time:'09:00–23:00', metro:'М2' },
  { name:'пр. Победителей, 1', time:'10:00–00:00', metro:'' },
  { name:'ТЦ Dana Mall', time:'10:00–22:00', metro:'М1' },
  { name:'ст.м. Партизанская', time:'09:00–23:00', metro:'М2' },
  { name:'пр-т Независимости, 56А', time:'09:00–23:00', metro:'М1' },
  { name:'пр-т Партизанский, 182', time:'09:00–23:00', metro:'М2' },
  { name:'ТРЦ Экспобел', time:'10:00–22:00', metro:'' },
  { name:'ТРЦ Червенский', time:'10:00–22:00', metro:'М2' },
];

/* ---------- State ---------- */
let cart = JSON.parse(localStorage.getItem('ad_cart') || '[]');
let activeCat = 'all';

const money = v => (v/100).toFixed(2) + ' BYN';
const findP = id => products.find(p => p.id === id);

/* ---------- Render ---------- */
function renderCats() {
  document.getElementById('cats').innerHTML = categories.map(c =>
    `<button class="cat ${c.key===activeCat?'active':''}" data-cat="${c.key}">${c.label}</button>`
  ).join('');
  document.querySelectorAll('.cat').forEach(b => {
    b.onclick = () => { activeCat = b.dataset.cat; renderCats(); renderMenu(); };
  });
}

function renderMenu() {
  const list = activeCat==='all' ? products : products.filter(p => p.cat===activeCat);
  document.getElementById('menuGrid').innerHTML = list.map(p => {
    const badgeCls = p.tag==='Хит' ? 'hot' : (p.tag==='Веган' ? 'veg' : '');
    return `
    <div class="card">
      <div class="card-img">
        ${p.tag ? `<span class="badge ${badgeCls}">${p.tag}</span>` : ''}
        <span class="glyph">${p.glyph}</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="card-foot">
          <div class="price">${money(p.price)}</div>
          <button class="add" data-add="${p.id}">В корзину</button>
        </div>
      </div>
    </div>`;
  }).join('');
  document.querySelectorAll('[data-add]').forEach(b => {
    b.onclick = () => addToCart(+b.dataset.add);
  });
}

function renderAddresses() {
  document.getElementById('addrGrid').innerHTML = addresses.map(a =>
    `<div class="addr">
       <strong>${a.name}${a.metro?`<span class="metro">${a.metro}</span>`:''}</strong>
       <span>${a.time}</span>
     </div>`
  ).join('');
}

/* ---------- Cart ---------- */
function saveCart() { localStorage.setItem('ad_cart', JSON.stringify(cart)); }

function addToCart(id) {
  const it = cart.find(i => i.id === id);
  if (it) it.qty++;
  else cart.push({ id, qty:1 });
  saveCart(); renderCart();
  toast('Добавлено в корзину');
}

function changeQty(id, delta) {
  const it = cart.find(i => i.id === id);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
}

function cartCount() { return cart.reduce((s,i)=>s+i.qty,0); }
function cartSum()   { return cart.reduce((s,i)=>s + findP(i.id).price * i.qty,0); }

function renderCart() {
  document.getElementById('cartCount').textContent = cartCount();
  const box = document.getElementById('cartItems');
  if (!cart.length) {
    box.innerHTML = `<div class="empty"><div class="big">🌯</div><p>Корзина пуста</p><p style="font-size:.85rem;margin-top:6px">Добавьте что-нибудь из меню</p></div>`;
  } else {
    box.innerHTML = cart.map(i => {
      const p = findP(i.id);
      return `
        <div class="ci">
          <div class="ci-img">${p.glyph}</div>
          <div class="ci-info"><b>${p.name}</b><small>${money(p.price)}</small></div>
          <div class="qty">
            <button data-dec="${i.id}">−</button>
            <span>${i.qty}</span>
            <button data-inc="${i.id}">+</button>
          </div>
          <div class="ci-sum">${money(p.price*i.qty)}</div>
        </div>`;
    }).join('');
    box.querySelectorAll('[data-inc]').forEach(b => b.onclick = () => changeQty(+b.dataset.inc, 1));
    box.querySelectorAll('[data-dec]').forEach(b => b.onclick = () => changeQty(+b.dataset.dec, -1));
  }

  const sum = cartSum();
  const totals = document.getElementById('totals');
  if (!cart.length) totals.innerHTML = '';
  else {
    const left = DELIVERY_FREE_FROM - sum;
    totals.innerHTML = `
      <div class="row"><span>Товары (${cartCount()})</span><span>${money(sum)}</span></div>
      <div class="row grand"><span>Итого</span><span>${money(sum)}</span></div>
      ${left > 0
        ? `<div class="free-note">До бесплатной доставки: ${money(left)}</div>`
        : `<div class="free-note">Доставка бесплатно 🎉</div>`}
    `;
  }
  document.getElementById('checkoutBtn').disabled = !cart.length;
}

/* ---------- Drawer ---------- */
const drawer  = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
function openDrawer()  { drawer.classList.add('on');  overlay.classList.add('on'); }
function closeDrawer() { drawer.classList.remove('on'); overlay.classList.remove('on'); }

document.getElementById('cartBtn').onclick    = openDrawer;
document.getElementById('closeDrawer').onclick = closeDrawer;
overlay.onclick = closeDrawer;

/* ---------- Checkout ---------- */
const checkoutModal = document.getElementById('checkoutModal');
const checkoutCard  = document.getElementById('checkoutCard');

document.getElementById('checkoutBtn').onclick = () => {
  closeDrawer();
  openCheckoutForm();
};

function openCheckoutForm() {
  const sum = cartSum();
  checkoutCard.innerHTML = `
    <h3>Оформление заказа</h3>
    <p class="sub">Заполните данные — и мы приступим к готовке.</p>

    <div class="toggle" id="typeToggle">
      <button data-type="delivery" class="active">Доставка</button>
      <button data-type="pickup">Самовывоз</button>
    </div>

    <form id="orderForm" novalidate>
      <div class="field" id="f-name">
        <label>Имя</label>
        <input name="name" type="text" placeholder="Как к вам обращаться" autocomplete="name">
        <div class="err">Укажите имя</div>
      </div>

      <div class="field" id="f-phone">
        <label>Телефон</label>
        <input name="phone" type="tel" placeholder="+375 (__) ___-__-__" autocomplete="tel">
        <div class="err">Введите корректный номер (+375 …)</div>
      </div>

      <div id="deliveryFields">
        <div class="field" id="f-address">
          <label>Адрес доставки</label>
          <input name="address" type="text" placeholder="Минск, улица, дом, квартира" autocomplete="street-address">
          <div class="err">Укажите адрес</div>
        </div>
      </div>

      <div id="pickupFields" style="display:none">
        <div class="field">
          <label>Точка самовывоза</label>
          <select name="pickup">
            ${addresses.map(a=>`<option>${a.name} (${a.time})</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="field">
        <label>Способ оплаты</label>
        <div class="radio-row">
          <label><input type="radio" name="pay" value="card" checked> Картой онлайн</label>
          <label><input type="radio" name="pay" value="cash"> Наличными</label>
        </div>
      </div>

      <div class="field">
        <label>Комментарий к заказу (необязательно)</label>
        <textarea name="comment" rows="2" placeholder="Без лука, соус отдельно..."></textarea>
      </div>

      <div class="totals">
        <div class="row"><span>Товары</span><span>${money(sum)}</span></div>
        <div class="row" id="deliveryRow"><span>Доставка</span><span>${sum>=DELIVERY_FREE_FROM?'бесплатно':money(DELIVERY_FEE)}</span></div>
        <div class="row grand"><span>К оплате</span><span id="payTotal">${money(sum + (sum>=DELIVERY_FREE_FROM?0:DELIVERY_FEE))}</span></div>
      </div>

      <div class="modal-actions">
        <button type="button" class="back" id="backBtn">Назад</button>
        <button type="submit" class="go">Подтвердить заказ</button>
      </div>
    </form>
  `;

  let type = 'delivery';
  const toggle          = checkoutCard.querySelector('#typeToggle');
  const deliveryFields  = checkoutCard.querySelector('#deliveryFields');
  const pickupFields    = checkoutCard.querySelector('#pickupFields');
  const deliveryRow     = checkoutCard.querySelector('#deliveryRow');
  const payTotal        = checkoutCard.querySelector('#payTotal');

  function recalc() {
    const fee = type==='delivery' && sum < DELIVERY_FREE_FROM ? DELIVERY_FEE : 0;
    deliveryRow.style.display = type==='delivery' ? '' : 'none';
    deliveryRow.innerHTML = `<span>Доставка</span><span>${fee ? money(fee) : 'бесплатно'}</span>`;
    payTotal.textContent = money(sum + fee);
  }

  toggle.querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      type = b.dataset.type;
      toggle.querySelectorAll('button').forEach(x=>x.classList.toggle('active', x===b));
      deliveryFields.style.display = type==='delivery' ? '' : 'none';
      pickupFields.style.display   = type==='pickup'   ? '' : 'none';
      recalc();
    };
  });
  recalc();

  checkoutCard.querySelector('#backBtn').onclick = () => { closeCheckout(); openDrawer(); };

  checkoutCard.querySelector('#orderForm').onsubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let ok = true;

    const nameF = checkoutCard.querySelector('#f-name');
    if (!form.name.value.trim()) { nameF.classList.add('invalid'); ok=false; }
    else nameF.classList.remove('invalid');

    const phoneF = checkoutCard.querySelector('#f-phone');
    const digits = form.phone.value.replace(/\D/g,'');
    if (digits.length < 11) { phoneF.classList.add('invalid'); ok=false; }
    else phoneF.classList.remove('invalid');

    if (type==='delivery') {
      const addrF = checkoutCard.querySelector('#f-address');
      if (!form.address.value.trim()) { addrF.classList.add('invalid'); ok=false; }
      else addrF.classList.remove('invalid');
    }

    if (!ok) return;

    const fee = type==='delivery' && sum < DELIVERY_FREE_FROM ? DELIVERY_FEE : 0;
    const order = {
      no: 'AD-' + Date.now().toString().slice(-6),
      items: cart.slice(),
      sum, fee, total: sum + fee,
      type, name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      address: type==='delivery' ? form.address.value.trim() : form.pickup.value,
      pay: form.pay.value,
      comment: form.comment.value.trim(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('ad_lastOrder', JSON.stringify(order));

    cart = [];
    saveCart(); renderCart();
    showSuccess(order);
  };

  checkoutModal.classList.add('on');
}

function closeCheckout() { checkoutModal.classList.remove('on'); }

function showSuccess(order) {
  checkoutCard.innerHTML = `
    <div class="success">
      <div class="check">✓</div>
      <h3>Заказ принят</h3>
      <p>Спасибо, ${escapeHtml(order.name)}. Уже начали готовить.</p>
      <div class="order-no">№ ${order.no}</div>
      <p>${order.type==='delivery' ? 'Доставка: ' + escapeHtml(order.address) : 'Самовывоз: ' + escapeHtml(order.address)}</p>
      <p>К оплате: <b style="color:var(--accent)">${money(order.total)}</b> (${order.pay==='card'?'картой онлайн':'наличными'})</p>
      <div class="modal-actions" style="justify-content:center">
        <button class="go" id="doneBtn">Готово</button>
      </div>
    </div>
  `;
  checkoutCard.querySelector('#doneBtn').onclick = () => {
    closeCheckout();
    setTimeout(()=>{ checkoutCard.innerHTML=''; }, 300);
  };
}

checkoutModal.onclick = (e) => { if (e.target === checkoutModal) closeCheckout(); };

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('on'), 1600);
}

/* ---------- Init ---------- */
renderCats();
renderMenu();
renderAddresses();
renderCart();

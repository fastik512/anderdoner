fetch('menu.json')
  .then(r => r.json())
  .then(data => {
    const promoList = document.getElementById('promo-list');
    data.promos.forEach(p => {
      const div = document.createElement('div');
      div.className = 'promo';
      div.textContent = p;
      promoList.appendChild(div);
    });

    const menuList = document.getElementById('menu-list');
    data.items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <div>
          <div class="name">${item.name}</div>
          <div class="desc">${item.desc}</div>
          <div class="weight">${item.weight}</div>
        </div>
        <div class="price">${item.price}</div>
      `;
      menuList.appendChild(div);
    });
  });
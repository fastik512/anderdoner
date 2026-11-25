// Вращение и интерактив шаурмы
const layers = document.querySelectorAll('.layer');
const label = document.getElementById('ing-label');
const btns = document.querySelectorAll('.ctrl-btn');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const targetLayer = btn.dataset.layer;
    label.textContent = btn.dataset.label;
    
    layers.forEach(layer => {
      if (layer.classList.contains(targetLayer)) {
        layer.style.transform = layer.style.transform.replace(/translateZ\([^)]+\)/, 'translateZ(120px)');
        layer.style.border = '2px solid #fff';
      } else {
        const baseZ = layer.classList.contains('meat') ? '60px' :
                      layer.classList.contains('veggie') ? '20px' :
                      layer.classList.contains('sauce') ? '-20px' : '-60px';
        layer.style.transform = layer.style.transform.replace(/translateZ\([^)]+\)/, `translateZ(${baseZ})`);
        layer.style.border = '2px solid rgba(255, 255, 255, 0.1)';
      }
    });
  });
});

// Подгрузка меню и акций
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
function formatCurrency(cents) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

function formatInstallments(cents, installments = 10) {
  const installmentValue = cents / 100 / installments;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(installmentValue);
}

const product = {
  img: 'assets/images/t-shirt.png',
  title: 'Lorem ipsum dolor sit amet consectetuer adipiscing elit',
  badge: 'novo',
  oldPrice: 10000,
  price: 7990,
  discount: 10,
};

const products = Array.from({ length: 8 }, () => product);

function createProductCard(prod) {
  const article = document.createElement('article');
  article.classList.add('card');

  article.innerHTML = `
    <img src="${prod.img}" alt="${prod.title}">
    <h3>${prod.title}</h3>
    <span class="badge">${prod.badge}</span>
    <div class="prices-container">
      <div class="prices">
        <p class="old-price"><s>${formatCurrency(prod.oldPrice)}</s></p>
        <p class="price">${formatCurrency(prod.price).replace(/R\$\s+/g, 'R$')}</p>
      </div>
      <span class="discount">${prod.discount}% OFF</span>
    </div>
    <p class="installments">Ou em até <span>10x de ${formatInstallments(prod.price)}</span></p>
    <button class="buy-btn">Comprar</button>
  `;

  return article;
}

function populateDropdownMenu() {
  const dropdownSideOptions = document.getElementById('dropdownSideOptions');
  const items = Array.from({ length: 12 }, () => "Departamento");

  items.forEach(label => {
    const li = document.createElement('li');
    li.textContent = label;

    const arrowIcon = `
      <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M4.45948 5.03932L1.27979 8.27623C0.987123 8.57459 0.512778 8.57459 0.219501 8.27623C-0.0731669 7.97892 -0.0731669 7.49559 0.219501 7.1978L2.86978 4.49986L0.219501 1.80232C-0.0731669 1.50453 -0.0731669 1.02185 0.219501 0.723405C0.512778 0.425531 0.987123 0.425531 1.27979 0.723405L4.45948 3.96032C4.60614 4.10958 4.67943 4.3048 4.67943 4.50002C4.67943 4.69524 4.60614 4.89038 4.45948 5.03932Z" />
      </svg>`;

    li.innerHTML += arrowIcon;
    dropdownSideOptions.appendChild(li);
  });
}

function setupCarousels() {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    products.forEach(product => track.appendChild(createProductCard(product)));

    nextBtn.addEventListener('click', () => {
      const firstCard = track.firstElementChild;
      const cardWidth = firstCard.getBoundingClientRect().width;

      track.style.transition = 'transform 0.4s ease';
      track.style.transform = `translateX(-${cardWidth}px)`;

      track.addEventListener('transitionend', function handler() {
        track.style.transition = 'none';
        track.appendChild(firstCard);
        track.style.transform = 'translateX(0)';
        track.removeEventListener('transitionend', handler);
      });
    });

    prevBtn.addEventListener('click', () => {
      const firstCard = track.firstElementChild;
      const lastCard = track.lastElementChild;
      const cardWidth = firstCard.getBoundingClientRect().width;

      track.insertBefore(lastCard, firstCard);
      track.style.transition = 'none';
      track.style.transform = `translateX(-${cardWidth}px)`;

      track.getBoundingClientRect();

      track.style.transition = 'transform 0.4s ease';
      track.style.transform = 'translateX(0)';
    });
  });
}

function setupDropdownToggle() {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('dropdown-menu--active');
    dropdownBtn.style.color = dropdownMenu.classList.contains('dropdown-menu--active') ? '#005CFF' : '#000';
  });
}

function createCategoryList() {
  const ul = document.createElement('ul');

  Array.from({ length: 8 }).forEach(() => {
    const li = document.createElement('li');
    li.textContent = 'Categoria';
    ul.appendChild(li);
  });

  return ul;
}

function populateCategoryColumns() {
  const categoryContainers = document.querySelectorAll('.dropdown-categories');
  categoryContainers.forEach(container => {
    const categoryList = createCategoryList();
    container.appendChild(categoryList);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  setupDropdownToggle();
  populateDropdownMenu();
  populateCategoryColumns();
  setupCarousels();
});

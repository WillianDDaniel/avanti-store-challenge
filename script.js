const product = {
  img: 'assets/images/t-shirt.png',
  title: 'Lorem ipsum dolor sit amet consectetuer adipiscing elit',
  badge: 'novo',
  oldPrice: 10000,
  price:   7990,
  discount: 10,
};

// Works with any number of products. And with products coming from an API
const products = Array.from({ length: 8 }, () => product);

function formatCurrency(cents) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cents / 100);
}

function formatInstallments(cents) {
  const installmentValue = (cents / 100) / 10;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(installmentValue);
}

function createCard(prod) {
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

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carousel => {
    const track   = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    products.forEach(prod => track.appendChild(createCard(prod)));

    nextBtn.addEventListener('click', () => {
      const firstCard = track.firstElementChild;
      const cardWidth = firstCard.getBoundingClientRect().width;

      track.style.transition = 'transform 0.4s ease';
      track.style.transform  = `translateX(-${cardWidth}px)`;

      track.addEventListener('transitionend', function handler() {
        track.style.transition = 'none';
        track.appendChild(firstCard);
        track.style.transform  = 'translateX(0)';
        track.removeEventListener('transitionend', handler);
      });
    });

    prevBtn.addEventListener('click', () => {
      const firstCard = track.firstElementChild;
      const lastCard  = track.lastElementChild;
      const cardWidth = firstCard.getBoundingClientRect().width;

      track.insertBefore(lastCard, firstCard);

      track.style.transition = 'none';
      track.style.transform  = `translateX(-${cardWidth}px)`;

      // Forçar reflow
      track.getBoundingClientRect();

      track.style.transition = 'transform 0.4s ease';
      track.style.transform  = 'translateX(0)';
    });
  });
});

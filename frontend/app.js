fetch('http://localhost:5000/api/restaurants')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('restaurant-list');
    data.forEach(restaurant => {
      const div = document.createElement('div');
      div.className = 'restaurant';

      let itemsHtml = '';
      restaurant.items.forEach(item => {
        itemsHtml += `<div class="item">${item.name} - ₹${item.price}</div>`;
      });

      div.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>Category: ${restaurant.category}</p>
        ${itemsHtml}
      `;

      container.appendChild(div);
    });
  })
  .catch(err => console.error(err));
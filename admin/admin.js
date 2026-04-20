document.getElementById('restaurantForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const restaurant = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value
  };

  const res = await fetch('http://localhost:5000/api/admin/restaurants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restaurant)
  });

  const data = await res.json();
  document.getElementById('message').innerText = data.message;
});
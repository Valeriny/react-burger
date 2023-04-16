const BURGER_API_URL = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


const getIngredients = async () => {
  return await fetch(`${BURGER_API_URL}/ingredients`).then(checkResponse);
};

const getOrder = () => {
  return fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c6',
      ],
    })
  })
    .then(checkResponse);
};

export {getIngredients, getOrder}


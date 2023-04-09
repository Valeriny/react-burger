const BURGER_API_URL = "https://norma.nomoreparties.space/api"

function checkResponse(res) {
  if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


const getIngredients = async () => {
  return await fetch(`${BURGER_API_URL}/ingredients`)
  .then(checkResponse);
}

export default getIngredients;

const getIngredients = async () => {
  return await fetch(`https://norma.nomoreparties.space/api/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export default getIngredients;

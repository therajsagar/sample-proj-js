// const URL = "https://demo2837922.mockable.io/flipkart-compare";
const URL = "./data.json";

function getLocalStorage(param) {
  return JSON.parse(localStorage.getItem(param));
}

function setLocalStorage(param, data) {
  localStorage.setItem(param, JSON.stringify(data));
}

(async () => {
  const resp = await fetch(URL);
  const { products } = await resp.json();
  setLocalStorage("compareSummary", products.compareSummary);
  setLocalStorage("featuresList", products.featuresList);
  render();
})();

function render() {}

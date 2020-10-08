const api =
  'https://demo2837922.mockable.io/flipkart-compare';

let compareSummary = [];
let featuresList = [];
let selectedProducts = ['TVSF2WYXTKAR7RAF', 'TVSF2WYUE4PWNJKM'];

const fetchData = () => {
  fetch(api)
    .then(resp => resp.json())
    .then(data => {
      featuresList = data.products.featuresList;
      compareSummary = data.products.compareSummary;
    })
    .then(() => render());
};

const renderFeatures = () => {
  const listDiv = document.getElementById('feature-list');
  let divs = '<div>';
  featuresList.forEach(feature => {
    const { title, features } = feature;
    divs += `<header>${title}</header>`;
    features.forEach(kind => {
      const { featureName, values } = kind;
      divs += `<div class="row"><div class="f-name">${featureName}</div>`;
      selectedProducts.forEach(product => {
        divs += `<div class="f-name">${values[product] || ''}</div>`;
      });
      divs += '</div>';
    });
  });
  divs += '</div>';
  listDiv.innerHTML = divs;
};

const renderProducts = () => {
  const dispDiv = document.getElementById('display');
  let divs =
    '<div class="compare"><p>Compare</p></div><div class="img-container">';
  selectedProducts.forEach(product => {
    if (product === 'demo') {
      divs +=
        '<div class="btn-container"><div class="empty"></div> <select id="selectProduct"><option value=""></option></select></div>';
    } else {
      divs += `<div class="btn-container"><img src="${
        compareSummary.images[product]
      }" /><button class="close" idx="${product}">x</button></div>`;
    }
  });
  divs += '</div>';
  dispDiv.innerHTML = divs;
};

const addClickHandlers = () => {
  let closeBtns = document.getElementsByClassName('close');
  for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].addEventListener('click', onCloseClick, false);
  }
};

function onCloseClick() {
  let idx = this.getAttribute('idx');
  selectedProducts = selectedProducts.filter(product => product !== idx);
  if (selectedProducts.length < 2) selectedProducts.push('demo');
  render();
  addDropdown();
}

const addDropdown = () => {
  let dropdown = document.getElementById('selectProduct');
  Object.keys(compareSummary.titles).forEach(title => {
    if (!selectedProducts.includes(title)) {
      let el = document.createElement('option');
      el.textContent = title;
      el.value = title;
      dropdown.appendChild(el);
    }
  });
  addEventListenerToDropdown();
};

const addEventListenerToDropdown = () => {
  let dropdown = document.getElementById('selectProduct');
  dropdown.addEventListener('change', onOptionChange, false);
};

function onOptionChange() {
  selectedProducts = selectedProducts.filter(product => product !== 'demo');
  selectedProducts.push(this.value);
  if (selectedProducts.length < 2) {
    selectedProducts.push('demo');
    render();
    addDropdown();
  } else render();
}

fetchData();

const render = () => {
  renderFeatures();
  renderProducts();
  addClickHandlers();
};

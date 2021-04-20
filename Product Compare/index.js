// const API_ENDPT = "https://demo2837922.mockable.io/flipkart-compare";
const API_ENDPT = "./data.json";

let featuresList = [];
let compareSummary = {};
let productList = [];
let selectedProducts = [];

const bannerWrapperMain = document.getElementById("banner-wrapper");
const featuresListWrapperMain = document.getElementById("features-list");

(() => {
  fetch(API_ENDPT)
    .then((res) => res.json())
    .then((data) => {
      const { products } = data;
      featuresList = products.featuresList;
      compareSummary = products.compareSummary;
      productList = Object.keys(compareSummary.titles);
      selectedProducts = productList.slice(0, 2);
      initiateRender();
    });
})();

function onDropDownOptionChange() {
  selectedProducts = selectedProducts.filter(
    (item) => item !== "emptyPlaceholder"
  );

  selectedProducts.push(this.value);

  if (selectedProducts.length < 2) {
    selectedProducts.push("emptyPlaceholder");
  }

  initiateRender();
}

const renderBanners = () => {
  if (bannerWrapperMain.children.length) {
    bannerWrapperMain.innerHTML = "";
  }

  const compareContainer = document.createElement("div");
  compareContainer.innerHTML = "Compare";
  compareContainer.classList.add("compare");

  const bannerImgContainer = document.createElement("div");
  bannerImgContainer.classList.add("banner-img-container");

  selectedProducts.forEach((prod) => {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    if (prod === "emptyPlaceholder") {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("empty-div-item");

      const selectEl = document.createElement("select");
      selectEl.setAttribute("id", "select-product");

      productList
        .filter((item) => !selectedProducts.includes(item))
        .forEach((pItem) => {
          const option = document.createElement("option");
          option.text = pItem;
          option.value = pItem;

          selectEl.add(option);
        });

      selectEl.selectedIndex = -1;

      selectEl.addEventListener("change", onDropDownOptionChange);

      imgContainer.appendChild(emptyDiv);
      imgContainer.appendChild(selectEl);
    } else {
      const img = document.createElement("img");
      img.classList.add("img-banner-item");
      img.setAttribute("src", compareSummary.images[prod]);
      img.setAttribute("alt", prod);

      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "x";
      closeBtn.classList.add("close-btn");

      closeBtn.addEventListener("click", () => {
        selectedProducts = selectedProducts.filter((id) => id !== prod);

        if (selectedProducts.length < 2) {
          selectedProducts.push("emptyPlaceholder");
        }

        initiateRender();
      });

      const mainInfoWrapper = document.createElement("div");
      mainInfoWrapper.classList.add("item-title-info");

      const titleEl = document.createElement("div");
      titleEl.innerText = compareSummary.titles[prod]?.title;

      const subtitleEl = document.createElement("div");
      subtitleEl.innerText = compareSummary.titles[prod]?.subtitle;

      const priceSummaryInfo = compareSummary.productPricingSummary[prod];

      const priceSummaryEl = document.createElement("div");
      priceSummaryEl.classList.add("pricing-summary");

      const finalPriceEl = document.createElement("span");
      finalPriceEl.classList.add("final-price");
      finalPriceEl.innerHTML = "&#8377;" + priceSummaryInfo.finalPrice;

      const originalPriceEl = document.createElement("span");
      originalPriceEl.classList.add("original-price");
      originalPriceEl.innerHTML = "&#8377;" + priceSummaryInfo.price;

      const discountEl = document.createElement("span");
      discountEl.classList.add("discount-perc");
      discountEl.innerText = priceSummaryInfo.totalDiscount + "%";

      priceSummaryEl.appendChild(finalPriceEl);
      priceSummaryEl.appendChild(originalPriceEl);
      priceSummaryEl.appendChild(discountEl);

      mainInfoWrapper.appendChild(titleEl);
      mainInfoWrapper.appendChild(subtitleEl);
      mainInfoWrapper.appendChild(priceSummaryEl);

      imgContainer.appendChild(img);
      imgContainer.appendChild(closeBtn);
      imgContainer.appendChild(mainInfoWrapper);
    }

    bannerImgContainer.appendChild(imgContainer);
  });

  bannerWrapperMain.appendChild(compareContainer);
  bannerWrapperMain.appendChild(bannerImgContainer);
};

const renderFeatures = () => {
  featuresListWrapperMain.innerHTML = "";

  const featureFragment = document.createDocumentFragment();

  featuresList.forEach((fItem) => {
    const { title, features } = fItem;

    const featWrapperGroup = document.createElement("div");
    featWrapperGroup.classList.add("features-wrapper");

    const headerEl = document.createElement("div");
    headerEl.classList.add("feature-header");
    headerEl.innerText = title;

    const rowWrapperFragment = new DocumentFragment();

    features.forEach((featureInfo) => {
      const { featureName, values } = featureInfo;

      const rowItemEl = document.createElement("div");
      rowItemEl.classList.add("feat-row-item");

      const rowTitle = document.createElement("div");
      rowTitle.classList.add("feat-row-name");
      rowTitle.innerText = featureName;

      rowItemEl.appendChild(rowTitle);

      const rowValWrapperEl = document.createElement("div");
      rowValWrapperEl.classList.add("feat-row-value-wrapper");

      selectedProducts.forEach((pItem) => {
        if (pItem !== "emptyPlaceholder") {
          const rowvalEl = document.createElement("div");
          rowvalEl.classList.add("feat-row-value");
          rowvalEl.innerText = values[pItem];

          rowValWrapperEl.appendChild(rowvalEl);
        }
      });
      rowItemEl.appendChild(rowValWrapperEl);

      rowWrapperFragment.appendChild(rowItemEl);
    });

    featWrapperGroup.appendChild(headerEl);
    featWrapperGroup.appendChild(rowWrapperFragment);

    featureFragment.appendChild(featWrapperGroup);
  });

  featuresListWrapperMain.appendChild(featureFragment);
};

//

function initiateRender() {
  renderBanners();
  renderFeatures();
}

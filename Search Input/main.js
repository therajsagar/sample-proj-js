const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

(() => {
  const inp = document.getElementById("myInput");
  let currentFocus;
  inp.addEventListener("input", ({ target: { value, parentNode } }) => {
    closeACList();
    if (!value.trim()) {
      return false;
    }
    currentFocus = -1;
    const acList = document.createElement("DIV");
    acList.setAttribute("class", "ac-list");
    parentNode.appendChild(acList);

    country_list.forEach(c => {
      const startIndex = c.toLowerCase().indexOf(value.toLowerCase());
      if (startIndex > -1) {
        const endIndex = startIndex + value.length;
        const acItem = document.createElement("DIV");
        acItem.innerHTML =
          c.slice(0, startIndex) +
          "<strong>" +
          c.slice(startIndex, endIndex) +
          "</strong>" +
          c.slice(endIndex);

        acItem.addEventListener("click", () => {
          inp.value = c;
          closeACList();
        });

        acItem.addEventListener("mouseover", () => console.log("FUCk"));

        acList.appendChild(acItem);
      }
    });
  });

  inp.addEventListener("keydown", ev => {
    const { keyCode } = ev;
    let list = document.querySelector(".ac-list");
    if (list) {
      list = list.getElementsByTagName("div");
    }

    if (keyCode === 40) {
      currentFocus++;
      addActive(list);
    } else if (keyCode === 38) {
      currentFocus--;
      addActive(list);
    } else if (keyCode === 13) {
      ev.preventDefault();
      if (currentFocus > -1) {
        if (list) {
          list[currentFocus].click();
        }
      }
    }
  });

  const addActive = list => {
    if (!list) {
      return false;
    }
    removeActive(list);
    if (currentFocus >= list.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = list.length - 1;
    }
    list[currentFocus].classList.add("ac-active");
  };

  const removeActive = list => {
    for (let item of list) {
      item.classList.remove("ac-active");
    }
  };

  const closeACList = target => {
    const acList = document.getElementsByClassName("ac-list");
    for (let item of acList) {
      if (target != item && target != inp) {
        item.parentNode.removeChild(item);
      }
    }
  };

  document.addEventListener("click", ({ target }) => closeACList(target));
})();

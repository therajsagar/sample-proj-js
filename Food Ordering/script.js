(async function () {
    let list = getLocalStorage('menu');
    if (!list.length) {
        const api = await fetch('./data.json');
        let {
            data
        } = await api.json();
        list = data.map(i => ({
            ...i,
            fav: false
        }));
        setLocalStorage('menu', list);
    }
    setLocalStorage('results', list);
    generateView(list);
})()


function getLocalStorage(param) {
    return JSON.parse(localStorage.getItem(param)) || [];
}

function setLocalStorage(param, list) {
    localStorage.setItem(param, JSON.stringify(list));
}


function createTagElement(name) {
    const tag = document.createElement('span');
    tag.innerHTML = `#${name}`;
    tag.classList.add('tagitem');
    return tag;
}



function generateCard(data) {
    const item = document.createElement('div');
    item.id = data.ID;
    item.classList.add('sub-container');
    const img = document.createElement('img');
    img.src = data.img;
    img.classList.add('item-img');
    const subdiv = document.createElement('div');
    const label = document.createElement('p');
    label.classList.add('label')
    label.innerHTML = data.Name;
    const loca = document.createElement('p');
    loca.classList.add('location');
    loca.innerHTML = data.location;
    const locimg = document.createElement('img');
    locimg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIzMUB0QDcMBSfnZoQQexkXL4mL7NhR2ymvlEliDnM9It1yuT'
    loca.appendChild(locimg)
    const sublabel = document.createElement('p');
    const rating = document.createElement('span');
    rating.innerHTML = `${data.Rating} &#9733;`;
    rating.classList.add('rating')
    const eta = document.createElement('span');
    eta.classList.add('eta')
    eta.innerHTML = `ETA : ${data.ETA} mins`;
    const tags = document.createElement('p');
    tags.classList.add('tags');
    for (i of data.tags) {
        const tagItem = createTagElement(i);
        tags.appendChild(tagItem)
    }
    sublabel.appendChild(eta);
    sublabel.appendChild(rating);
    subdiv.appendChild(label);
    subdiv.appendChild(loca)
    subdiv.appendChild(sublabel);
    subdiv.appendChild(tags)
    item.appendChild(img);
    item.appendChild(subdiv);
    return item;
}


function generateView(list) {
    const view = document.getElementById('main-container');
    view.innerHTML = "";
    if (list.length) {
        for (i of list) {
            view.appendChild(generateCard(i))
        }
    } else {
        view.appendChild(noData())
    }
    setLocalStorage('current', list);
}


function sortBy(value) {
    let list = getLocalStorage('current');
    if (value === 'Name') {
        list.sort((i, j) => i.Name.localeCompare(j.Name));
    } else {
        list.sort((i, j) => value === 'ETA' ? i[value] - j[value] : j[value] - i[value])
    }
    generateView(list);
}


function filterBy(value) {
    let list = getLocalStorage('results');
    resetPageFilters('sort-by');
    if (value !== 'All') {
        list = list.filter(({
            tags
        }) => tags.includes(value))
    }
    generateView(list);
}


function search() {
    const ip = document.getElementById('ip');
    const value = ip.value.toLowerCase().trim();
    if (value) {
        resetPageFilters('sort-by');
        resetPageFilters('filter-by');
        let list = getLocalStorage('menu');
        list = list.filter(i => i.Name.toLowerCase().includes(value));
        setLocalStorage('results', list);
        generateView(list);
    } else {
        ip.value = "";
    }
}

const resetPage = () => location.reload();



function noData() {
    const noResult = document.createElement('div');
    noResult.innerText = 'No Matching Results';
    noResult.id = 'no-results';
    return noResult;
}

function resetPageFilters(id) {
    const el = document.getElementById(id);
    el.selectedIndex = "0";
}
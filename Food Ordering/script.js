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
    item.id = data.id;
    item.classList.add('sub-container');
    const img = document.createElement('img');
    img.src = data.img;
    img.classList.add('item-img');
    const subdiv = document.createElement('div');
    const label = document.createElement('p');
    label.classList.add('label')
    label.innerHTML = data.name;
    const loca = document.createElement('p');
    loca.classList.add('location');
    loca.innerHTML = data.location;
    const locimg = document.createElement('img');
    locimg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSIzMUB0QDcMBSfnZoQQexkXL4mL7NhR2ymvlEliDnM9It1yuT'
    loca.appendChild(locimg)
    const sublabel = document.createElement('p');
    const rating = document.createElement('span');
    rating.innerHTML = `${data.rating} &#9733;`;
    rating.classList.add('rating')
    const eta = document.createElement('span');
    eta.classList.add('eta')
    eta.innerHTML = `ETA : ${data.eta} mins`;
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
    const view = document.getElementById('main-container')
    for (i of list) {
        view.appendChild(generateCard(i))
    }
}
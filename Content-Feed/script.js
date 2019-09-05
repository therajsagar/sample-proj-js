(function () {
    let fileList = getLocalStorage();
    if (fileList.length > 0) {
        fileList.forEach(({
            file,
            type
        }) => {
            file && type && createPost(file, type)
        });
    }
})()


function getLocalStorage() {
    return JSON.parse(localStorage.getItem('content-list')) || [];
}

function setLocalStorage(list) {
    localStorage.setItem("content-list", JSON.stringify(list));
}

function saveToLocalStorage(file, type) {
    const list = getLocalStorage();
    const key = `post-${list.length + 1}`;
    list.push({
        file,
        type,
        key
    });
    setLocalStorage(list);
}


function onSubmit() {
    const field = document.querySelector('input[type="file"]');
    const outputField = document.querySelector('.output');
    for (let file of field.files) {
        file && uploadContent(file);
    }
    outputField.innerHTML = '';
    field.value = "";
}


function uploadContent(input) {
    let fileType = input.type.split('/')[0];
    if (fileType === 'image') {
        fileType = 'img'
    }
    const reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
        const url = reader.result;
        saveToLocalStorage(url, fileType);
        createPost(url, fileType);
    }
}


function createPost(url, fileType) {
    const parentContainer = document.querySelector('.feed');
    const childContainer = document.createElement('div');
    childContainer.setAttribute('class', 'post-wrapper');
    let element = document.createElement(fileType);
    if (fileType === 'image') {
        element.setAttribute('alt', '')
    } else {
        element.setAttribute('controls', 'true');
    }
    element.setAttribute('src', url);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', deletePost);
    deleteButton.setAttribute('class', 'delete-btn');
    childContainer.appendChild(element);
    childContainer.appendChild(deleteButton);
    childContainer.setAttribute('id', `post-${parentContainer.children.length+1}`);
    parentContainer.appendChild(childContainer);
}


function deletePost(e) {
    const node = e.target.parentNode;
    let list = getLocalStorage();
    list = list.filter(({
        key
    }) => key !== node.id);
    setLocalStorage(list)
    node.remove();
}

(function (window) {
    function triggerCallback(e, callback) {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        callback.call(null, files);
    }

    function makeDroppable(ele, callback) {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'audio/*,video/*,image/*')
        input.setAttribute('capture', 'true');
        input.setAttribute('multiple', 'true')
        input.style.display = 'none';
        input.addEventListener('change', function (e) {
            triggerCallback(e, callback);
        });
        ele.appendChild(input);

        ele.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.add('dragover');
        });

        ele.addEventListener('dragleave', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
        });

        ele.addEventListener('drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
            triggerCallback(e, callback);
        });

        ele.addEventListener('click', function () {
            input.value = null;
            input.click();
        });
    }
    window.makeDroppable = makeDroppable;
})(this);


(function (window) {
    makeDroppable(window.document.querySelector('.demo-droppable'), function (files) {
        const fileInput = document.querySelector('input[type="file"]');
        fileInput.files = files;
        let output = document.querySelector('.output');
        output.innerHTML = '';
        for (let i = 0; i < files.length; i++) {
            output.innerHTML += '<p>' + files[i].name + '</p>';
        }
    });
})(this);
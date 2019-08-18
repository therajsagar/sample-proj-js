function reIndexing(parentNode) {
  const prefix = parentNode.id.split('-')[0];
  const list = parentNode.children;
  for (let i = 0; i < list.length; i++) {
    list[i].setAttribute('id', `${prefix}-${i}`);
  }
}

function deleteHandler(ev) {
  const node = ev.target.parentNode;
  const parent = node.parentNode;
  parent.removeChild(node);
  reIndexing(parent);
}

function assignDelete() {
  const delButton = document.createElement('button');
  delButton.innerHTML = '&#x274C';
  delButton.addEventListener('click', deleteHandler);
  delButton.setAttribute('class', 'deleteTask');
  return delButton;
}

function createNode(value, id) {
  const newNode = document.createElement('div');
  newNode.innerHTML = value;
  newNode.setAttribute('class', 'dropzone');
  newNode.setAttribute('id', id);
  newNode.setAttribute('draggable', 'true');
  newNode.addEventListener('dragstart', dragStart);
  newNode.addEventListener('dragenter', dragEnter);
  newNode.addEventListener('dragleave', dragLeave);
  const delButton = assignDelete();
  newNode.appendChild(delButton);
  return newNode;
}

function addtask(ev) {
  ev.preventDefault();
  const { name } = ev.target;
  const inputField = document.querySelector(`div.${name} input`);
  const value = inputField.value.trim();
  if (value) {
    const list = document.querySelector(`div#${name}-fields`);
    const newNode = createNode(value, `${name}-${list.children.length}`);
    list.insertBefore(newNode, list.lastElementChild);
    reIndexing(list);
    inputField.value = '';
  }
}

const dragStart = ev => ev.dataTransfer.setData('text', ev.target.id);

const dragEnter = ev => ev.target.classList.add('hovering');

const dragLeave = ev => ev.target.classList.remove('hovering');

const allowDrop = ev => {
  ev.preventDefault();
  const targetEl = ev.target.id.split('-')[1];
  if (targetEl !== 'fields') {
    ev.target.classList.add('hovering');
  }
};

function onDrop(ev) {
  ev.preventDefault();
  ev.target.classList.remove('hovering');
  const { parentNode } = ev.target;
  const data = document.getElementById(ev.dataTransfer.getData('text'));
  const prevParent = data.parentNode;
  parentNode.insertBefore(data, ev.target);
  reIndexing(prevParent);
  reIndexing(parentNode);
}

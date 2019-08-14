const addtask = e => {
  const { name } = e.target;
  const inputField = document.querySelector(`div.${name} input`);
  const value = inputField.value.trim();
  if (value) {
    //const target = document.getElementById(`${name}-fields`);
    const list = document.querySelectorAll(`div#${name}-fields div`);
    for (i in list) {
      if (!list[i].innerHTML) {
        const newNode = document.createElement('span');
        newNode.innerHTML = value;
        newNode.setAttribute('draggable', 'true');
        newNode.setAttribute('id', `${name}${i}`);
        newNode.addEventListener('dragend', dragEnd);
        list[i].appendChild(newNode);
        break;
      }
    }
    inputField.value = '';
  }
};

dragEnd = e => {
  console.log(e);
};

myFunction = e => console.log(e);

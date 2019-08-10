const addtask = e => {
  const { name } = e.target;
  const inputField = document.querySelector(`div.${name} input`);
  if (inputField.value) {
    //const target = document.getElementById(`${name}-fields`);
    const list = document.querySelectorAll(`div#${name}-fields div`);
    for (i of list) {
      if (!i.innerHTML) {
        i.innerHTML = inputField.value;
        inputField.value = '';
        break;
      }
    }
  }
};

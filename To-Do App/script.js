const addtask = e => {
  const { name } = e.target;
  const inputField = document.querySelector(`div.${name} input`);
  const value = inputField.value.trim();
  if (value) {
    //const target = document.getElementById(`${name}-fields`);
    const list = document.querySelectorAll(`div#${name}-fields div`);
    for (i of list) {
      if (!i.innerHTML) {
        i.innerHTML = value;
        break;
      }
    }
    inputField.value = '';
  }
};

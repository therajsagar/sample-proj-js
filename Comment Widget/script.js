function reIndexing(parentNode) {
  const list = parentNode.children;
  const tasks = [];
  for (let i = 0; i < list.length; i++) {
    list[i].setAttribute('id', `${parentNode.id}-${i}`);
    tasks.push(list[i].textContent);
  }
  console.log(tasks);
}

function addComment(ev) {
  ev.preventDefault();
  const commentField = document.querySelector('textarea[name="main-comment"]');
  const value = commentField.value.trim();
  if (value) {
    const commentSection = document.getElementById('mt');
    const newNode = document.createElement('div');
    newNode.innerHTML = value;
    commentSection.appendChild(newNode);
    reIndexing(commentSection);
  }
  commentField.value = '';
}

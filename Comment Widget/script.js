function reIndexing(parentNode) {
  const list = parentNode.children;
  const tasks = [];
  for (let i = 0; i < list.length; i++) {
    list[i].setAttribute('id', `${parentNode.id}-${i}`);
    tasks.push(list[i].textContent);
  }
  console.log(tasks);
}

function appendComment(parentnode, value) {
  const newNode = document.createElement('div');
  const commentText = document.createElement('span');
  commentText.innerHTML = value;
  const replyButton = document.createElement('button');
  replyButton.innerHTML = 'Reply';
  replyButton.addEventListener('click', replyOnComment);
  newNode.appendChild(commentText);
  newNode.appendChild(replyButton);
  parentnode.appendChild(newNode);
  reIndexing(parentnode);
}

function addComment(ev) {
  ev.preventDefault();
  const commentField = document.querySelector('textarea[name="main-comment"]');
  const value = commentField.value.trim();
  if (value) {
    const commentSection = document.getElementById('mt');
    appendComment(commentSection, value);
    reIndexing(commentSection);
  }
  commentField.value = '';
}

function replyOnComment(e) {
  const ip = document.createElement('textarea');
  const bt = document.createElement('button');
  bt.innerHTML = 'reply';
  const prd = document.createElement('div');
  prd.appendChild(ip);
  prd.appendChild(bt);
  const parentnode = e.target.parentNode;
  parentnode.appendChild(prd);
  bt.addEventListener('click', () => {
    console.log(ip.value);
    appendComment(parentnode, ip.value);
    prd.remove();
  });
}

function reIndexing(parentNode) {
  const list = parentNode.children;
  const tasks = [];
  for (let i = 0; i < list.length; i++) {
    list[i].setAttribute('id', `${parentNode.id}-${i}`);
    tasks.push(list[i].textContent);
  }
}

function appendComment(parentnode, value) {
  const newNode = document.createElement('div');
  const commentText = document.createElement('span');
  commentText.innerHTML = value;

  const replyButton = document.createElement('button');
  replyButton.setAttribute('class', 'reply');
  replyButton.innerHTML = 'Reply';
  replyButton.addEventListener('click', replyOnComment);

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete');
  deleteButton.innerHTML = 'Delete';
  deleteButton.addEventListener('click', deleteAComment);

  const editButton = document.createElement('button');
  editButton.setAttribute('class', 'edit');
  editButton.innerHTML = 'Edit';
  editButton.addEventListener('click', editTheComment);

  const likeButton = document.createElement('button');
  likeButton.setAttribute('class', 'like');
  likeButton.innerHTML = 'like';
  likeButton.addEventListener('click', likeTheComment);

  const likeCount = document.createElement('span');
  likeCount.innerHTML = '0';
  likeCount.setAttribute('class', 'likeCount');

  const sectionNode = document.createElement('section');
  sectionNode.appendChild(commentText);
  sectionNode.appendChild(likeCount);
  sectionNode.appendChild(likeButton);
  sectionNode.appendChild(replyButton);
  sectionNode.appendChild(editButton);
  sectionNode.appendChild(deleteButton);

  newNode.appendChild(sectionNode);
  parentnode.appendChild(newNode);
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

function commentOperations(parentNode, type) {
  disableEnableAllButtons(true);
  const input = document.createElement('textarea');
  const tempButton = document.createElement('button');
  tempButton.innerHTML = 'Done';
  tempButton.setAttribute('class', 'reply');
  const replyWidget = document.createElement('div');
  replyWidget.appendChild(input);
  replyWidget.appendChild(tempButton);
  parentNode.appendChild(replyWidget);
  tempButton.addEventListener('click', () => {
    const value = input.value.trim();
    if (value) {
      if (type === 'reply') {
        appendComment(parentNode, input.value);
      } else {
        parentNode.children[0].innerHTML = input.value;
      }
      replyWidget.remove();
      disableEnableAllButtons(false);
    }
  });
}

function replyOnComment(e) {
  const parentnode = e.target.parentNode;
  commentOperations(parentnode, 'reply');
}

function deleteAComment(e) {
  e.target.parentNode.parentNode.remove();
}

function editTheComment(e) {
  const parentnode = e.target.parentNode;
  commentOperations(parentnode, 'edit');
}

function disableEnableAllButtons(disable) {
  const buttonArray = document.querySelectorAll('button');
  buttonArray.forEach(bt => (bt.disabled = disable));
}

function likeTheComment(e) {
  const likes = e.target.previousSibling;
  likes.innerHTML = Number(likes.innerHTML) + 1;
}

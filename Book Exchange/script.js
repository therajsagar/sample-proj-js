const booksData = [
  {
    id: "1",
    title: "Title1",
    author: "Author1",
    lender: "UserC",
    borrower: "UserB",
    action: { requestedBy: "" },
  },
  {
    id: "2",
    title: "Title2",
    author: "Author1",
    lender: "UserC",
    borrower: "",
    action: { requestedBy: "" },
  },
  {
    id: "3",
    title: "Title3",
    author: "Author3",
    lender: "UserD",
    borrower: "UserC",
    action: { requestedBy: "UserB" },
  },
  {
    id: "4",
    title: "Title4",
    author: "Author5",
    lender: "UserA",
    borrower: "",
    action: { requestedBy: "" },
  },
  {
    id: "5",
    title: "Title5",
    author: "Author5",
    lender: "UserA",
    borrower: "",
    action: { requestedBy: "" },
  },
  {
    id: "6",
    title: "Title6",
    author: "Author6",
    lender: "UserB",
    borrower: "UserA",
    action: { requestedBy: "" },
  },
];

const inputEl = document.getElementById("login-inp");
const loginBtn = document.getElementById("submit-btn");
const tableDIV = document.getElementById("content-table");

const getFromStore = (key) => JSON.parse(localStorage.getItem(key));
const removeFromStore = (key) => localStorage.removeItem(key);
const setStore = (key, data) => localStorage.setItem(key, JSON.stringify(data));

window.onload = () => {
  const data = getBookData();
  generateTable(data);
  authenticateUser();
};

function getBookData() {
  let data = getFromStore("book-data");
  if (!data) {
    setStore("book-data", booksData);
    data = booksData;
  }
  return data;
}

function submitLogin({ target }) {
  const isLoggedIn = getFromStore("logged-user");
  if (isLoggedIn) {
    removeFromStore("logged-user");
    target.innerText = "Submit";
    inputEl.disabled = false;
    inputEl.value = "";
    document.querySelectorAll(".action-btn").forEach((bt) => {
      bt.disabled = true;
    });
  } else {
    authenticateUser(true);
  }
  window.location.reload();
}

function authenticateUser(loginViaSubmit = false) {
  let loggedUser = "";
  if (loginViaSubmit) {
    const value = inputEl.value;
    loggedUser = ["UserA", "UserB", "UserC", "UserD"].filter(
      (usr) => usr.toLowerCase() === value.toLowerCase()
    )[0];
    if (loggedUser) {
      setStore("logged-user", loggedUser);
    } else {
      inputEl.classList.add("error");
      setTimeout(() => inputEl.classList.remove("error"), 400);
    }
  } else {
    loggedUser = getFromStore("logged-user");
  }

  if (loggedUser) {
    loginBtn.innerText = "Logout";
    inputEl.disabled = true;
    inputEl.value = loggedUser;
    document.querySelectorAll(".action-btn").forEach((bt) => {
      bt.disabled = false;
    });
  }
}

function generateTable(data) {
  const tableRows = Object.keys(data[0]);
  const table = document.createElement("table");
  table.setAttribute("id", "booksTable");

  const tr = table.insertRow(-1);

  // add table header
  tableRows.forEach((name) => {
    const th = document.createElement("th");
    th.innerHTML = name;
    th.classList.add(`${name}-col`);
    tr.appendChild(th);
  });

  tableDIV.appendChild(table);

  // add table rows values
  data.concat([null]).forEach((item) => generateRow(item));
}

function generateRow(info) {
  const loggedUser = getFromStore("logged-user");
  const table = document.getElementById("booksTable");
  const tr = table.insertRow();
  if (!info && loggedUser) {
    const rowNo = tr.rowIndex;
    const newRowData = {
      id: rowNo,
      title: "",
      author: "",
      lender: loggedUser,
      borrower: "",
      action: { requestedBy: "" },
    };

    for (let i in newRowData) {
      const td = tr.insertCell();
      switch (i) {
        case "id":
        case "lender":
        case "borrower":
          td.innerHTML = newRowData[i] || "__";
          break;
        case "action":
          const btn = document.createElement("button");
          btn.innerText = "Add book";
          btn.addEventListener("click", () =>
            actionBtnClick("Add", newRowData)
          );
          td.appendChild(btn);
          break;
        case "author":
        case "title":
          const ip = document.createElement("input");
          ip.placeholder = i;
          ip.addEventListener("input", ({ target: { value } }) => {
            newRowData[i] = value;
          });
          td.appendChild(ip);
          break;
      }
      td.classList.add(`${i}-col`);
    }
  } else {
    for (let i in info) {
      const td = tr.insertCell();
      if (i === "action") {
        generateActionColumn(info, td);
      } else {
        td.innerHTML = info[i] || "__";
      }
      td.classList.add(`${i}-col`);
    }
  }
}

function actionMapper({ borrower, lender }, loggedUser) {
  if (borrower) {
    if (lender !== loggedUser) {
      return borrower === loggedUser ? "Return" : "Request Next";
    }
  } else {
    if (lender !== loggedUser) {
      return "Borrow";
    } else {
      return "Delete";
    }
  }
}

function generateActionColumn(info, td) {
  const loggedUser = getFromStore("logged-user");

  if (!loggedUser) {
    td.innerHTML = "__";
    return;
  }

  if (info.action.requestedBy && info.borrower !== loggedUser) {
    td.innerHTML = `Requested by ${info.action.requestedBy}`;
  } else {
    const actionInfo = actionMapper(info, loggedUser);
    if (!actionInfo) {
      td.innerHTML = "__";
    } else {
      const btn = document.createElement("button");
      btn.innerText = actionInfo;
      btn.addEventListener("click", () => actionBtnClick(actionInfo, info));
      btn.classList.add(`action-btn`);
      btn.disabled = true;
      td.appendChild(btn);
    }
  }
}

function actionBtnClick(action, info) {
  let data = getFromStore("book-data");
  const loggedUser = getFromStore("logged-user");
  if (!loggedUser) {
    return;
  }

  if (action === "Add") {
    data.push(info);
  } else if (action === "Delete") {
    data = data
      .filter((i) => i.title !== info.title)
      .map((i, j) => ({ ...i, id: j + 1 }));
  } else {
    data.forEach((i) => {
      if (i.title === info.title) {
        if (action === "Return") {
          i.borrower = i.action.requestedBy || "";
          if (i.action.requestedBy) {
            i.action.requestedBy = "";
          }
        } else if (action === "Borrow") {
          i.borrower = loggedUser;
        } else if (action === "Request Next") {
          i.action.requestedBy = loggedUser;
        }
      }
    });
  }

  setStore("book-data", data);
  window.location.reload();
}

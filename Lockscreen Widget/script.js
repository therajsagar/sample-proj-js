const validPIN = 7319;
const textfield = document.getElementById("textfield");

function setInput(ipValue) {
  const ipFieldValue = textfield.value;
  if (ipFieldValue.length < 4) {
    textfield.value += ipValue;
  }
}

function clearInput() {
  const ipFieldValue = textfield.value;
  if (ipFieldValue) {
    textfield.value = ipFieldValue.slice(0, -1);
  }
}

function submit() {
  const ipFieldValue = textfield.value;
  if (ipFieldValue === validPIN.toString()) {
    window.alert("Unlock Successful!");
    window.location.reload();
  } else {
    textfield.classList.add("error");
    setTimeout(() => {
      textfield.classList.remove("error");
    }, 500);
  }
}

function myFunction({ key }) {
  if (/^\d*\.?\d*$/.test(key)) {
    setInput(key);
    return;
  }
  if (key === "Enter") {
    submit();
    return;
  }
}

function onKeyInput({ target: { classList, innerText } }) {
  textfield.focus();
  if (classList.contains("ip-key")) {
    setInput(innerText);
    return;
  }
  if (classList.contains("clr-key")) {
    clearInput();
    return;
  }
  if (classList.contains("done-key")) {
    submit();
    return;
  }
  return;
}

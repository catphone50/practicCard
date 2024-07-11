const submitButton = document.querySelector(".submit");
const form = document.querySelector("form");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const containerCard = document.querySelector(".containerCard");
const inputAddress = document.querySelector(".address");
const inputPrice = document.querySelector(".price");
const inputName = document.querySelector(".name");
const containerInfo = document.querySelector(".containerInfo");

listOfOrder = JSON.parse(localStorage.getItem("listOfOrder")) || [];

function printOrder() {
  containerInfo.innerHTML = "";
  listOfOrder.forEach((order) => {
    const infoOrderInner = `
  <div class="containerInfoCard">
  <h3>Info Order</h3>
  <p>prise: ${order.price}</p>
  <p>address: ${order.address}</p>
  <p>name: ${order.name}</p>
  </div>
      <div class="container">
      <button class="btn pay">Pay</button>
      <button class="btn checkBtn">Check order</button>
      <button class="btn cancel">Cancel</button>
    </div>
  `;

    const infoOrderElement = document.createElement("div");
    infoOrderElement.classList.add("infoOrderElement");
    infoOrderElement.innerHTML = infoOrderInner;
    containerInfo.appendChild(infoOrderElement);

    order.payment === true
      ? (infoOrderElement.style.backgroundColor = "#CCFBCC")
      : (infoOrderElement.style.backgroundColor = "#B4F8FB");

    const cancelButton = infoOrderElement.querySelector(".cancel");
    cancelButton.addEventListener("click", () => {
      listOfOrder = listOfOrder.filter((o) => o.id !== order.id);
      localStorage.setItem("listOfOrder", JSON.stringify(listOfOrder));
      infoOrderElement.remove();
    });
    const checkBtn = infoOrderElement.querySelector(".checkBtn");
    checkBtn.addEventListener("click", () => {
      order.payment === true
        ? printCard("success", "Pay success", "Wait delivery")
        : printCard("warning", "Pay waiting", "You must pay your order");
    });
    const payBtn = infoOrderElement.querySelector(".pay");
    payBtn.addEventListener("click", () => {
      listOfOrder = listOfOrder.map((o) => {
        if (o.id === order.id) {
          o.payment = true;
        }
        return o;
      });
      localStorage.setItem("listOfOrder", JSON.stringify(listOfOrder));
      printCard("success", "Pay success", "Wait delivery");
    });
  });
}

function printCard(status, header, info) {
  const cardInner = `<div class="icon">
    ${
      status === "success"
        ? `<span class="material-symbols-outlined">check</span>`
        : status === "warning"
        ? `<span class="material-symbols-outlined">warning</span>`
        : `<span class="material-symbols-outlined">error</span>`
    }

  </div>
  <div>
  <h3>${header}</h3>
  <p>${info}</p>
  </div>
  `;

  const card = document.createElement("div");
  card.className = "card";
  setTimeout(() => {
    card.classList.add("anim");
  }, 0);

  card.innerHTML = cardInner;
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "close";
  closeBtn.textContent = "X";
  closeBtn.addEventListener("click", function () {
    card.remove();
  });
  card.append(closeBtn);
  containerCard.append(card);
  body.append(containerCard);
  containerCard.classList.add("active");
  status === "success"
    ? card.classList.add("success")
    : status === "warning"
    ? card.classList.add("warning")
    : card.classList.add("error");

  setTimeout(() => {
    card.classList.add("card-fade-out");
  }, 10000);
  setTimeout(() => {
    card.remove();
  }, 12000);
}

printOrder();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(listOfOrder);
  containerInfo.textContent = "";

  const order = {
    id: Math.floor(Math.random() * 1000),
    payment: false,
    address: inputAddress.value,
    price: inputPrice.value,
    name: inputName.value,
  };
  listOfOrder.push(order);

  localStorage.setItem("listOfOrder", JSON.stringify(listOfOrder));

  printCard("warning", "Pay waiting", "You must pay your order");

  printOrder();
});

inputAddress.addEventListener("input", validateAddress);
inputPrice.addEventListener("input", validatePrice);
inputName.addEventListener("input", validateName);

function validateAddress() {
  const addressValue = inputAddress.value.trim();
  const addressPattern = /^[а-яА-Яa-zA-Z0-9\s,.-]{3,}$/;
  if (!addressPattern.test(addressValue)) {
    inputAddress.classList.add("invalid");
    inputAddress.setCustomValidity("Please enter a valid address");
  } else {
    inputAddress.classList.remove("invalid");
    inputAddress.setCustomValidity("");
  }
}

function validatePrice() {
  const priceValue = inputPrice.value.trim();
  const pricePattern = /^\d+(\.\d+)?$/;
  if (!pricePattern.test(priceValue)) {
    inputPrice.classList.add("invalid");
    inputPrice.setCustomValidity("Please enter a valid price");
  } else {
    inputPrice.classList.remove("invalid");
    inputPrice.setCustomValidity("");
  }
}

function validateName() {
  const nameValue = inputName.value.trim();
  const namePattern = /^[а-яА-Яa-zA-Z\s]{2,50}$/;
  if (!namePattern.test(nameValue)) {
    inputName.classList.add("invalid");
    inputName.setCustomValidity("Enter a valid name");
  } else {
    inputName.classList.remove("invalid");
    inputName.setCustomValidity("");
  }
}

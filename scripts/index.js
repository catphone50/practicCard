const submitButton = document.querySelector(".submit");
const form = document.querySelector("form");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const containerCard = document.querySelector(".containerCard");
const inputAddress = document.querySelector(".address");
const inputPrice = document.querySelector(".price");
const inputName = document.querySelector(".name");
const containerInfo = document.querySelector(".containerInfo");
const listOfOrder = [];

function printOrder() {
  listOfOrder.forEach((order) => {
    const infoOrderInner = `
  <div class="containerInfoCard">
  <h3>Info Order</h3>
  <p>prise: ${order.price}</p>
  <p>address: ${order.address}</p>
  <p>name: ${order.name}</p>
  </div>
  `;

    const infoOrderElement = document.createElement("div");
    infoOrderElement.innerHTML = infoOrderInner;
    containerInfo.appendChild(infoOrderElement);
  });
}

printOrder();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(listOfOrder);
  containerInfo.textContent = "";

  const order = {
    id: Math.floor(Math.random() * 1000),
    address: inputAddress.value,
    price: inputPrice.value,
    name: inputName.value,
  };
  listOfOrder.push(order);
  container.classList.add("active");
  containerCard.classList.add("active");

  const card = document.createElement("div");
  card.className = "card";
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
  printOrder();
});

const cardInner = `<div class="icon"><span class="material-symbols-outlined">
check
</span></div>
<div>
<h3>Order Successful</h3>
<p>Wait for further information</p>
</div>
`;

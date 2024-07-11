const submitButton = document.querySelector(".submit");
const form = document.querySelector("form");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const containerCard = document.querySelector(".containerCard");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

const cardInner = `<div class="icon"><span class="material-symbols-outlined">
check
</span></div>
<div>
<h3>Order Successful</h3>
<p>Wait for further information</p>
</div>

`;

submitButton.addEventListener("click", () => {
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
});

const form = document.getElementById("bookingForm");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const room = document.getElementById("room");
const priceText = document.getElementById("price");

const modal = document.getElementById("modal");
const summary = document.getElementById("summary");

const cardBox = document.getElementById("cardBox");


// Payment Toggle
document.querySelectorAll("input[name='pay']").forEach(el => {

  el.addEventListener("change", function(){

    if(this.value === "card"){
      cardBox.style.display = "block";
    }else{
      cardBox.style.display = "none";
    }

  });

});


// Price
function calculatePrice(){

  if(!checkin.value || !checkout.value) return;

  const inDate = new Date(checkin.value);
  const outDate = new Date(checkout.value);

  const days = (outDate - inDate)/(1000*60*60*24);

  if(days <= 0) return;

  let base = 2000;

  if(room.value === "deluxe") base = 3500;
  if(room.value === "suite") base = 5000;

  let price = days * base;

  price += adults.value * 500;
  price += children.value * 300;

  priceText.innerText = price;
}


// Auto Update
[
  checkin, checkout,
  adults, children,
  room
].forEach(el => {
  el.addEventListener("change", calculatePrice);
});


// Submit
form.addEventListener("submit", function(e){

  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const pay = document.querySelector("input[name='pay']:checked").value;

  summary.innerHTML = `
    <b>Name:</b> ${name}<br>
    <b>Email:</b> ${email}<br>
    <b>Room:</b> ${room.value}<br>
    <b>Check-in:</b> ${checkin.value}<br>
    <b>Check-out:</b> ${checkout.value}<br>
    <b>Adults:</b> ${adults.value}<br>
    <b>Children:</b> ${children.value}<br>
    <b>Payment:</b> ${pay}<br>
    <b>Total:</b> ₹${priceText.innerText}
  `;

  modal.style.display = "flex";
});


// Close
function closeModal(){

  modal.style.display = "none";
  form.reset();
  priceText.innerText = 0;
  cardBox.style.display = "block";

}
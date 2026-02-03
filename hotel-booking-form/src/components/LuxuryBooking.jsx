import { useState } from "react";
import BookingSummary from "./BookingSummary";
import ConfirmationModal from "./ConfirmationModal";
import "../styles/luxury.css";

const ROOM_PRICES = {
  Deluxe: 5000,
  Suite: 8000,
  "Presidential Suite": 15000
};

const LuxuryBooking = () => {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    idType: "Aadhaar",
    idNumber: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    roomType: "",
    mealPlan: "Room Only",
    payment: "Pay at Hotel",
    requests: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          (new Date(form.checkOut) - new Date(form.checkIn)) /
            (1000 * 60 * 60 * 24),
          0
        )
      : 0;

  const roomCost = ROOM_PRICES[form.roomType] || 0;
  const childCost = form.children * 1000 * nights;
  const base = roomCost * nights + childCost;
  const tax = base * 0.12;
  const total = base + tax;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nights <= 0) {
      alert("Invalid dates selected");
      return;
    }

    setShowModal(true);
    alert(`Confirmation email sent to ${form.email}`);
  };

  return (
    <div className="hero">
      <div className="overlay">
        <div className="container">

          <form className="glass-card" onSubmit={handleSubmit}>
            <h1>Luxury Resort Booking</h1>
            <p className="subtitle">5★ Hotel Reservation</p>

            <div className="grid">
              <input name="firstName" placeholder="First Name" required onChange={handleChange} />
              <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
              <input name="phone" placeholder="Phone Number" required onChange={handleChange} />
              <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
            </div>

            <div className="grid">
              <select name="idType" onChange={handleChange}>
                <option>Aadhaar</option>
                <option>Passport</option>
              </select>
              <input name="idNumber" placeholder="ID Number" required onChange={handleChange} />
            </div>

            <div className="field">
  <label>Check In</label>
  <input type="date" name="checkIn" onChange={handleChange} />
</div>
<div className="field">
  <label>Check Out</label>
  <input type="date" name="checkOut" onChange={handleChange} />
</div>

            <div className="field">
  <label>Adults</label>
  <input type="number" min="1" name="adults" value={form.adults} onChange={handleChange} />
</div>

<div className="field">
  <label>Children</label>
  <input type="number" min="0" name="children" value={form.children} onChange={handleChange} />
</div>

            <div className="grid">
              <select name="roomType" required onChange={handleChange}>
                <option value="">Room Type</option>
                <option>Deluxe</option>
                <option>Suite</option>
                <option>Presidential Suite</option>
              </select>

              <select name="mealPlan" onChange={handleChange}>
                <option>Room Only</option>
                <option>Breakfast Included</option>
                <option>Full Board</option>
              </select>
            </div>

            <select name="payment" onChange={handleChange}>
              <option>Pay at Hotel</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            {form.payment === "Card" && (
              <div className="grid">
                <input placeholder="Card Number" maxLength="16" />
                <input placeholder="Name on Card" />
                <input placeholder="MM/YY" />
                <input placeholder="CVV" maxLength="3" />
              </div>
            )}

            <div className="field full">
  <label>Special Requests</label>
  <textarea
    name="requests"
    placeholder="Any special requirements (early check-in, airport pickup, etc.)"
    onChange={handleChange}
  />
</div>

            <button type="submit">Confirm Booking</button>
          </form>

          <BookingSummary
            data={form}
            nights={nights}
            base={base}
            tax={tax}
            total={total}
          />
        </div>

        {showModal && <ConfirmationModal close={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default LuxuryBooking;

const BookingSummary = ({ data, nights, base, tax, total }) => {
  return (
    <div className="glass-summary">
      <h3>📋 Booking Summary</h3>
      <p><b>Name:</b> {data.firstName} {data.lastName}</p>
      <p><b>Room:</b> {data.roomType}</p>
      <p><b>Nights:</b> {nights}</p>
      <p><b>Guests:</b> {data.adults} Adults, {data.children} Children</p>
      <p><b>Payment:</b> {data.payment}</p>

      <hr />

      <p>Base: ₹{base}</p>
      <p>Tax (12%): ₹{tax.toFixed(0)}</p>
      <h2>Total: ₹{total.toFixed(0)}</h2>
    </div>
  );
};

export default BookingSummary;

const ConfirmationModal = ({ close }) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>🎉 Booking Confirmed</h2>
        <p>Your luxury stay has been reserved successfully.</p>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;

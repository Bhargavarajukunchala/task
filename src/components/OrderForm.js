import React, { useState } from 'react';

function OrderForm({ onPlaceOrder }) {
  const [tableNumber, setTableNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder({ tableNumber, contactNumber, date, time });
    setTableNumber('');
    setContactNumber('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place Order</h2>
      <label>Table Number: </label>
      <input value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required />
      <br />
      <label>Contact Number (Optional): </label>
      <input value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
      <br />
      <label>Date: </label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <br />
      <label>Time: </label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <br /> <br/>
      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderForm;

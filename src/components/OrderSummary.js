import React from 'react';

function OrderSummary({ order, onRemoveFromOrder }) {
  const totalPrice = order.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='orderdetails'>
      <h2>Order Summary</h2>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => onRemoveFromOrder(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <strong>Total: ${totalPrice}</strong>
    </div>
  );
}

export default OrderSummary;

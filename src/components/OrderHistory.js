import React, { useState, useEffect } from 'react';

function OrderHistory({ orders }) {
  const [storedOrders, setStoredOrders] = useState([]); 
  const [allOrders, setAllOrders] = useState([]); 

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setStoredOrders(localOrders); 

    const savedCurrentOrders = JSON.parse(localStorage.getItem('currentOrders')) || [];
    setAllOrders([...localOrders, ...savedCurrentOrders]);
  }, []); 

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('currentOrders', JSON.stringify(orders));

      const updatedStoredOrders = [...storedOrders, ...orders];
      localStorage.setItem('orders', JSON.stringify(updatedStoredOrders));

      setAllOrders(updatedStoredOrders); 
    }
  }, [orders]); 

  const orderHistoryStyle = {
    padding: '20px',
  };

  const orderCardsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const orderCardStyle = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '250px',
    textAlign: 'left',
  };

  const itemsListStyle = {
    maxHeight: '100px',
    overflowY: 'auto',
    margin: '10px 0',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div style={orderHistoryStyle}>
      <h2>Order History</h2>

      {/* Display all orders */}
      {allOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={orderCardsStyle}>
          {allOrders.map((order, index) => (
            <div style={orderCardStyle} key={index}>
              <h3>Order #{index + 1}</h3>
              <p>
                Table: {order.details.tableNumber} <br />
                Date: {order.details.date} <br />
                Time: {order.details.time}
              </p>
              <h4>Items:</h4>
              <div style={itemsListStyle}>
                <ul style={{ padding: '0', margin: '0' }}>
                  {order.items.map((item, i) => (
                    <li key={i} style={{ listStyleType: 'none' }}>
                      {item.name} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;

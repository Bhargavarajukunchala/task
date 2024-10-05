import React from 'react';

function Menu({ dishes, onAddToOrder, onUpdateDishQuantity }) {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    display: 'inline-block',
  };

  const imgStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const buttonStyle = {
    marginTop: '8px',
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <center><h2>Order Your favourite Dishes</h2></center>
      <div className='md1'>
        {dishes.map((dish) => (
          <div key={dish.id} style={cardStyle}>
            <img src={dish.image_url} alt={dish.name} style={imgStyle} />
            <h3>{dish.name}</h3>
            <p> price $ : {dish.price}</p>
            <p>{dish.category}</p>
            <p>
              {dish.available_quantity > 0 
                ? `Available: ${dish.available_quantity}` 
                : `Out of Stock`}
            </p>
            <button
              style={buttonStyle}
              onClick={() => {
                if (dish.available_quantity > 0) {
                  onAddToOrder(dish);
                  onUpdateDishQuantity(dish.id); 
                }
              }}
              disabled={dish.available_quantity === 0} 
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; 
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const [menuItems, setMenuItems] = useState([]);  
  const [order, setOrder] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const storedMenuItems = JSON.parse(localStorage.getItem('menuItems'));
        if (storedMenuItems) {
          setMenuItems(storedMenuItems);
        } else {
          const response = await axios.get('https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968', {
            headers: {
              'X-Master-Key': '$2b$10$MnvcNaVGBeDwLRfWyG1MweKTUSvWu5GI48.I52QXTKVE9ntHodxE2',
            },
          });
          const fetchedMenuItems = response.data.record.map((item) => ({
            ...item,
            quantity: 0, 
          }));
          setMenuItems(fetchedMenuItems);
          sessionStorage.setItem('menuItems', JSON.stringify(fetchedMenuItems)); 
        }
      } catch (err) {
        setError('Failed to fetch menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const addToOrder = (item) => {
    setOrder([...order, item]);

    setMenuItems((prevMenuItems) => {
      const updatedMenuItems = prevMenuItems.map((m) =>
        m.id === item.id
          ? {
              ...m,
              availableQuantity: m.availableQuantity - 1,
              quantity: m.quantity + 1, 
            }
          : m
      );
      localStorage.setItem('menuItems', JSON.stringify(updatedMenuItems)); 
      return updatedMenuItems;
    });
  };

  const removeFromOrder = (index) => {
    const removedItem = order[index];

    setOrder(order.filter((_, i) => i !== index));

    setMenuItems((prevMenuItems) => {
      const updatedMenuItems = prevMenuItems.map((m) =>
        m.id === removedItem.id
          ? {
              ...m,
              availableQuantity: m.availableQuantity + 1,
              quantity: m.quantity - 1, 
            }
          : m
      );
      localStorage.setItem('menuItems', JSON.stringify(updatedMenuItems)); 
      return updatedMenuItems;
    });
  };

  const onUpdateDishQuantity = (dishId) => {
    setMenuItems((prevDishes) => {
      const updatedDishes = prevDishes.map((dish) =>
        dish.id === dishId && dish.available_quantity > 0
          ? { ...dish, available_quantity: dish.available_quantity - 1 }
          : dish
      );
      localStorage.setItem('menuItems', JSON.stringify(updatedDishes)); 
      return updatedDishes;
    });
  };

  const placeOrder = (details) => {
    const isDuplicate = orderHistory.some(
      (order) =>
        order.details.tableNumber === details.tableNumber &&
        order.details.date === details.date &&
        order.details.time === details.time 
    );

    if (isDuplicate) {
      toast.error(`Table already booked for ${details.time} on ${details.date}!`);
      return; 
    }

    setOrderHistory([...orderHistory, { items: order, details }]);

    setOrder([]);
    setMenuItems((prevMenuItems) => {
      const resetMenuItems = prevMenuItems.map((item) => ({
        ...item,
        quantity: 0, 
      }));
      localStorage.setItem('menuItems', JSON.stringify(resetMenuItems));
      return resetMenuItems;
    });

    toast.success('Order has been placed successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const NavigationButtons = () => {
    const navigate = useNavigate(); 

    return (
      <div>
        <button onClick={() => navigate("/")}>Menu</button>
        <button onClick={() => navigate("/order-history")} style={{ marginLeft: '10px' }}>
          Order History
        </button>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <nav>
          <NavigationButtons /> 
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Menu 
                  dishes={menuItems} 
                  onAddToOrder={addToOrder} 
                  onUpdateDishQuantity={onUpdateDishQuantity} 
                />
                <OrderSummary order={order} onRemoveFromOrder={removeFromOrder} />
                <OrderForm onPlaceOrder={placeOrder} />
              </>
            } 
          />
          <Route path="/order-history" element={<OrderHistory orders={orderHistory} />} />
        </Routes>

        {/* Add ToastContainer to your app to display toasts */}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

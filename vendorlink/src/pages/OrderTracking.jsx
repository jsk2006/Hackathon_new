import React, { useState } from 'react';
import './OrderTracking.css';

const OrderTracking = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy order data
  const orders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      status: "delivered",
      total: 450,
      items: [
        { name: "Fresh Tomatoes", quantity: 2, price: 45 },
        { name: "Onions", quantity: 3, price: 30 },
        { name: "Potatoes", quantity: 1, price: 25 }
      ],
      tracking: [
        { step: "Order Placed", time: "2024-01-15 10:30 AM", completed: true },
        { step: "Confirmed", time: "2024-01-15 10:35 AM", completed: true },
        { step: "Processing", time: "2024-01-15 11:00 AM", completed: true },
        { step: "Out for Delivery", time: "2024-01-15 02:30 PM", completed: true },
        { step: "Delivered", time: "2024-01-15 04:15 PM", completed: true }
      ]
    },
    {
      id: "ORD002",
      date: "2024-01-14",
      status: "in-transit",
      total: 320,
      items: [
        { name: "Chicken Breast", quantity: 1, price: 180 },
        { name: "Rice", quantity: 2, price: 55 },
        { name: "Cooking Oil", quantity: 1, price: 120 }
      ],
      tracking: [
        { step: "Order Placed", time: "2024-01-14 09:15 AM", completed: true },
        { step: "Confirmed", time: "2024-01-14 09:20 AM", completed: true },
        { step: "Processing", time: "2024-01-14 10:00 AM", completed: true },
        { step: "Out for Delivery", time: "2024-01-14 01:45 PM", completed: true },
        { step: "Delivered", time: "2024-01-14 03:30 PM", completed: false }
      ]
    },
    {
      id: "ORD003",
      date: "2024-01-13",
      status: "processing",
      total: 280,
      items: [
        { name: "Garlic", quantity: 2, price: 80 },
        { name: "Ginger", quantity: 1, price: 90 },
        { name: "Green Chilies", quantity: 1, price: 40 }
      ],
      tracking: [
        { step: "Order Placed", time: "2024-01-13 08:30 AM", completed: true },
        { step: "Confirmed", time: "2024-01-13 08:35 AM", completed: true },
        { step: "Processing", time: "2024-01-13 09:00 AM", completed: true },
        { step: "Out for Delivery", time: "2024-01-13 12:00 PM", completed: false },
        { step: "Delivered", time: "2024-01-13 02:00 PM", completed: false }
      ]
    },
    {
      id: "ORD004",
      date: "2024-01-12",
      status: "cancelled",
      total: 150,
      items: [
        { name: "Lemon", quantity: 2, price: 35 },
        { name: "Bread", quantity: 2, price: 25 }
      ],
      tracking: [
        { step: "Order Placed", time: "2024-01-12 11:00 AM", completed: true },
        { step: "Confirmed", time: "2024-01-12 11:05 AM", completed: true },
        { step: "Cancelled", time: "2024-01-12 11:30 AM", completed: true }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#28a745';
      case 'in-transit': return '#007bff';
      case 'processing': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in-transit': return 'In Transit';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  return (
    <div className="order-tracking-page">
      <div className="order-tracking-container">
        <div className="order-tracking-header">
          <h1>Order Tracking</h1>
          <p>Track your orders and view order history</p>
        </div>

        <div className="order-tracking-content">
          <div className="orders-list">
            <h2>Recent Orders</h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`order-card ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                <div className="order-summary">
                  <p>{order.items.length} items • ₹{order.total}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-details">
            {selectedOrder ? (
              <>
                <div className="order-details-header">
                  <h2>Order #{selectedOrder.id}</h2>
                  <span
                    className="status-badge large"
                    style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                  >
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>

                <div className="order-items">
                  <h3>Order Items</h3>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="order-total">
                    <strong>Total: ₹{selectedOrder.total}</strong>
                  </div>
                </div>

                <div className="tracking-timeline">
                  <h3>Tracking Timeline</h3>
                  <div className="timeline">
                    {selectedOrder.tracking.map((step, index) => (
                      <div key={index} className={`timeline-step ${step.completed ? 'completed' : ''}`}>
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>{step.step}</h4>
                          <p>{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="no-order-selected">
                <div className="no-order-icon">📦</div>
                <h3>Select an order to view details</h3>
                <p>Click on any order from the list to see tracking information and order details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 
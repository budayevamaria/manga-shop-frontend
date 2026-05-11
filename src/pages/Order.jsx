import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderApi.js";
import "../assets/css/order.css";

export default function Order() {
  const { cart, clearCart } = useCart();
  const [order, setOrder] = useState({});

  const [ordered, setOrdered] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const orderNumber = useState(() => Math.floor(100000 + Math.random() * 900000))[0];

  const currentDate = new Date().toLocaleDateString();

  const token = localStorage.getItem("token");

  const { id } = useParams();

  const fetchOrder = async id => {
    try {
      if (!token) {
        alert("No token found");
      }

      const res = await axios.get(`https://manga-shop-backend.onrender.com/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  return (
    <div className="order-page">
      <h1>Оформление заказа</h1>

      {!ordered ? (
        <>
          <div className="order-info">
            <p>
              <strong>Номер заказа: </strong>#{order._id}
            </p>
            {console.log(order._id)}
            <p>
              <strong>Дата: </strong>

              {currentDate}
            </p>
            <p>
              <strong>Статус: </strong>
              {order.status}
            </p>
            {/* <p>
              <strong>Покупатель: </strong>

               {order.user.name} 
            </p> */}
          </div>

          <div className="order-page-list">
            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.product.image} alt={item.product.title} />

                <div>
                  <h3>{item.product.title}</h3>

                  <p>
                    {item.product.price} $ × {item.quantity}
                  </p>
                  {console.log(item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h2>Итого: {order.totalPrice} $</h2>

            <button className="order__buy-btn" disabled={cart.length === 0}>
              Оформить заказ
            </button>
          </div>
        </>
      ) : (
        <div className="success-box">
          <h2>Заказ успешно оформлен!</h2>

          <p>Номер заказа: #{orderNumber}</p>

          <p>Мы отправили подтверждение на почту</p>
        </div>
      )}
    </div>
  );
}

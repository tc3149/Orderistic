import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { ListGroup } from "react-bootstrap";
import CartItem from "./CartItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";
import { sendOrder } from "../api/TableApi";
import timeout from "../api/Timeout";
import { CartContext } from "./Menu.js";
import Col from "react-bootstrap/Col";
import MenuCard from "./MenuCard";

function Cart({ show, closeCart, menu, setOrderComplete, orderComplete }) {
  const { cart } = React.useContext(CartContext);
  const [total, setTotal] = React.useState(0);
  const changeTotal = (newTotal) => setTotal(newTotal);
  const { tableNumber } = useAuth();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (cart !== undefined) {
      let sum = 0;
      for (let item of cart) {
        sum += parseFloat(item.price * item.quantity);
      }
      setTotal(sum);
    }
  }, [cart]);
  const checkoutButtonStyle = {
    backgroundColor: "black",
    paddingLeft: "250px",
    paddingRight: "250px",
    position: "fixed",
    bottom: "10px",
    fontWeight: "600",
    borderRadius: "6px",
  };
  const loadingStyle = {
    position: "fixed",
    bottom: "20px",
  };

  async function handleCheckout() {
    if (cart.length !== 0) {
      setLoading(true);
      await timeout(500);
      sendOrder(tableNumber);
      setLoading(false);
      setOrderComplete(true);
    }
  }

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={closeCart}>
        <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
          <CloseButton
            style={{ float: "left", marginLeft: "0" }}
            onClick={closeCart}
          />
          <Modal.Title style={{ margin: "auto" }}>Cart</Modal.Title>
          <div
            style={{
              width: "16px",
              height: "16px",
              padding: "8px 8px 8px 8px",
              margin: "8px 8px 8px 0px",
            }}
          ></div>
        </Modal.Header>
        {orderComplete ? (
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="90"
              fill="green"
              class="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
            <h2>Thank you for your order!</h2>
            <p>Your order has been received and is now being prepared.</p>
            <p>Total: ${total}</p>
            {cart.map((element, index) => (
              <Col key={index}>
                <MenuCard element={menu[element.id]} showInfo={false} />
              </Col>
            ))}
          </Modal.Body>
        ) : (
          <Modal.Body
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {cart.length === 0 ? (
              "Your cart is empty!"
            ) : (
              <ListGroup>
                {cart.map((element, index) => (
                  <CartItem
                    key={index}
                    info={menu[element.id]}
                    index={index}
                    total={total}
                    changeTotal={changeTotal}
                  />
                ))}
                <Card
                  style={{
                    border: "0",
                    paddingTop: "10px",
                    paddingBottom: "70px",
                  }}
                >
                  <Card.Body style={{ borderBottom: "1px solid #ededed" }}>
                    <Card.Title>
                      Total
                      <Card.Title style={{ float: "right", fontSize: "30px" }}>
                        ${parseFloat(total).toFixed(2)}
                      </Card.Title>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </ListGroup>
            )}
            {!loading ? (
              <Button
                variant="secondary"
                size="lg"
                style={checkoutButtonStyle}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            ) : (
              <div class="spinner-border" role="status" style={loadingStyle}>
                <span class="sr-only"></span>
              </div>
            )}
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
export default Cart;

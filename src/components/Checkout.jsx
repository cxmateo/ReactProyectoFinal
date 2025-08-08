import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { db } from '../services/firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);

  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  const handleShippingChange = (e) => setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  const handleNextStep = (e) => { e.preventDefault(); setStep(2); };
  const handlePrevStep = () => setStep(1);

  const createOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setPurchaseTotal(getTotalPrice());
      setPurchasedItems([...cart]);

      const order = {
        buyer: { ...shippingData },
        items: cart.map(item => ({ id: item.id, title: item.nombre, price: item.precio, quantity: item.quantity })),
        total: getTotalPrice(),
        date: serverTimestamp(),
        payment: { last4: paymentData.cardNumber.slice(-4) }
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      
      for (const item of cart) {
        const productRef = doc(db, 'productos', item.id);
        await updateDoc(productRef, {
          stock: increment(-item.quantity),
          soldCount: increment(item.quantity) 
        });
      }
      
      setOrderId(docRef.id);
      clearCart();
      setStep(3);

    } catch (error) {
      console.error("Error creating order: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 className="checkout-message">Procesando tu orden...</h2>;

  if (step === 3 && orderId) {
    return (
      <div className="checkout-success-modal">
        <div className="checkout-success-content">
            <div className="success-icon">&#10004;</div>
            <h2>¡Compra Exitosa!</h2>
            <p>Tu orden ha sido procesada correctamente.</p>
            <div className="order-summary">
                <h3>Resumen de Compra</h3>
                <p><strong>ID de Orden:</strong> {orderId}</p>
                <p><strong>Dirección:</strong> {shippingData.address}, {shippingData.city}</p>
                <p><strong>Recibe:</strong> {shippingData.fullName}</p>
                <p><strong>Tarjeta terminada en:</strong> **** {paymentData.cardNumber.slice(-4)}</p>
                <div className="purchased-products">
                    <h4>Productos Adquiridos:</h4>
                    <ul>
                        {purchasedItems.map(item => (
                            <li key={item.id}>
                                {item.nombre} x {item.quantity} - ${ (item.precio * item.quantity).toLocaleString('es-AR') }
                            </li>
                        ))}
                    </ul>
                </div>
                <h4>Total de la Compra: ${purchaseTotal.toLocaleString('es-AR')}</h4>
            </div>
            <Link to="/" className="btn-primary">Aceptar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-modal">
      <div className="checkout-content">
        <h1 className="checkout-title">Finalizar Compra</h1>
        {step === 1 && (
          <form onSubmit={handleNextStep} className="checkout-form">
            <h2>Datos de Envío</h2>
            <input name="fullName" type="text" placeholder="Nombre completo" onChange={handleShippingChange} required />
            <input name="dni" type="text" placeholder="D.N.I" onChange={handleShippingChange} required />
            <input name="address" type="text" placeholder="Dirección" onChange={handleShippingChange} required />
            <input name="province" type="text" placeholder="Provincia" onChange={handleShippingChange} required />
            <input name="postalCode" type="text" placeholder="Código Postal" onChange={handleShippingChange} required />
            <input name="city" type="text" placeholder="Ciudad" onChange={handleShippingChange} required />
            <button type="submit" className="btn-primary">Siguiente</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={createOrder} className="checkout-form">
            <h2>Datos de Pago</h2>
            <input name="cardNumber" type="text" placeholder="Número de Tarjeta" onChange={handlePaymentChange} required />
            <input name="expiryDate" type="text" placeholder="Fecha de Vencimiento (MM/AA)" onChange={handlePaymentChange} required />
            <input name="cvv" type="text" placeholder="CVV" onChange={handlePaymentChange} required />
            <div className="form-buttons">
                <button type="button" onClick={handlePrevStep} className="btn-secondary">Atrás</button>
                <button type="submit" className="btn-primary">Confirmar Compra</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;

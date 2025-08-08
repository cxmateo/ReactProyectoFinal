import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './estilos.css';
import DataUploader from './components/DataUploader';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <DataUploader /> */}

      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
            <Route path="/producto/:productoId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h2>404 - Página no encontrada</h2>
                  <p>Ups, el enlace no existe o fue eliminado.</p>
                  <a href="/" className="btn-return">Volver al inicio</a>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;

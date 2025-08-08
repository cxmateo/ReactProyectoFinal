import { Link } from 'react-router-dom';

const Item = ({ id, nombre, imagen, precio }) => {
  return (
    <div className="producto">
      <img src={imagen} alt={nombre} width="150" />
      <h2>{nombre}</h2>
      <p>${precio}</p>
      <Link to={`/producto/${id}`}>Ver detalle</Link>
    </div>
  );
};

export default Item;

const ItemDetail = ({ nombre, imagen, descripcion, precio, stock }) => {
  return (
    <div className="detalle">
      <img src={imagen} alt={nombre} width="200" />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p><strong>Precio:</strong> ${precio}</p>
      <p><strong>Stock:</strong> {stock}</p>
    </div>
    
  );
};

export default ItemDetail;

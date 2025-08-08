import React from 'react';
import { db } from '../services/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { productos } from '../data';

//Script temporal para subir los producots de data.js (tambien con un parser va d 10 ) a Firestore para no subirlos uno por uno xd

const DataUploader = () => {
  const handleUpload = () => {
    const productosCollection = collection(db, 'productos');

    productos.forEach((producto) => {
      const { id, ...rest } = producto;
      
      addDoc(productosCollection, rest)
        .then((docRef) => {
          console.log('Producto agregado ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error al agregar producto: ', error);
        });
    });

    alert('Subida de productos iniciada progreso en consola');
  };

  return (
    <div>
      <h2>Subir Productos a Firebase</h2>
      <button onClick={handleUpload}>Subir</button>
    </div>
  );
};

export default DataUploader;
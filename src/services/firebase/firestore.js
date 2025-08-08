import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getProductos = (categoriaId) => {
  const productosCollection = categoriaId
    ? query(collection(db, 'productos'), where('categoria', '==', categoriaId))
    : collection(db, 'productos');

  return getDocs(productosCollection)
    .then((querySnapshot) => {
      const productosAdaptados = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      return productosAdaptados;
    })
    .catch((error) => {
      console.error("Error fetching productos: ", error);
      return [];
    });
};

export const getProductoPorId = (productoId) => {
  const productoDoc = doc(db, 'productos', productoId);

  return getDoc(productoDoc)
    .then((querySnapshot) => {
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        const productoAdaptado = { id: querySnapshot.id, ...data };
        return productoAdaptado;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Error fetching producto: ", error);
      return null;
    });
};

export const productos = [
  {
    id: '1',
    nombre: 'Remera básica',
    categoria: 'ropa',
    descripcion: 'Remera de algodón 100%, suave y cómoda.',
    precio: 13500,
    stock: 12,
    imagen: 'https://underwavebrand.com/wp-content/uploads/2024/01/DSC07897-1.jpg'
  },
  {
    id: '2',
    nombre: 'Jeans recto',
    categoria: 'ropa',
    descripcion: 'Jeans azul clásico, corte recto y resistente.',
    precio: 18200,
    stock: 8,
    imagen: 'https://img.ltwebstatic.com/images3_spmp/2024/10/09/48/1728474091ce672e1a31ad34cf0144bda8b9d12eac_thumbnail_560x.webp'
  },
  {
    id: '3',
    nombre: 'Campera de invierno',
    categoria: 'ropa',
    descripcion: 'Campera térmica con capucha, ideal para bajas temperaturas.',
    precio: 34500,
    stock: 5,
    imagen: 'https://acdn-us.mitiendanube.com/stores/001/150/632/products/01680221117100-photoroom-21-84f36ebcc279f0449216832343191880-640-0.webp'
  },
  {
    id: '4',
    nombre: 'Smartphone X100',
    categoria: 'tecnologia',
    descripcion: 'Teléfono inteligente con pantalla AMOLED y 128GB de almacenamiento.',
    precio: 195000,
    stock: 15,
    imagen: 'https://www.ciudad.com.ar/resizer/v2/vivo-mejora-la-fotografia-del-sol-en-los-nuevos-smartphones-de-la-serie-vivo-x100-72XXSWUWIRC5LHI2YZIV6E77YY.jpg?auth=f104f39a378f4344a0cb0217cfeb30d593335b938b71a41168effaa7f9107527&width=1440'
  },
  {
    id: '5',
    nombre: 'Auriculares Bluetooth',
    categoria: 'tecnologia',
    descripcion: 'Auriculares inalámbricos con cancelación de ruido.',
    precio: 18500,
    stock: 20,
    imagen: 'https://images.bidcom.com.ar/resize?src=https://static.bidcom.com.ar/publicacionesML/productos/ABLUE133/1000x1000-ABLUE133.jpg&w=500&q=100'
  },
  {
    id: '6',
    nombre: 'Notebook Ultra',
    categoria: 'tecnologia',
    descripcion: 'Notebook liviana con procesador Intel i5 y 8GB RAM.',
    precio: 250000,
    stock: 4,
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_857432-MLU79110097096_092024-O.webp'
  },
  {
    id: '7',
    nombre: 'Sillón Relax',
    categoria: 'hogar',
    descripcion: 'Sillón reclinable con soporte lumbar y diseño moderno.',
    precio: 125500,
    stock: 3,
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_636725-MLA82356875424_022025-O.webp'
  },
  {
    id: '8',
    nombre: 'Lámpara de mesa',
    categoria: 'hogar',
    descripcion: 'Lámpara LED con brazo flexible, ideal para escritorio.',
    precio: 12000,
    stock: 10,
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_789476-MLA82795494256_032025-O.webp'
  },
  {
    id: '9',
    nombre: 'Cafetera Express',
    categoria: 'hogar',
    descripcion: 'Cafetera express automática con espumador de leche.',
    precio: 12000,
    stock: 6,
    imagen: 'https://acdn-us.mitiendanube.com/stores/005/617/056/products/lq-ex010-ml_0000_d_nq_np_2x_623933-mla84943164806_052025-f-c2e46411defdacfd7f17492400563005-1024-1024.webp'
  },
  {
    id: '10',
    nombre: 'Zapatillas Urban',
    categoria: 'ropa',
    descripcion: 'Zapatillas deportivas urbanas, suela antideslizante.',
    precio: 50000,
    stock: 11,
    imagen: 'https://m.media-amazon.com/images/I/814bPG3IklL._AC_SL1500_.jpg'
  },
  {
    id: '11',
    nombre: 'ZAPATILLAS SKATE 2 WAYVEE VANS',
    categoria: 'ropa',
    descripcion: 'El Wayvee 2.0 está diseñado para skaters que exigen tanto rendimiento como estilo.',
    precio: 160000,
    stock: 16,
    imagen: 'https://www.digitalsport.com.ar/files/products/6843e36b53619-673044-500x500.jpg'
  },
  {
    id: '12',
    nombre: 'HOODIE SWEET azul',
    categoria: 'ropa',
    descripcion: 'Buzo canguro AMPLIO  confeccionado en frisa punto invisible 100% Algodon gamuzado.',
    precio: 39000,
    stock: 4,
    imagen: 'https://acdn-us.mitiendanube.com/stores/989/662/products/hoodie-sweet-azul-2ce1ac99e86a5d32e717518999300908-1024-1024.webp'
  },


];


export function getProductos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 500);
  });
}

export function getProductosPorCategoria(categoriaId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos.filter(p => p.categoria === categoriaId));
    }, 500);
  });
}

export function getProductoPorId(productoId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos.find(p => p.id === productoId)); 
    }, 500);
  });
}



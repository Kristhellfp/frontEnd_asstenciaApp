import { crearGrados } from '../grados/grados.js';

export function crearUniforme(navegarA) {
  const contenedor = document.createElement('div');
  contenedor.classList.add('uniforme-container');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Uniforme';
  contenedor.appendChild(titulo);

  const subtitulo = document.createElement('h3');
  subtitulo.textContent = 'Revisión';
  contenedor.appendChild(subtitulo);

  const lista = document.createElement('div');
  lista.classList.add('uniforme-lista');

  const comentarios = document.createElement('textarea');
  comentarios.placeholder = "Detalles del uniforme...";
  comentarios.classList.add('comentarios-uniforme');

  const prendas = [
    {
      nombre: 'Pantalón beige',
      imagenes: ['https://media.wuerth.com/stmedia/modyf/eshop/products/std.lang.all/resolutions/normal/png-546x410px/569467303.png']
    },
    {
      nombre: 'Polo blanca o azul',
      imagenes: [
        'https://bordamax.net/cdn/shop/files/blanco_1m.png?v=1732843368&width=1946',
        'https://image.jimcdn.com/app/cms/image/transf/none/path/s51ecb0debe9f7d13/image/ic38c5d40dfa17c49/version/1466719066/image.png'
      ]
    },
    {
      nombre: 'Calcetas / Calcetines beige',
      imagenes: ['https://www.corbatasstore.es/assets/SKUImages/SK-004.png']
    },
    {
      nombre: 'Zapatos negros (niño/niña)',
      imagenes: [
        'https://www.brunorossi.cl/120093-medium_custom/zapato-casual-bruno-rossi.jpg',
        'https://anandanovia.com/cdn/shop/files/Zapato-vestir-hombre-negro-Tenerife-IslasCanarias-La-Laguna-online-2.png?v=1729275485&width=533'
      ]
    }
  ];

  prendas.forEach(prenda => {
    const fila = document.createElement('div');
    fila.classList.add('fila-prenda');
    fila.dataset.estado = '';
    fila.dataset.prenda = prenda.nombre;

    const imagenesContenedor = document.createElement('div');
    imagenesContenedor.classList.add('imagenes-prenda');

    prenda.imagenes.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = prenda.nombre;
      imagenesContenedor.appendChild(img);
    });

    const botones = document.createElement('div');
    botones.classList.add('botones-revision');

    const btnVerde = document.createElement('button');
    btnVerde.classList.add('boton-verde');
    btnVerde.textContent = '✔️';

    const btnRojo = document.createElement('button');
    btnRojo.classList.add('boton-rojo');
    btnRojo.textContent = '❌';

    btnVerde.addEventListener('click', () => {
      fila.dataset.estado = 'cumple';
      fila.classList.add('cumple');
      fila.classList.remove('no-cumple');
    });

    btnRojo.addEventListener('click', () => {
      fila.dataset.estado = 'no-cumple';
      fila.classList.add('no-cumple');
      fila.classList.remove('cumple');
    });

    botones.append(btnVerde, btnRojo);
    fila.append(imagenesContenedor, botones);
    lista.appendChild(fila);
  });

  contenedor.appendChild(lista);
  contenedor.appendChild(comentarios);

  const btnGuardar = document.createElement('button');
  btnGuardar.textContent = 'Guardar Revisión';
  btnGuardar.classList.add('boton-guardar');
  btnGuardar.addEventListener('click', async () => {
    const revision = {
      prendas: Array.from(document.querySelectorAll('.fila-prenda')).map(fila => ({
        nombre: fila.dataset.prenda,
        estado: fila.dataset.estado
      })),
      comentarios: comentarios.value
    };

    try {
      // Aquí podrías guardar a un backend
      console.log('Guardado:', revision);
      alert('Revisión guardada');
      navegarA(crearGrados(navegarA));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la revisión');
    }
  });

  contenedor.appendChild(btnGuardar);

  const btnGrados = document.createElement('button');
  btnGrados.classList.add('boton-volver');
  btnGrados.textContent = '← Regresar a Grados';
  btnGrados.addEventListener('click', () => {
    navegarA(crearGrados(navegarA));
  });

  contenedor.appendChild(btnGrados);

  return contenedor;
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 4000;
app.use(morgan('dev'));

app.get('/par/:numero', (req, res) => {
  if (req.params.numero % 2 === 0) {
    res.send('El numero es par');
  } else {
    res.send('El número no es par');
  }
});

app.get('/edad/:edad', (req, res) => {
  if (req.params.edad >= 18) {
    res.send('Eres mayor de edad');
  } else {
    res.send('Eres menor de edad');
  }
});

app.get('/calculadora/:operacion/:a/:b', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  let resultado;

  switch (req.params.operacion) {
    case 'sumar':
      resultado = a + b;
      break;
    case 'restar':
      resultado = a - b;
      break;
    case 'multiplicar':
      resultado = a * b;
      break;
    case 'dividir':
      resultado = a / b;
      break;
    default:
      res.status(400).send('Operación no válida');
      return;
  }

  res.send(`El resultado de ${req.params.operacion} ${a} y ${b} es: ${resultado}`);
});

app.get('/tabla/:numero', (req, res) => {
  const numero = Number(req.params.numero);
  let tabla = '';

  for (let i = 1; i <= 10; i++) {
    tabla += `${numero} x ${i} = ${numero * i}<br>`;
  }

  res.send(`Tabla de multiplicar del ${numero}:<br>${tabla}`);
});

app.get('/calificacion/:calificacion', (req, res) => {
  const calificacion = Number(req.params.calificacion);
  let mensaje;

  if (calificacion >= 90) {
    mensaje = 'Excelente';
  } else if (calificacion >= 80) {
    mensaje = 'Muy Bien';
  } else if (calificacion >= 70) {
    mensaje = 'Aprobado';
  } else {
    mensaje = 'Reprobado';
  }

  res.send(`Calificación: ${calificacion} - ${mensaje}`);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
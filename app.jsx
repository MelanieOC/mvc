const preguntas = [
  {
    pregunta: 'Which is the oldest airline in the world?',
    opciones: { A: 'Avianca', B: 'KLM', C: 'Qantas' },
    respuesta: 'KLM',
    imagen: 'assets/img/plane.svg'
  },
  {
    pregunta: 'Which is the largest port in the world?',
    opciones: { A: 'Port of Shanghai', B: 'Port of Singapore', C: 'Port of Rotterdam' },
    respuesta: 'Port of Shanghai',
    imagen: 'assets/img/ship.svg'
  },
  {
    pregunta: 'What is the longest distance cycling backwards?',
    opciones: { A: '89.30 km', B: '675.10 km', C: '337.60 km' },
    respuesta: '337.60 km',
    imagen: 'assets/img/bycicle.svg'
  },
  {
    pregunta: 'What is the highest speed ever reached by a school bus?',
    opciones: { A: '590 km/h', B: '320 km/h', C: '245 km/h' },
    respuesta: '590 km/h',
    imagen: 'assets/img/bus.svg'
  },
  {
    pregunta: 'What is the longest car trip on one tank of gas?',
    opciones: { A: '2617 km', B: '3568 km', C: '1732 km' },
    respuesta: '2617 km',
    imagen: 'assets/img/car.svg'
  }
]
const RedesSociales = () => {
  return (
    <div id="redesSociales" className="text-center">
      <a href="#" className="fa-stack fa-lg" style={{ color: '#00C3FF' }}>
        <i className="fa fa-circle fa-stack-2x"></i>
        <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
      </a>
      <a href="#" className="fa-stack fa-lg">
        <i className="fa fa-circle fa-stack-2x" style={{ color: '#23239B' }}></i>
        <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
      </a>
      <a href="#" className="fa-stack fa-lg">
        <i className="fa fa-circle fa-stack-2x" style={{ color: 'red' }}></i>
        <i className="fa fa-google-plus fa-stack-1x fa-inverse"></i>
      </a>
    </div>
  );
}
class Model {
  constructor(preguntas) {
    this.preguntas = preguntas;
    this.marcar = true;
    this.contar = 0,
      this.respuestas = [],
      this.correctas = 0,
      this.completo = false,
      this.comparar = false
  }
  guardarRespuesta(value) {
    if (this.marcar) {
      this.marcar = false;
      this.respuestas[this.contar] = value;
      if (value == this.preguntas[model.contar].respuesta) {
        this.correctas++;
      }

      let t = setTimeout(() => {
        this.marcar = true;
        this.siguiente();
      }, 700);
    }
    this.inform();
  }

  siguiente() {
    if (this.contar === this.preguntas.length - 1) {
      this.completo = true;
    }
    this.contar++;
    this.inform();
  }
  anterior() {
    if (this.contar === this.preguntas.length) {
      this.completo = false;
    }
    this.contar--;
    this.inform();
  }
  compararRespuestas() {
    this.comparar = true;
    this.inform();
  }
  reiniciar() {
    this.contar = 0;
    this.respuestas = [];
    this.correctas = 0;
    this.completo = false;
    this.comparar = false;
    this.inform();
  }

  subscribe(render) {
    this.render = render;
  }
  inform() {
    this.render();
  }
}

const App = ({ model }) => {

  let opciones = (opciones) => {
    return Object.keys(opciones).map((key, index) => {
      let value = opciones[key];
      return (<div className={model.respuestas[model.contar] == value ? 'col-md-4 seleccionado' : 'col-md-4'}>
        <button className='btn' key={index} onClick={(e) => model.guardarRespuesta(value)}><span className='letra'>{key}</span>{value}</button>
      </div>);
    })
  }
  let crearPreguntas = () => {
    return (
      <div>
        <h1 className="text-center"> {model.preguntas[model.contar].pregunta} </h1>
        <div className="opciones row">
          {opciones(model.preguntas[model.contar].opciones)}
        </div>
      </div>
    );
  }
  let listarRespuestas = () => {
    return (
      <div id='respuestas'>
        <h1 className="text-center">
        {!model.comparar && 'Here are you answers:'}
        {model.comparar && model.correctas===0 && 'Ooops, ' + model.correctas + ' out of ' + model.preguntas.length + ' correct!'}
        {model.comparar && model.correctas===model.preguntas.length && 'Wow, ' + model.correctas + ' out of ' + model.preguntas.length + ' correct!'}
        {model.comparar  && model.correctas<model.preguntas.length && model.correctas!=0 && model.correctas + ' out of ' + model.preguntas.length + ' correct!'}
        </h1>
        {model.respuestas.map((a, i) => {
          if (a == model.preguntas[i].respuesta && model.comparar) {
            return <p className="text-success">{i + 1}. {model.preguntas[i].pregunta}<strong>{a}</strong></p>
          } else if (model.comparar) {
            return <p className="text-danger">{i + 1}. {model.preguntas[i].pregunta}<strong><strike>{a}</strike> {model.preguntas[i].respuesta}</strong></p>
          } else {
            return <p>{i + 1}. {model.preguntas[i].pregunta}<strong>{a}</strong></p>;
          }
        })
        }
        <div className='text-center'>
          {model.comparar && <button className='btn-lg btn-dark' onClick={() => model.reiniciar()}>Start Again</button>}
          {!model.comparar && <button className='btn-lg btn-dark' onClick={() => model.compararRespuestas()}>Submit</button>}
        </div>

      </div>
    );

  }

  return (
    <div className="container">
      <header className="text-center">
        {!model.completo && <img src={model.preguntas[model.contar].imagen} />}
        {model.completo && <img src="assets/img/truck.svg" />}
      </header>
      <div className="content">
        {!model.comparar &&
          <div id="progreso">
            <div className="progress-label">
              {model.respuestas.length} of {model.preguntas.length} answered
          </div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: model.respuestas.length * 20 + '%', height: '5px' }}>
              </div>
            </div>
          </div>
        }
        <div id="prueba">
          {!model.completo && crearPreguntas()}
          {model.completo && listarRespuestas()}
        </div>
        <RedesSociales />
      </div>
      {!model.comparar && model.respuestas.length != 0 &&
        <div id="flechas" className="text-center">
          <button id="anterior" className={model.respuestas.length >= model.contar && model.marcar && model.contar ? 'btn' : "btn disabled"} onClick={() => model.anterior()}>
            <img className="img-responsive" src="assets/img/navigation-left-arrow.svg" alt="" />
          </button>
          <button id="siguiente" className={model.respuestas.length > model.contar & model.marcar ? 'btn' : "btn disabled"} onClick={() => model.siguiente()}>
            <img className="img-responsive" src="assets/img/navigation-right-arrow.svg" alt="" />
          </button>
        </div>
      }
    </div>);
}


let model = new Model(preguntas);
let render = () => {
  ReactDOM.render(
    <App model={model} />,
    document.getElementById('container')
  );
};

model.subscribe(render);
render(); 
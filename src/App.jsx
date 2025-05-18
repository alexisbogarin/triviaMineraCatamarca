import React, { useState } from 'react';
import preguntas from './data/preguntas.json';
import logoTrivia from './assets/logoTrivia.png';

function App() {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const comenzarJuego = () => {
    setJuegoIniciado(true);
    setJuegoTerminado(false);
    setPreguntaActual(0);
  };

  const siguientePregunta = () => {
    setMostrarRespuesta(false);
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setJuegoTerminado(true);
      setJuegoIniciado(false);
    }
  };

  const verificarRespuesta = (opcion) => {
    setOpcionSeleccionada(opcion);
    setMostrarRespuesta(true);
    setTimeout(() => {
      siguientePregunta();
      setOpcionSeleccionada(null);
    }, 1000);
  };

  return (
    <div className="fixed bg-white text-[#222A59] overflow-hidden flex flex-col items-center justify-center" style={{
      transform: "rotate(-90deg)",
      transformOrigin: "center",
      width: "100vh",
      height: "100vw",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(-90deg)"
    }}>
      {/* Logo */}
      <div className="mt-10 mb-8">
        <img src={logoTrivia} alt="Logo Trivia" className="w-36 md:w-48 lg:w-60 animate-bounce" />
      </div>

      {/* Pantalla de Juego Terminado */}
      {juegoTerminado ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#222A59] mb-4">¡Juego Terminado!</h2>
          <p className="text-lg text-gray-600 mb-6">Gracias por jugar. ¿Te atreves a intentarlo de nuevo?</p>
          <button onClick={() => window.location.reload()} className="bg-[#64A1D5] text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition duration-300">
            VOLVER A JUGAR
          </button>
        </div>
      ) : !juegoIniciado ? (
        <div className="text-center">
          <p className="text-lg text-[#222A59] mb-4">¡Prepárate para poner a prueba tus conocimientos!</p>
          <button onClick={comenzarJuego} className="bg-[#64A1D5] text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition duration-300 ">
            COMENZAR
          </button>
        </div>
      ) : (
        <div className="text-center w-11/12 max-w-4xl">
          <h2 className="text-3xl font-semibold mb-6">{preguntas[preguntaActual].pregunta}</h2>
          <div className="grid gap-4">
            {preguntas[preguntaActual].opciones.map((opcion, index) => {
              const esCorrecta = opcion === preguntas[preguntaActual].correcta;
              const esSeleccionada = opcion === opcionSeleccionada;

              let claseBoton = 'py-3 px-6 rounded-lg text-lg font-medium transition duration-300 shadow-md ';

              if (mostrarRespuesta) {
                if (esSeleccionada && esCorrecta) {
                  claseBoton += 'bg-green-500';
                } else if (esSeleccionada && !esCorrecta) {
                  claseBoton += 'bg-red-500';
                } else {
                  claseBoton += 'bg-gray-700 opacity-60 cursor-not-allowed';
                }
              } else {
                claseBoton += 'bg-[#64A1D5] cursor-pointer';
              }

              return (
                <button
                  key={index}
                  onClick={() => verificarRespuesta(opcion)}
                  disabled={mostrarRespuesta}
                  className={claseBoton}
                >
                  {opcion}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import MapaAgricola from "./components/MapaAgricola";
import logo from './assets/Logo-ER-03.png';

function App() {
  const [modoVisualizacion, setModoVisualizacion] = useState("siglea");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#64B44B] to-[#B6D938]">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col landscape:flex-row">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de control - ahora en columna lateral */}
          <div className="lg:col-span-1 space-y-4">
          <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img src={logo} alt=""/>
          </div>
        </div>
      </header>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                Modo de Visualización
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => setModoVisualizacion("siglea")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border ${modoVisualizacion === "siglea"
                      ? "bg-[#668146] text-white border-blue-300"
                      : "bg-[#82A55A] text-white border-blue-200"
                    }`}
                >
                  <div className="flex items-center">
                    Producción (SIGLEA)
                  </div>
                  <span className="bg-[#B6D938] text-[#384726] text-xs px-2 py-1 rounded-full">
                    Litros
                  </span>
                </button>

                <button
                  onClick={() => setModoVisualizacion("senasa")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border ${modoVisualizacion === "senasa"
                      ? "bg-[#4B5A64] text-white border-purple-300"
                      : "bg-[#687d8b] text-white border-purple-200"
                    }`}
                >
                  <div className="flex items-center">
                    Rebaño (SENASA)
                  </div>
                  <span className="bg-white text-[#333d44] text-xs px-2 py-1 rounded-full">
                    Vacas
                  </span>
                </button>

                <button
                  onClick={() => setModoVisualizacion("industrias")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors border ${modoVisualizacion === "industrias"
                      ? "bg-cyan-100 text-cyan-800 border-cyan-300"
                      : "bg-cyan-50 text-cyan-700 border-cyan-200"
                    }`}
                >
                  <div className="flex items-center">
                    Industrias Lácteas
                  </div>
                  <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">
                    Fábricas
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mapa - ocupa 3 columnas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <MapaAgricola
                modoVisualizacion={modoVisualizacion}
                onModoChange={setModoVisualizacion}
              />
            </div>

            {/* Footer informativo */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Fuente: Entre Ríos |
                <span className="mx-2">•</span>
                Última actualización: {new Date().toLocaleDateString('es-AR')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
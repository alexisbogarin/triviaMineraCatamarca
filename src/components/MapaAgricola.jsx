import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Modal from "react-modal";
import entreRiosGeo from '../data/entrerios.json';
import datosCompletos from '../data/entrerios-data.json';

Modal.setAppElement('#root');

const MapaAgricola = ({ modoVisualizacion, onModoChange }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [departamento, setDepartamento] = useState(null);

    const openModal = (depto) => {
        setDepartamento(depto);
        setModalIsOpen(true);
    };

    const closeModal = () => setModalIsOpen(false);

    const getColorByModo = (deptoName) => {
        let deptoData;

        switch (modoVisualizacion) {
            case "siglea":
                deptoData = datosCompletos.produccion_siglea.find(d => d.departamento === deptoName);
                const litros = deptoData?.litros || 0;
                if (litros > 25000000) return "#3B82F6";
                if (litros > 15000000) return "#10B981";
                if (litros > 8000000) return "#F59E0B";
                if (litros < 1) return "#F2F1EC";
                return "#EF4444";

            case "senasa":
                deptoData = datosCompletos.produccion_senasa.find(d => d.departamento === deptoName);
                const vacas = deptoData?.vacas || 0;
                if (vacas > 15000) return "#8B5CF6";
                if (vacas > 8000) return "#EC4899";
                if (vacas > 3000) return "#F97316";
                if (vacas < 1) return "#F2F1EC";
                return "#64748B";

            case "industrias":
                deptoData = datosCompletos.industrias.find(d => d.departamento === deptoName);
                const industrias = deptoData?.numero_industrias || 0;
                if (industrias > 15) return "#3680DB";
                if (industrias > 5) return "#14B8A6";
                if (industrias < 1) return "#F2F1EC";
                return "#A1A1AA";

            default:
                return "#DDD";
        }
    };

    const getLeyenda = () => {
        switch (modoVisualizacion) {
            case "siglea":
                return [
                    { label: "Alta (>25M L)", color: "bg-blue-500" },
                    { label: "Media-Alta (15-25M L)", color: "bg-emerald-500" },
                    { label: "Media (8-15M L)", color: "bg-amber-500" },
                    { label: "Baja (<8M L)", color: "bg-red-500" }
                ];
            case "senasa":
                return [
                    { label: "Alta (>15k vacas)", color: "bg-violet-500" },
                    { label: "Media-Alta (8-15k)", color: "bg-pink-500" },
                    { label: "Media (3-8k)", color: "bg-orange-500" },
                    { label: "Baja (<3k)", color: "bg-gray-500" }
                ];
            case "industrias":
                return [
                    { label: "Alta (>15 ind.)", color: "bg-blue-500" },
                    { label: "Media (5-15)", color: "bg-teal-500" },
                    { label: "Baja (<5)", color: "bg-gray-400" }
                ];
            default:
                return [];
        }
    };

    return (
        <div className="h-full">
            {/* Eliminamos el panel de control y selector porque ahora están en App.jsx */}

            {/* Leyenda */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex flex-wrap justify-center gap-4">
                    {getLeyenda().map((item, i) => (
                        <div key={i} className="flex items-center">
                            <div className={`w-4 h-4 mr-2 rounded-sm ${item.color}`} />
                            <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mapa */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100%-80px)]">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 5500, center: [-59.5, -32] }}
                    className="w-full h-full"
                >
                    <Geographies geography={entreRiosGeo}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const deptoName = geo.properties.departamento;
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => openModal(geo.properties)}
                                        style={{
                                            default: {
                                                fill: getColorByModo(deptoName),
                                                stroke: "#FFFFFF",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                                transition: "all 0.3s ease"
                                            },
                                            pressed: {
                                                fill: "#5B21B6"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
                {departamento && (
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-[95vw] max-h-[90vh] overflow-y-auto" style={{ fontSize: '1.2rem' }}>
                        <div className="p-8">
                            {/* Encabezado ampliado */}
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold text-gray-800">
                                    {modoVisualizacion === "siglea" && "Producción Láctea"}
                                    {modoVisualizacion === "senasa" && "Datos de Rebaño"}
                                    {modoVisualizacion === "industrias" && "Industrias Lácteas"}
                                </h2>
                                <h3 className="text-3xl text-blue-600 mt-3">
                                    {departamento.departamento}
                                </h3>
                                <p className="text-xl text-gray-500 mt-2">{departamento.cabecera}</p>
                            </div>

                            {/* Pestañas de datos ampliadas */}
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    onClick={() => onModoChange("siglea")}
                                    className={`px-8 py-4 text-xl font-medium ${modoVisualizacion === "siglea" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-500"}`}
                                >
                                    Producción
                                </button>
                                <button
                                    onClick={() => onModoChange("senasa")}
                                    className={`px-8 py-4 text-xl font-medium ${modoVisualizacion === "senasa" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-500"}`}
                                >
                                    Rebaño
                                </button>
                                <button
                                    onClick={() => onModoChange("industrias")}
                                    className={`px-8 py-4 text-xl font-medium ${modoVisualizacion === "industrias" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-500"}`}
                                >
                                    Industrias
                                </button>
                            </div>

                            {/* Contenido ampliado según pestaña */}
                            <div className="space-y-8">
                                {modoVisualizacion === "siglea" && (
                                    <>
                                        {datosCompletos.produccion_siglea
                                            .filter(d => d.departamento === departamento.departamento)
                                            .map((data, i) => (
                                                <div key={i} className="space-y-6">
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="bg-blue-50 p-6 rounded-lg">
                                                            <p className="text-xl text-blue-600">Litros de leche</p>
                                                            <p className="text-4xl font-bold">{data.litros?.toLocaleString() || 'N/D'}</p>
                                                            <p className="text-base text-gray-500 mt-2">{data.porcentaje_litros ? (data.porcentaje_litros * 100).toFixed(1) + '% provincial' : ''}</p>
                                                        </div>
                                                        <div className="bg-green-50 p-6 rounded-lg">
                                                            <p className="text-xl text-green-600">Litros por tambo</p>
                                                            <p className="text-4xl font-bold">{data.litros_por_tambo?.toLocaleString('es-AR', { maximumFractionDigits: 0 }) || 'N/D'}</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white border-2 rounded-lg p-6">
                                                        <h4 className="font-medium text-2xl mb-4">Composición</h4>
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <div>
                                                                <p className="text-xl text-gray-500">% Grasa</p>
                                                                <div className="h-4 bg-gray-200 rounded-full mt-3">
                                                                    <div
                                                                        className="h-full rounded-full bg-yellow-500"
                                                                        style={{ width: `${(data.porcentaje_grasa / 5) * 100}%` }}
                                                                    />
                                                                </div>
                                                                <p className="text-xl font-medium mt-3">{data.porcentaje_grasa?.toFixed(2) || 'N/D'}%</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xl text-gray-500">% Proteína</p>
                                                                <div className="h-4 bg-gray-200 rounded-full mt-3">
                                                                    <div
                                                                        className="h-full rounded-full bg-purple-500"
                                                                        style={{ width: `${(data.porcentaje_proteina / 5) * 100}%` }}
                                                                    />
                                                                </div>
                                                                <p className="text-xl font-medium mt-3">{data.porcentaje_proteina?.toFixed(2) || 'N/D'}%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </>
                                )}

                                {modoVisualizacion === "senasa" && (
                                    <>
                                        {datosCompletos.produccion_senasa
                                            .filter(d => d.departamento === departamento.departamento)
                                            .map((data, i) => (
                                                <div key={i} className="space-y-6">
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="bg-purple-50 p-6 rounded-lg">
                                                            <p className="text-xl text-purple-600">Vacas en ordeñe</p>
                                                            <p className="text-4xl font-bold">{data.vacas?.toLocaleString() || 'N/D'}</p>
                                                            <p className="text-base text-gray-500 mt-2">{data.porcentaje_vacas ? (data.porcentaje_vacas * 100).toFixed(1) + '% provincial' : ''}</p>
                                                        </div>
                                                        <div className="bg-indigo-50 p-6 rounded-lg">
                                                            <p className="text-xl text-indigo-600">Total bovinos</p>
                                                            <p className="text-4xl font-bold">{data.total_bovinos?.toLocaleString() || 'N/D'}</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white border-2 rounded-lg p-6">
                                                        <h4 className="font-medium text-2xl mb-4">Establecimientos</h4>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <p className="text-xl text-gray-500">N° RENSPA</p>
                                                                <p className="text-2xl font-medium">{data.numero_renspa || 'N/D'}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xl text-gray-500">Vacas por establecimiento</p>
                                                                <p className="text-2xl font-medium">{data.vacas_por_tambo?.toFixed(1) || 'N/D'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </>
                                )}

                                {modoVisualizacion === "industrias" && (
                                    <>
                                        {datosCompletos.industrias
                                            .filter(d => d.departamento === departamento.departamento)
                                            .map((data, i) => (
                                                <div key={i} className="space-y-6">
                                                    <div className="bg-cyan-50 p-6 rounded-lg">
                                                        <p className="text-xl text-cyan-600">Industrias lácteas</p>
                                                        <p className="text-5xl font-bold">{data.numero_industrias || 'N/D'}</p>
                                                        <p className="text-base text-gray-500 mt-2">{data.porcentaje_industrias ? (data.porcentaje_industrias * 100).toFixed(1) + '% provincial' : ''}</p>
                                                    </div>

                                                    <div className="bg-white border-2 rounded-lg p-6">
                                                        <h4 className="font-medium text-2xl mb-4">Distribución provincial</h4>
                                                        <p className="text-xl text-gray-600">
                                                            Este departamento concentra el {(data.porcentaje_industrias * 100).toFixed(1)}% de las
                                                            industrias lácteas de Entre Ríos.
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center">
                                <button
                                    onClick={closeModal}
                                    className="px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-bold"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MapaAgricola;
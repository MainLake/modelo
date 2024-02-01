import { useState } from "react";

import 'katex/dist/katex.min.css';

import { InlineMath} from 'react-katex';

import Grafico from "./grafico";

const calcC = (intencidadInicial) => {
  return intencidadInicial / 1;
}

const calcK = (intencidadFinal, C, piesFinal) => {
  return -((Math.log((intencidadFinal / C))) / piesFinal);
}

const calcP = (intencidad, C, K) => {
  return -(Math.log(intencidad / C) / K);
}

const calcI = (pies, C, K) => {
  return (C * Math.E ** (-K * pies));
}

const App = () => {

  const [datos, setDatos] = useState({
    intencidadInicial: 0,
    piesInicial: 0,

    intencidadFinal: 0,
    piesFinal: 0,

    C: 0,
    K: 0,
    P: 0,
    I: 0
  });

  const [dataGrafico, setDataGrafico] = useState(null);

  const [selectedOption, setSelectedOption] = useState("intencidad");
  const [selectedOptionIntencidad, setSelectedOptionIntencidad] = useState("porcentual");


  const calcular = () => {
    const C = calcC(datos.intencidadInicial);
    const K = calcK(datos.intencidadFinal, C, datos.piesFinal);
    let P = 0
    let I = 0

    if (selectedOptionIntencidad === "porcentual") {
      const intencidadPorcentual = datos.intencidadInicial * (datos.intencidadFinal / 100);

      console.log({
        intencidadInicial: datos.intencidadInicial,
        intencidadPorcentual
      })


      setDatos({
        ...datos,
        intencidadFinal: intencidadPorcentual
      });
    } else {
      setDatos({
        ...datos,
        intencidad: datos.intencidad
      });
    }



    if (selectedOption === "pies") {
      P = calcP(datos.intencidadFinal, C, K);
      I = datos.intencidad;
    } else {
      I = calcI(datos.pies, C, K);
      P = datos.pies
    }

    const dataSec = [];

    for (let i = 0; i <= P; i += .5) {
      dataSec.push({
        pies: i + " p",
        intencidad: calcI(i, C, K)
      });
    }
    setDataGrafico([...dataSec]);
    setDatos({
      ...datos,
      C: C,
      K: K,
      P: P,
      I: I
    });
  }


  const handleOptionChange = (evt) => {
    setSelectedOption(evt.target.value);
  }

  const handleOptionChangeIntencidad = (evt) => {
    setSelectedOptionIntencidad(evt.target.value);
  }

  return (
    <main className="container mx-auto p-4">
      {/* 
      <div>
        depuracion
        <pre>
          {JSON.stringify(datos, null, 2)}
        </pre>
      </div> */}

      <section className="mb-8 border-b-2 pb-4">
        <h2 className="text-3xl font-bold underline mb-4">Inserción de datos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2 text-blue-700">Muestra inicial en tiempo 0</h2>
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Ingresa la intensidad inicial</label>
              <input
                type="number"
                className="w-full border p-2"
                required
                onChange={(evt) => setDatos({ ...datos, intencidadInicial: evt.target.value })}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 text-green-700">Segunda muestra de datos</h2>

            <div className="mt-4">

              <label className="block text-gray-700 mb-2">Ingresa la intensidad:</label>
              <input
                type="number"
                className="w-full border p-2"
                required
                onChange={(evt) => setDatos({ ...datos, intencidadFinal: evt.target.value })}
              />

              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    value="porcentual"
                    checked={selectedOptionIntencidad === 'porcentual'}
                    onChange={handleOptionChangeIntencidad}
                  />
                  <span className="ml-2 text-gray-700">Intensidad porcentual</span>
                </label>

                <label>
                  <input
                    type="radio"
                    value="absoluta"
                    checked={selectedOptionIntencidad === 'absoluta'}
                    onChange={handleOptionChangeIntencidad}
                  />
                  <span className="ml-2 text-gray-700">Intensidad absoluta</span>
                </label>
              </div>
            </div>

            <hr className="mt-8 border-t-2 border-gray-300" />


            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Ingresa la profundidad en pies:</label>
              <input
                type="number"
                className="w-full border p-2"
                required
                onChange={(evt) => setDatos({ ...datos, piesFinal: evt.target.value })}
              />
            </div>
          </div>
        </div>

        <hr className="mt-8 border-t-2 border-gray-300" />

        <div className="mt-4">
          <h2 className="text-3xl font-bold underline mb-4">Probar modelo</h2>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                value="intencidad"
                checked={selectedOption === 'intencidad'}
                onChange={handleOptionChange}
              />
              <span className="ml-2 text-gray-700">Calcular Intensidad</span>
            </label>

            <label>
              <input
                type="radio"
                value="pies"
                checked={selectedOption === 'pies'}
                onChange={handleOptionChange}
              />
              <span className="ml-2 text-gray-700">Calcular Pies</span>
            </label>
          </div>

          {selectedOption === 'intencidad' ? (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Calcular intensidad</h2>
              <div className="mt-2">
                <label className="block text-gray-700 mb-2">
                  Ingresa la profundidad en pies para calcular la intensidad:
                </label>
                <input
                  type="number"
                  className="w-full border p-2"
                  required
                  onChange={(evt) => setDatos({ ...datos, pies: evt.target.value })}
                />
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Calcular los pies</h2>
              <div className="mt-2">
                <label className="block text-gray-700 mb-2">Ingresa la intensidad para calcular los pies:</label>
                <input
                  type="number"
                  className="w-full border p-2"
                  required
                  onChange={(evt) => setDatos({ ...datos, intencidad: evt.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={calcular}>
            Calcular
          </button>
        </div>
      </section>

      {/* Sección: Resultados */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Resultados:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <InlineMath>{`C = \\frac{I}{e^{-Kt}}`}</InlineMath>
            <p className="text-lg font-semibold mb-1 text-gray-700">Valor de C:</p>
            <p className="text-xl text-green-600">{datos.C}</p>
          </div>
          <div className="mb-4">
            <InlineMath>{`K = -\\frac{\\ln(\\frac{I}{C})}{t}`}</InlineMath>
            <p className="text-lg font-semibold mb-1 text-gray-700">Valor de K:</p>
            <p className="text-xl text-green-600">{datos.K}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-1 text-gray-700">Pies:</p>
            <p className={selectedOption === "pies" ? "text-xl text-red-600" : "text-xl text-green-600"}>{datos.P}</p>
          </div>
          <div className="mb-4">
            <InlineMath>{`I = Ce^{-Kt}`}</InlineMath>
            <p className="text-lg font-semibold mb-1 text-gray-700">Intensidad:</p>
            <p className={selectedOption === "intencidad" ? "text-xl text-red-600" : "text-xl text-green-600"}>{datos.I}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Grafico dataGrafico={dataGrafico} />
      </section>
    </main>

  );
}

export default App;

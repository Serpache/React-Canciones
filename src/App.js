import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'

import Formulario from './components/Formulario'
import Cancion from './components/Cancion'
import Info from './components/Info'

function App() {

  //state
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return;

    const consultarAPILetras = async () => {
      const {artista, cancion} = busquedaLetra;
      //url para la letra
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      //url para la información del artista
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //Si se hicieran simplemente dos axios uno detras de otro con dos await hasta que no acabase
      //el primero no comenzaría la llamada al segundo, así se lanzan a la vez
      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
    }
    consultarAPILetras();

  }, [busquedaLetra])

  return (
    <Fragment>
        <Formulario 
          guardarBusquedaLetra={guardarBusquedaLetra}
        />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Info 
                info={info}
              />
            </div>
            <div className="col-md-6">
              <Cancion
                letra={letra}
              />
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;

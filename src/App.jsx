import { useEffect, useState } from "react"
import axios from "axios";
import './App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [Usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTabalaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet=async() =>{
    await axios.get("https://www.fruityvice.com/api/fruit/all")
    .then(response=>{
      setUsuarios(response.data);
      setTabalaUsuarios(response.data);
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);

   
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ||elemento.family.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ||elemento.genus.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;

      }
    });
    setUsuarios(resultadosBusqueda);
  }
useEffect(() =>{
    peticionGet();
  },[])
 
  return (

    <>

<h1 className="text-center  fw-normal  fs-1"> Lista de Frutas  </h1>

  <div className="app">
    <div className="containerInput m-4">
      <input 
      className="form-control inputBuscar"
      value={busqueda}
      placeholder="Búsqueda por Nombre,Familia o Género"
      onChange={handleChange}
      />
      <button className="btn btn-sucess">
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    </div>
  
    <div className="table-resposibe m-5">
      <table className="table table-striped">
        <thead>
          <tr> 
            <th className="table-dark">ID</th>
            <th className="table-dark">Name</th>
            <th className="table-dark">Family</th> 
            <th className="table-dark">Genus</th>
            <th className="table-dark">Caloris</th>
            <th className="table-dark">Carbohydrates</th>
            <th className="table-dark">Fat</th>
            <th className="table-dark">Protein</th>
            <th className="table-dark">sugar</th>
            <th className="table-dark">order</th>
          </tr>
        </thead>
        <tbody>
          {Usuarios &&
          Usuarios.map((usuario)=>(
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.family}</td>
              <td>{usuario.genus}</td>
              <td>{usuario.nutritions.calories}</td>
              <td>{usuario.nutritions.carbohydrates}</td>
              <td>{usuario.nutritions.fat}</td>
              <td>{usuario.nutritions.protein}</td>
              <td>{usuario.nutritions.sugar}</td>
              <td>{usuario.order}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    </>
  )
}

export default  App
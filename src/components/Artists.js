import React, { useEffect, useState } from 'react';
import { getArtists, postArtist, deleteArtist, editArtist } from '../services/api';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [isEditing, setEditing] = useState(false)
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState({
    nome: '',
    nacionalidade: '',
    dataNascimento: ''
  })

  useEffect(() => {
    loadArtists()

    return () =>{
      
    }
  }, [artists])

  const loadArtists = async() => {
    const artists = await getArtists();
      setArtists(artists.data.content)
  }

  const handleChange = e => {
    setArtist({
      ...artist, [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(isEditing) {
      async function editArtistFun() {
        try{
          let newdate = artist.dataNascimento.split('/')
          artist.dataNascimento = `${newdate[2]}-${newdate[1]}-${newdate[0]}`
          await editArtist(artist)
  
        } catch (e) {
          console.log(`something wrong ${e.message}`)
        }
      }
     
      editArtistFun()
      setEditing(false)

    }else {
      async function postArtistFun() {
        try{
          let newdate = artist.dataNascimento.split('/')
          artist.dataNascimento = `${newdate[2]}-${newdate[1]}-${newdate[0]}`
          await postArtist(artist)
  
        } catch (e) {
          console.log(`something wrong ${e.message}`)
        }
      }
     
      postArtistFun()
    }
    
    loadArtists()

    setArtist({
      nome : '',
      nacionalidade:'',
      dataNascimento: ''
    })
  }

  const handleApagar = (id) => {
    async function deleteArtistFun() {
      try{
        await deleteArtist(id)

      } catch (e) {
        console.log(`something wrong ${e.message}`)
      }
    }
   
    deleteArtistFun()
  }

  return (
    <div className="container my-5">

      <form className="form-inline mx-auto mb-2" style={{display: 'inline-block'}} onSubmit={handleSubmit} >
        <label className="sr-only" htmlFor="inlineFormInputName2">Nome</label>
        <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome" onChange={handleChange} value={artist.nome}/>

        <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Nacionalidade</label>
        <input type="text" className="form-control" id="nacionalidade" name="nacionalidade" placeholder="Nacionalidade" onChange={handleChange} value={artist.nacionalidade}/>

        <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Data Nascimento</label>
        <input type="text" className="form-control" id="dataNascimento" name="dataNascimento" placeholder="dataNascimento" onChange={handleChange} />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Nacionalidade</th>
            <th scope="col">Data Nascimento</th>
            <th scope="col">Editar</th>
            <th scope="col">Apagar</th>
          </tr>
        </thead>
        <tbody>
          { artists.map(artist => {
              return (
                <tr key={artist.id}>
                  <th scope="row">{artist.id}</th>
                  <td><Link to={'/albums/'+ artist.id} className="text-light">{artist.nome}</Link></td>
                  <td>{artist.nacionalidade}</td>
                  <td>{artist.dataNascimento ? artist.dataNascimento : "Sem data"}</td>
                  <td>
                    <button type="button" className="btn btn-warning" onClick={e => {
                                setArtist({...artist})
                                setEditing(true)
                              }}>
                      <i className="far fa-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger" 
                            onClick={() => { window.confirm('Tem certeza que quer deletar?') && handleApagar(artist.id) }}>
                    <i className="far fa-trash-alt"></i></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Artists
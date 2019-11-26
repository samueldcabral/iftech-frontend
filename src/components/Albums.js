import React, { useState, useEffect }from 'react'
import { getAlbums, postAlbum, deleteAlbum } from '../services/api';
import { Link } from 'react-router-dom';

const Albums = props => {
  const [albums, setAlbums] = useState([])
  const [album, setAlbum] = useState({})
  const { artistId } = props.match.params

  useEffect(() => {
    async function loadAlbums() {
      const albums = await getAlbums();
      setAlbums(albums.data.content)
    }
    
    loadAlbums()
 
  }, [])

  const handleChange = e => {
    setAlbum({
      ...album, [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    async function postAlbumFun() {
      try{
        album.artistaId = artistId
        await postAlbum(album)
      } catch (e) {
        console.log(`something wrong ${e}`)
      }
    }
   
    postAlbumFun()
  }

  const handleApagar = (id) => {
    async function deleteAlbumFun() {
      try{
        await deleteAlbum(id)

      } catch (e) {
        console.log(`something wrong ${e.message}`)
      }
    }
   
    deleteAlbumFun()
  }

  return (
    <div className="container my-5">

      <form className="form-inline mx-auto mb-2" style={{display: 'inline-block'}} onSubmit={handleSubmit} >
        <label className="sr-only" htmlFor="inlineFormInputName2">Nome</label>
        <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome do album" onChange={handleChange}/>

        <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Faixas</label>
        <input type="text" className="form-control" id="faixas" name="faixas" placeholder="faixas" onChange={handleChange}/>

        <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Ano Gravação</label>
        <input type="text" className="form-control" id="anoGravacao" name="anoGravacao" placeholder="Ano Gravação" onChange={handleChange}/>

        <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Genero</label>
        <input type="text" className="form-control" id="genero" name="genero" placeholder="Genero" onChange={handleChange}/>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Faixas</th>
            <th scope="col">Ano de Gravação</th>
            <th scope="col">Genero</th>
            <th scope="col">Editar</th>
            <th scope="col">Apagar</th>
          </tr>
        </thead>
        <tbody>
          { albums
            .filter(album => album.artistaId === parseInt(artistId))
            .map(album => {
              return (
                <tr key={album.id}>
                  <th scope="row">{album.id}</th>
                  {/* <td><Link to={'/songs/'+ album.id + } className="text-light">{album.nome}</Link></td> */}
                  <td><Link to={`/songs/${album.id}/${artistId}`} className="text-light">{album.nome}</Link></td>
                  <td>{album.faixas}</td>
                  <td>{album.anoGravacao}</td>
                  <td>{album.genero}</td>
                  <td>
                    <button type="button" className="btn btn-warning">
                      <i className="far fa-edit"></i>
                    </button>
                  </td>
                  <td>
                  <button type="button" className="btn btn-danger" 
                          onClick={() => { window.confirm('Tem certeza que quer deletar?') && handleApagar(album.id) }}>
                  <i className="far fa-trash-alt"></i></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={() => props.history.goBack()}>voltar</button>
    </div>
  )
}

export default Albums
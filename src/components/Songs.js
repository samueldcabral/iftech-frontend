import React, { useState, useEffect }from 'react'
import { getSongs, getArtist, postSong, deleteSong } from '../services/api';
import { Link } from 'react-router-dom';

const Songs = props => {
  const [songs, setSongs] = useState([])
  const [song, setSong] = useState({})
  const [artista, setArtista] = useState("")
  const { albumId } = props.match.params
  const { artistId } = props.match.params

  useEffect(() => {
    async function loadSongs() {
      const songs = await getSongs();
      const artista = await getArtist(artistId);
 
      setSongs(songs.data.content)
      setArtista(artista.data)
    }
    
    loadSongs()
 
  }, [artistId])

  const handleChange = e => {
    setSong({
      ...song, [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    async function postSongFun() {
      try{
        song.albumId = albumId
        await postSong(song)
      } catch (e) {
        console.log(`something wrong ${e}`)
      }
    }
   
    postSongFun()
  }

  const handleApagar = (id) => {
    async function deleteSongFun() {
      try{
        await deleteSong(id)

      } catch (e) {
        console.log(`something wrong ${e.message}`)
      }
    }
   
    deleteSongFun()
  }

  return (
    <div className="container my-5">

      <form className="form-inline mx-auto mb-2" style={{display: 'inline-block'}} onSubmit={handleSubmit} >
        <label className="sr-only" htmlFor="inlineFormInputName2">Nome da Música</label>
        <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome da Música" onChange={handleChange}/>

        <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Duração</label>
        <input type="text" className="form-control" id="duracao" name="duracao" placeholder="duracao" onChange={handleChange}/>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Duração</th>
            <th scope="col">Editar</th>
            <th scope="col">Apagar</th>
          </tr>
        </thead>
        <tbody>
          { songs
            .filter(song => song.albumId === parseInt(albumId))
            .map(song => {
              return (
                <tr key={song.id}>
                  <th scope="row">{song.id}</th>
                  {/* <td>{song.nome}</td> */}
                  <td><Link to={`/lyrics/${artista.nome}/${song.nome}`} className="text-light">{song.nome}</Link></td>
                  <td>{song.duracao}</td>
                  <td>
                    <button type="button" className="btn btn-warning">
                      <i className="far fa-edit"></i>
                    </button>
                  </td>
                  <td>
                  <button type="button" className="btn btn-danger" 
                          onClick={() => { window.confirm('Tem certeza que quer deletar?') && handleApagar(song.id) }}>
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

export default Songs
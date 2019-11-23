import React, { useState, useEffect }from 'react'
import { getSongs, getArtist } from '../services/api';
import { Link } from 'react-router-dom';

const Songs = props => {
  const [songs, setSongs] = useState([])
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

  return (
    <div className="container my-5">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Duração</th>
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
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Songs
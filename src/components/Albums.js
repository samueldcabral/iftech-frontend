import React, { useState, useEffect }from 'react'
import { getAlbums } from '../services/api';
import { Link } from 'react-router-dom';

const Albums = props => {
  const [albums, setAlbums] = useState([])
  const { artistId } = props.match.params

  useEffect(() => {
    async function loadAlbums() {
      const albums = await getAlbums();
      setAlbums(albums.data.content)
    }
    
    loadAlbums()
 
  }, [])

  return (
    <div className="container my-5">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Faixas</th>
            <th scope="col">Ano de Gravação</th>
            <th scope="col">Genero</th>
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
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Albums
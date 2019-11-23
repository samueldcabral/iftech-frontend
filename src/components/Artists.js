import React, { useEffect, useState } from 'react';
import { getArtists } from '../services/api';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    async function loadArtists() {
      const artists = await getArtists();
      setArtists(artists.data.content)
    }
    
    loadArtists()
  }, [])

  return (
    <div className="container my-5">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Nacionalidade</th>
            <th scope="col">Data Nascimento</th>
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
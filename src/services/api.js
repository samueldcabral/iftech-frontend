import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

const lyricsApi = axios.create({
  baseURL: 'https://api.lyrics.ovh/v1/'
})

export async function getArtists() {
  return await api.get('/artistas')
};

export async function getArtist(id) {
  return await api.get(`/artistas/${id}/`)
};

export async function getAlbums() {
  return await api.get('/albuns')
};

export async function getAlbum(id) {
  return await api.get(`/albuns/${id}/`)
};

export async function getSongs() {
  return await api.get('/musicas')
};

export async function getSong(id) {
  return await api.get(`/musicas/${id}/`)
};

export async function getLyrics(artist, song) {
  let artistQuery = prepareHttp(artist)
  let songQuery = prepareHttp(song)

  return await lyricsApi.get(`${artistQuery}/${songQuery}`)
}

export async function postArtist(artist) {
  return await api.post('artistas', {
    'nome' : artist.nome,
    'nacionalidade': artist.nacionalidade,
    'dataNascimento' : artist.dataNascimento
  })
}

export async function postAlbum(album) {
  return await api.post('albuns', {
    'nome' : album.nome,
    'faixas': parseInt(album.faixas),
    'anoGravacao' : album.anoGravacao,
    'genero' : album.genero,
    'artistaId' : album.artistaId
  })
}

export async function postSong(song) {
  return await api.post('musicas', {
    'nome' : song.nome,
    'duracao': parseInt(song.duracao),
    'albumId' : song.albumId
  })
}

export async function deleteArtist(artistId) {
  return await api.delete(`artistas/${artistId}`)
}

export async function deleteAlbum(albumId) {
  return await api.delete(`albuns/${albumId}`)
}

export async function deleteSong(songId) {
  return await api.delete(`musicas/${songId}`)
}

export async function editArtist(artist) {
  return await api.put(`artistas/${artist.id}`, {
    'nome' : artist.nome,
    'nacionalidade': artist.nacionalidade,
    'dataNascimento' : artist.dataNascimento
  })
}

export async function editAlbum(album) {
  return await api.put(`albuns/${album.id}`, {
    'nome' : album.nome,
    'faixas': parseInt(album.faixas),
    'anoGravacao' : album.anoGravacao,
    'genero' : album.genero,
    'artistaId' : album.artistaId
  })
}

export async function editSong(song) {
  return await api.put(`musicas/${song.id}`, {
    'nome' : song.nome,
    'duracao': parseInt(song.duracao),
    'albumId' : song.albumId
  })
}

function prepareHttp(str) {
  let result = str.replace(/ /g, "%20") // substitute " " for the http correpondent which is %20
  result = result.replace(/'/g, "%27") // substitute ' for the http correpondent which is %27
  return result
}

export default api
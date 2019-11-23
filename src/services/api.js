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

function prepareHttp(str) {
  let result = str.replace(/ /g, "%20") // substitute " " for the http correpondent which is %20
  result = result.replace(/'/g, "%27") // substitute ' for the http correpondent which is %27
  return result
}

export default api
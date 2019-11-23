import React, { useState, useEffect } from 'react'
import { getLyrics } from '../services/api';

const Lyrics = props => {
  const [lyrics, setLyrics] = useState("")
  const { artist } = props.match.params
  const { song } = props.match.params

  useEffect(() => {
    async function loadLyrics() {
      const lyrics = await getLyrics(artist, song);
 
      console.log(lyrics.data)
      setLyrics(lyrics.data)
    }
    
    loadLyrics()
 
  }, [artist, song])

  return (
    <div className="container my-5">
      {lyrics !== "" ? lyrics.lyrics.includes("\n") ? 
          lyrics.lyrics.split("\n").map(x => <div>{x}</div>)    : "lolas" 
                                                                : "lol"}
    </div>
  )
}

export default Lyrics
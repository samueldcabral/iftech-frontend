import React, { useState, useEffect } from 'react'
import { getLyrics } from '../services/api';
import Spinner from '../components/Spinner'

const Lyrics = props => {
  const [lyrics, setLyrics] = useState("")
  const { artist } = props.match.params
  const { song } = props.match.params

  useEffect(() => {
    async function loadLyrics() {
      const lyrics = await getLyrics(artist, song);
      setLyrics(lyrics.data)
    }
    
    loadLyrics()
 
  }, [artist, song])

  return (
    <>
      <button className="btn btn-primary" onClick={() => props.history.goBack()}>voltar</button>
      <div className="container my-5">
        {lyrics !== "" ? 
        
            lyrics.lyrics.includes("\n") &&
            lyrics.lyrics.split("\n").map((x, index) => <p key={index}>{x}</p>)    
  
                       : 

            <Spinner/>
        }           
      </div>
    </>
  )
}

export default Lyrics
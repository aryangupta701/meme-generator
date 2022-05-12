import React from 'react'

const Meme = () => {

  const [meme,setMeme] = React.useState({
    topText : "",
    bottomText : "",
    img: "https://i.imgflip.com/1ur9b0.jpg"
  })

  const[allMemeData, setAllMemeData] = React.useState([])

  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemeData(data.data.memes))
  },[])

  const handleButton = ()=>{
    const n = allMemeData.length
    const r = Math.floor((Math.random()*n))

    setMeme((prev)=>{
      return {
        ...prev ,
        img : allMemeData[r].url
      }
    })
  }
  
  const handleChange = (event)=>{
      const {name , value } = event.target
      setMeme( (prev)=>{
        return {
          ...prev,
          [name]: value
        }
      })
  }

  return (
    <div className='meme-body'>
        <div className='input-form' >
            <div className='input-box' >
                <input 
                  placeholder="Top Text" 
                  value={meme.topText}
                  name="topText"
                  onChange={handleChange}
                  id="top-text-input" 
                />
                <input 
                  placeholder="Bottom Text" 
                  id="bottom-text-input"
                  value={meme.bottomText}
                  onChange={handleChange}
                  name="bottomText"
                />
            </div>
            <button className='submit-button' onClick={handleButton} >Get a new meme image 🖼</button>
        </div>
        <div className="meme">
                <img src={meme.img} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
    </div>
  )
}

export default Meme
import React, {useState,useRef} from 'react'
import './ImageGenerator.css'
import default_image from '../assets/default_image.svg'

const ImageGenerator = () => {

    const [image_url,setImage_url]=useState("/");
    let inputRef = useRef(null);

    //f64af3a3043ffaca808f2321197567d1


    const imageGenerate = async () =>{
        if(inputRef.current.value===""){
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:'${inputRef.current.value}',
                    n:1,
                    size:"512x512",
                })
            }
        );
        let data = await response.json();
        console.log(data);
        
        if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
          setImage_url(data.data[0].url);
        } else {
          // Gérer le cas où les données ne sont pas dans le format attendu
          console.error('Données non valides ou absentes dans la réponse.');
        }
    }


  return (
    <div className='ai-image-generatort'>
        <div className="header">
            AI image <span>Generator</span>
        </div>
        <div className="img-loading">
            <div className="image">
                <img src={image_url==="/"?default_image:image_url} alt="" />
            </div>
            <div className="loading">
                <div className="loading-bar">
                    <div className="loading-text">
{/*                         Loading...
 */}                    </div>
                </div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" className='search-input' ref={inputRef} placeholder='Describe what you want to see'/>
        <div className="generate-btn" onClick={()=>{imageGenerate()}}>
            Generate
        </div>
        </div>
    </div>
  )
}

export default ImageGenerator
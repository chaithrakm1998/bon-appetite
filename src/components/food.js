import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE = "https://unsplash.com/photos/4_jhDO54BYg.jpg"
const Foods = ({food}) => {
    const poster = food.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : food.Poster;
    return(
        <div className="food">
            <h2>{food.Title}</h2>
            <div>
                
                <img width="200" alt={`The food titled: ${food.title}`} src={poster}/>
            </div>
            

        </div>
    )

}

export default Foods;
    
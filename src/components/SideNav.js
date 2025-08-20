import React from 'react'
import { first151Pokemon, getFullPokedexNumber } from "../utils"  //abhi mene sirf import {first151pokemon} likha tha and then what it did was it automatically selected the path from which the export has to be made bcoz by default the export from index.js named filed is being done if there is only 1 file in the entire folder or even being multiple index one is chosen

export default function SideNav(){
    return(
        <nav>
            <div className={'header'}>
                <h1>PokeDex</h1>
            </div>
            <input/>
            {first151Pokemon.map((pokemon,pokemonindex)=>{
                return(
                    //here i'm using space after the classname is bcoz i want to use dynamic class name 
                    <button key={pokemonindex} className={'nav-card '}>  
                        <p>{getFullPokedexNumber(pokemonindex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}
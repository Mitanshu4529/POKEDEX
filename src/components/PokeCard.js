import { useEffect, useState } from "react"
import { getPokedexNumber,getFullPokedexNumber } from "../utils"
import TypeCard from "./TypeCard"

export default function PokeCard(props){
    const {selectedpokemon}=props
    const [data,setdata]=useState(null)
    const [loading,setloading]=useState(null)

    //Destructuring is just a fancy word for pulling values out of an object or array and assigning them to variables in a clean and shorthand way.
    const {name,height,abilities,stats,types,moves,sprities}=data||{}

    //as mentioned earlier use effect is like kuch condition do agr woh true then executed but the thing is that it works on dependancy array that is used at the end in which i have passed selectedpokemon so if the condition is true for anything and then the dependancy array is being matched based on that then it will be executed
    useEffect(()=>{
        //if loading,then simply just exit logic
        if(loading || !localStorage) return 
        
        //check if the selectedpokemon information is being already stored in the cache
        //1.define the cache
        let cache={}
        if(localStorage.getItem('pokedex')){
            cache=JSON.parse(localStorage.getItem('pokedex'))
        }

        //2.check if the pokemon is in the cache or else fectch from the api
        if(selectedpokemon in cache){
            //read the cache
            setdata(cache[selectedpokemon])
            return
        }
        
        async function fetchpokemon(){
            setloading(true)
            try{
                const baseurl='https://pokeapi.co/api/v2/'
                const suffix='pokemon/'+getPokedexNumber(selectedpokemon)
                const finalurl=baseurl+suffix
                const res=await fetch(finalurl)
                const pokemondata=await res.json()
                setdata(pokemondata)
                console.log(pokemondata)
                cache[selectedpokemon]=pokemondata
                localStorage.setItem('pokedex',JSON.stringify(cache))
            }
            catch(err){
                console.log(err.message)
            }
            finally{
                setloading(false)
            }
        }
        
        fetchpokemon()
        //3.if we fetch from api make sure to save that information in the cache 
    },[selectedpokemon])

    if(loading||!data){
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return(
        <div className="pokecard">
            <div>
                <h4>{getFullPokedexNumber(selectedpokemon)}</h4>
                <h4>{name}</h4>
                <div className="type-container">
                    {types.map((type,typeindex)=>{
                        return (
                            <TypeCard key={typeindex} type={type}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
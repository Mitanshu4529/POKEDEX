import  SideNav  from "./components/SideNav";
import  Header  from "./components/Header";
import  PokeCard  from "./components/PokeCard";
import  React,{useState}  from "react";

function App() {

  const [selectedpokemon,setselectedpokemon]=useState(0)

  return (
    //You're passing data and functions down to the SideNav component as props. It's like giving SideNav some "tools" or "info" it can use.
    <>
      <Header/>
      <SideNav selectedpokemon={selectedpokemon} setselectedpokemon={setselectedpokemon}/>
      <PokeCard selectedpokemon={selectedpokemon}/> 
    </>
  );
}

export default App;

import '../styles/App.scss';
import phrases from'../data/phrases.json';
import { useState } from 'react';


function App() {

  const [data, setData] = useState(phrases);    
  const [searchQuote, setSearchQuote] = useState("");
  const [searchCharacter, setSearchCharacter] = useState("");
  const [newPhrase, setNewPhrase] = useState('');

//con una variable
  const renderList = () => {
     return data
      .filter((phrase) => {
        return phrase.quote.toLowerCase().includes(searchQuote.toLowerCase());
      })
      .filter((name) => {
        if (searchCharacter === "all") {
          return name;
        } else {
          return name.character
            .toLowerCase()
            .includes(searchCharacter.toLowerCase());
        }
      })
     
      .map((eachPhrase, i) => (
     <li className='list' key={i}> 
     <p> {eachPhrase.quote} </p>
      <span>{eachPhrase.character}</span>
     </li>
  ));
  }

 

  const handleNewPhrase = (ev) => {
    //spread operator
    setNewPhrase({...newPhrase, [ev.target.id]: ev.target.value});
  }
//funcion handleclick
  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newPhrase]);
  }
//funcion filtro
const hadleFilterQuote = (ev => {
  setSearchQuote(ev.target.value);
});


const handleFilterCharacter = (ev => {
  setSearchCharacter(ev.target.value);
});

  return (
    <div className="page">
      {/* header filtro */}
      <header className="header">
          <h1 className="header__title">Frases de Friends</h1>
        <form className='form'>

          <label htmlFor="form__quote-filter">Filtrar por frases</label>
          <input
            className="form__search"
            type="text"
            name="search-quote"
            id='search-quote'
            onInput={hadleFilterQuote}
            value={searchQuote}

          />

          <label htmlFor="caracter-filter">Filtrar por personaje</label>
           <select  className="form__search"
            type="search"
            name="character"
            id='character'
            onInput={handleFilterCharacter}
            value={searchCharacter}
            >
              <option value=""></option>
            </select>
            
        </form>
      </header>

      <main>
        {/* contact list */}
        <ul className="main__quotes">
        {renderList()}
         
        </ul>

        {/* new Phrase */}
        <form className="new-contact__form">
          <h2 className="new-contact__title">Añadir una nueva frase</h2>
          <label htmlFor="">Frase:</label>
          <input
            className="new-contact__input"
            type="text"
            name="quote"
            id="quote"
            placeholder='Ej. Unaji!'
            onInput={handleNewPhrase}
            value={newPhrase.quote}

          />
          <label htmlFor="">Paersonaje:</label>
          <input
            className="new-contact__input"
            type='text'
            name="character"
            id="character"
            placeholder='EJ. Ross'
            onInput={handleNewPhrase}
            value={newPhrase.character}
          />
          <input className="new-contact__btn" type="submit" value="Añadir nueva frase" onClick={handleClick} />
        </form>
      </main>
    </div>
  );
}

export default App;
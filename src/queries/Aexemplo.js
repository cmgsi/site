
import styled from 'styled-components';
import { start } from './queries/TesteQuery'

import React, { useEffect, useState } from 'react';

// export  function CallList() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     let mounted = true;
//     start()
//       .then(items => {
//         if (mounted) {
//           setList(items)
//         }
//       })
//     return () => mounted = false;
//   }, [])
//   return (list)
// }



const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 28vh;
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 200;
  font-size: 0.73rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 0.73rem;
  font-weight: 400;
  overflow-y: scroll; 
  height: 20vh;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.1em;
`;

var options = [] 

function App() {

  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    start()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])
  options= list


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <Main>
      <center><h6>Cidades</h6></center>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "São Paulo"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Main>
  );
}

 export default App;
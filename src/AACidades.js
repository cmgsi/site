import styled from 'styled-components';
import { start } from './AAQueryCidades.js';
import { start2 } from './ABQueryCidades.js';
import React, { useEffect, useState } from 'react';
import { ButtonDefault } from "./carrotsearch/ui/ButtonDefault.js";
import { Button } from "@blueprintjs/core";

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
  height: 16vh;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.1em;
`;


var options = []
const options2 = ["Federal", "Estadual", "Municipal"];

var city = ''
var revenue = ''
var params = [];

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
  options = list

  //Municipal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
    city = value;
  };

  //Federal
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const togglingFederal = () => setIsOpen2(!isOpen2);
  const onOptionClickedFederal = value => () => {
    setSelectedOption2(value);
    setIsOpen2(false);
    console.log(selectedOption2);
    revenue = value
  };

  function getAllPageParams() {
    var ano = 2010;
    var origem = revenue;
    var municipio = city;
    return [ano, origem, municipio];
  }



  const ExampleLink = ({ fileName, label, onClick, children }) => {
    return <>
      <ButtonDefault onClick={() => onClick(fileName)}>{children}</ButtonDefault>
    </>;
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
              {options.map(option => (<ListItem onClick={onOptionClicked(option)} key={Math.random()}>{option}</ListItem>))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>

      <center><h6>Fonte da Receita</h6></center>

      <DropDownContainer>
        <DropDownHeader onClick={togglingFederal}>
          {selectedOption2 || "Federal"}
        </DropDownHeader>
        {isOpen2 && (
          <DropDownListContainer>
            <DropDownList>
              {options2.map(option => (<ListItem onClick={onOptionClickedFederal(option)} key={Math.random()}>{option}</ListItem>))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      <center>
        <p>
          <Button type="button" onClick={() => consult()} > Pesquisar.. </Button>
        </p>
      </center>
    </Main>
  );

  function consult() {
    var params = getAllPageParams();
    console.log(params);
    start2(params);
  };
}



export default App;

const SimpleClient = require('sparql-http-client/SimpleClient')

var prefix = "PREFIX purl: <http://purl.org/dc/elements/1.1/> \
PREFIX w3: <http://www.w3.org/2001/vcard-rdf/3.0#> \
PREFIX : <http://example.org/book/> \
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
PREFIX owl: <http://www.w3.org/2002/07/owl#> \
PREFIX dc: <http://purl.org/dc/elements/1.1/> \
PREFIX dcterms: <http://purl.org/dc/terms/> \
PREFIX foaf: <http://xmlns.com/foaf/0.1/> \
PREFIX sim: <http://purl.org/ontology/similarity/> \
PREFIX mo: <http://purl.org/ontology/mo/> \
PREFIX ov: <http://open.vocab.org/terms/> \
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
PREFIX bra: <http://www.semanticweb.org/ontologies/OrcamentoPublicoBrasileiro.owl/>"


var query = prefix + "select ?nome WHERE { ?mun a bra:Municipio . ?mun dc:title ?nome} "

const endpointUrl = 'http://cassidy.gpopai.usp.br:8209/OrcamentoGovernoMunicipiosSP/query'

const client = new SimpleClient({ endpointUrl })

const func = async () => {
  const response = await client.query.select(query, {
    headers: {
      accept: 'application/sparql-results+json'
    }
  })
  let stringJson = await response.text()
  // console.log(stringJson)
  stringJson = JSON.parse(stringJson);
  return print(stringJson)
}

export function start() {
  return func()
    .then(v => {
      return v

    });
}


// func().then(v => {
//     console.log(v)

//   });

function print(stringJson) {

  var cities = [];

  for (var i = 0; stringJson.results['bindings'].length > i; i++) {
    cities.push(stringJson.results['bindings'][i]['nome'].value);
  }
  //sort
  cities.sort();
  //remove duplicates
  let uniqueCities = cities.filter((c, index) => {
    return cities.indexOf(c) === index;
  });
  //print
  for (i = 0; i < uniqueCities.length; i++) {
    //console.log(uniqueCities[i]);
  }
  // console.log(uniqueCities)
  return uniqueCities;
}
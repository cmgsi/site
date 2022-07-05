import XLSX from "xlsx";
export function start2(params) {

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

    var city = params[2]

    //Tabela e gráfico de setores sobre a origem das receitas
    var query = prefix + "SELECT (?tituloOrigem AS ?Origem) (SUM(?valor) AS ?total) \
                        WHERE { ?receita a bra:Receita . ?receita bra:valorArrecadado ?valor . \
                            ?receita bra:temGestor ?g . ?g dc:title '" + city + "' . \
                            ?receita bra:temOrigem ?origem . ?origem dc:title ?tituloOrigem } \
                             GROUP BY ?tituloOrigem ORDER BY DESC(?total)"

    const endpointUrl = 'http://cassidy.gpopai.usp.br:8209/OrcamentoGovernoMunicipiosSP/query'

    const client = new SimpleClient({ endpointUrl })
    const func = async (a) => {
        const response = await client.query.select(query, {
            headers: {
                accept: 'application/sparql-results+json'
            }
        })
        let stringJson = await response.text()
        stringJson = JSON.parse(stringJson);
        // console.log(stringJson)
        return print(stringJson);

    }


    return func()
        .then(v => {
            return v
        });
}

function print(stringJson) {
    var arrayReturn = [];
    arrayReturn.push(['Level 1', 'Level 2']);
    for (var i = 0; stringJson.results['bindings'].length > i; i++) {
        console.log(stringJson.results['bindings'][i]['Origem'].value);
        console.log(stringJson.results['bindings'][i]['total'].value);
        arrayReturn.push([stringJson.results['bindings'][i]['Origem'].value, stringJson.results['bindings'][i]['total'].value]);
    }


    const ws = XLSX.utils.aoa_to_sheet(arrayReturn)
     const wb = XLSX.utils.book_new()
    //  XLSX.utils.book_append_sheet(wb, ws, 'Responses')
    // XLSX.writeFile(wb, 'sampleData.xlsx');

     //Escrever(arrayReturn)

    return ("sampleData.xlsx");
}
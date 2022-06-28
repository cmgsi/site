// import { start } from './TesteQuery'
import  Exemplo  from './queries/Aexemplo'

export default function Queries() {
    var response;
    let stringJson;

    // (async () => {
    //     response = await (start());
    //     //console.log(response)
    //     //let user = await response.json();
    //     stringJson = await response;
    //     console.log('11111')
    // })();

    return (
        <div className="Queries">

            <script>
                $( document ).ready(function() {
                    // start()
                }

            </script>
            <div className="Exemplo">
                <Exemplo/>
            </div>


            {/* <p>Escolha a origem dos dados:
                <select id="selectEstado" onchange="toggleMunicipio()">
                    <option value="SP">
                        Estado de São Paulo
                    </option>
                    <option value="Federal">
                        Receitas e despesas do Governo Federal
                    </option>
                </select>
            </p>
            <p>Escolha um município:
                <select id="selectMunicipio">
                    <option value="todos">Todos
                    </option>
                </select>
            </p> */}
        </div>
    );
}
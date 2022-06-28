import React from 'react';
import Settings from "./carrotsearch/ui/settings/Settings.js";
import { view } from "react-easy-state";
import { settingsStore } from "./stores.js";
import { ButtonLink } from "./carrotsearch/ui/ButtonLink.js";
import { FormGroup } from "@blueprintjs/core";

import Queries from "./Queries";



const storeGetter = (setting) => settingsStore[setting.id];
const storeSetter = (setting, value) => settingsStore[setting.id] = value;

const settings = {
  id: "root",
  settings: [
    {
      id: "layout",
      type: "group",
      settings: [
        {
          id: "stacking",
          type: "enum",
          ui: "radio",
          label: "Arranjo",
          options: [
            { label: "Descrição no topo", value: "flattened-stab" },
            { label: "Descrição achatada e flutuante", value: "flattened-floating" },
            { label: "Hierárquico", value: "hierarchical" },
          ]
        },
        {
          id: "layout",
          type: "enum",
          ui: "radio",
          label: "Layout",
          options: [
            { label: "Retangular", value: "squarified" },
            { label: "Polígono", value: "relaxed" },
          ]
        },
        {
          id: "showPathInTitleBar",
          type: "boolean",
          label: "Mostrar hierarquia ao posicionar o mouse sobre cluster."
        }
      ]
    }
  ]
};


const SettingsPanel = view(({ welcomeClicked, exportJsonClicked, exportJsonPClicked }) => (
  <>
    <h3>Painel de Filtros e Funções</h3>

    <p>
      Para visualizar uma nova planilha, arraste e solte-a nesta janela.  <ButtonLink onClick={e => { e.preventDefault(); welcomeClicked() }}>Bem-vindo / Ajuda</ButtonLink>.
    </p>

    <div className="Queries">
      <Queries />
    </div>
    <hr />

    <button
      onclick="reloadWithQueryStringVars({'origem':$('#selectEstado').val(),'municipio':$('#selectMunicipio').val()})">Enviar dados</button>

    <hr />

    <Settings settings={settings} get={storeGetter} set={storeSetter} />

    <hr />

    <div className="Settings">
      <FormGroup label="Exportar" inline={true}>
        <div style={{ lineHeight: "30px" }}>
          <ButtonLink onClick={e => { e.preventDefault(); exportJsonClicked() }}>allData JSON (*.json)</ButtonLink>
          <ButtonLink onClick={e => { e.preventDefault(); exportJsonPClicked() }}>allData JSON-P (*.js)</ButtonLink>
        </div>
      </FormGroup>
    </div>
  </>
));


SettingsPanel.propTypes = {

};

export default SettingsPanel;

import React from 'react';
import PropTypes from 'prop-types';
import RadioSetting from "./RadioSetting.js";
import { Optional } from "../Optional.js";
import { view } from "react-easy-state";
import BooleanSetting from "./BooleanSetting.js";

const Group = view(({ setting, get, set, className }) => (
    <section className={className}>
      <Optional visible={!!setting.label} content={() => <h4>{setting.label}</h4>}/>

      {
        setting.settings.map(s => {
          return <section key={s.id} id={s.id}>{getFactory(s)(s, get, set)}</section>
        })
      }
    </section>
));

const factories = {
  "group": (s, get, set) => {
    return <Group setting={s} get={get} set={set} />;
  },

  "boolean": (s, get, set) => {
    return <BooleanSetting label={s.label} checked={get(s)} onChange={v => set(s, v)} />;
  },

  "enum": (s, get, set) => {
    if (s.ui === "radio") {
      return <RadioSetting label={s.label} selected={get(s)} onChange={v => set(s, v)} options={s.options} />;
    }
  }
};
const getFactory = s => {
  const factory = factories[s.type];
  if (!factory) {
    throw new Error(`Unknown factory for setting type: ${s.type}`);
  }
  return factory;
};

Group.propTypes = {
  setting: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired
};

export default Group;
import { Button } from "@blueprintjs/core";
import React from 'react';

export const ButtonDefault = (props) => {
  return <Button {...props} minimal={false} small={false} className={(props.className)} />
};
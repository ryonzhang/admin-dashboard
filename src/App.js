import React from 'react';
import {Main} from "./pages/Main/Main";
import { IntlProvider, FormattedMessage } from "react-intl";
import {textPool} from "./res/languages/lang";

export default function App(props) {
  return (
      <IntlProvider locale={'en'} messages={textPool['es_CL']}>
        <Main/>
      </IntlProvider>
  );
}


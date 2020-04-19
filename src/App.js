import React,{useState} from 'react';
import {Main} from "./pages/Main/Main";
import { IntlProvider, FormattedMessage } from "react-intl";
import {textPool} from "./res/languages/lang";
import {CustomContext} from "./contexts/custom-context";

export default function App(props) {
  const [locale,setLocale]=useState('es_CL');
  const value ={locale,setLocale}
  return (
      <CustomContext.Provider value={value}>
        <IntlProvider messages={textPool[locale]}>
          <Main/>
        </IntlProvider>
      </CustomContext.Provider>
  );
}


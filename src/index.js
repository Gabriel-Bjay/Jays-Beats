import React from 'react';
import './index.css';
import App from './App';
import { DataLayer } from './DataLayer';
import reducer, {initialState} from "./reducer"
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>
);

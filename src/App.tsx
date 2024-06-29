import React, { Suspense, lazy } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const LoginView = lazy(() => import('./views/login/LoginView'));
const GenerarIncidenciaView = lazy(() => import('./views/Incidencia/GenerarIncidenciaView'));
const IncidenciaView = lazy(() => import('./views/Incidencia/IncidenciasAsignadasView'));
const DiagnosticoView = lazy(() => import('./views/Diagnostico/DiagnosticoView'));
const Asignacion = lazy(() => import('./views/Asignacion/UsuariosAsignacionView'));
const AsignacionUsuario = lazy(() => import('./views/Asignacion/AsignacionView'));
const IncidenciasTerminadas = lazy(() => import('./views/supervisor/IncidenciasTerminadasView'));
const Terminada = lazy(() => import('./views/supervisor/TerminadaView'));
const Reportes = lazy(() => import('./views/Reportes/ReportesView'));

const App: React.FC = () => (
  <IonApp>
    
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginView />
          </Suspense>
        </Route>
        <Route exact path="/incidencia">
          <Suspense fallback={<div>Loading...</div>}>
            <GenerarIncidenciaView />
          </Suspense>
        </Route>
        <Route exact path="/incidencias">
          <Suspense fallback={<div>Loading...</div>}>
            <IncidenciaView />
          </Suspense>
        </Route>
        <Route exact path="/diagnostico">
          <Suspense fallback={<div>Loading...</div>}>
            <DiagnosticoView />
          </Suspense>
        </Route>  
        <Route exact path="/asignar">
          <Suspense fallback={<div>Loading...</div>}>
            <Asignacion/>
          </Suspense>
        </Route>
        <Route exact path="/asignar/incidencia">
          <Suspense fallback={<div>Loading...</div>}>
            <AsignacionUsuario/>
          </Suspense> 
        </Route>
        <Route exact path="/supervision/incidencias">
          <Suspense fallback={<div>Loading...</div>}>
            <IncidenciasTerminadas/>
          </Suspense> 
        </Route>
        <Route exact path="/supervision">
          <Suspense fallback={<div>Loading...</div>}>
            <Terminada/>
          </Suspense> 
        </Route>
        <Route exact path="/reportes">
          <Suspense fallback={<div>Loading...</div>}>
            <Reportes/>
          </Suspense> 
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

import TaskGroup from "./components/TaskGroup";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingView from "../components/LoadingView";


function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
          <h1 className="center-text">Gestion des tâches (étape 6)</h1>
          <TaskGroup groupName="Mon premier groupe" />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App;
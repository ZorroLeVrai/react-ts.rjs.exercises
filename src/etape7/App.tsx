import TaskGroup from "./components/TaskGroup";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingView from "../components/LoadingView";
import "./i18n";
import { I18nextProvider, useTranslation } from 'react-i18next';

const languages: Record<string, { nativeName: string }> = {
  en: { nativeName: "English" },
  fr: { nativeName: "Français"},
}

function App() {
  const {t, i18n } = useTranslation();

  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PersistGate loading={<LoadingView />} persistor={persistor}>
            <div className="flexRightAlign">
              {Object.keys(languages).map((lang) => (
                <button className="margin-small" type="submit" key={lang} onClick={() => i18n.changeLanguage(lang)} disabled={i18n.resolvedLanguage === lang}>{languages[lang].nativeName}</button>
              ))}
            </div>
            <h1 className="center-text">{t("manage-tasks", {step_number: 7})}</h1>
            <TaskGroup groupName={t("first-group")} />
          </PersistGate>
        </I18nextProvider>
      </Provider>
    </>
  )
}

export default App;
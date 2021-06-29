import { createContext, useEffect, useContext } from "react";
import useLocalStorage from "./useLocalStorage";
import useSettings from "./useSettings";
/**
 * @type {import('react').Context<{settings: Settings, actions: SettingsActions}>} asd
 */
const SettingsContext = createContext()
SettingsContext.displayName = 'AppSettings'

function SettingsProvider({ children }) {
    const [storedState, setStoredState] = useLocalStorage('ftx-safeboard-settings')
    const [settings, actions] = useSettings(storedState)

    useEffect(() => {
        setStoredState(settings)
        console.log('Settings updated', settings)
    }, [settings]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <SettingsContext.Provider value={{ settings, actions }}>
            {children}
        </SettingsContext.Provider>
    )
}

/** 
 * @returns {[Settings, SettingsActions]}
 */
function usePersistantSettings() {
    const { settings, actions } = useContext(SettingsContext)
    return [settings, actions]
}

/** 
 * @returns {Settings}
 */
function useConfig() {
    return useContext(SettingsContext).settings
}

/** 
 * @returns {SettingsActions}
 */
 function useConfigActions() {
    return useContext(SettingsContext).actions
}


export { useConfig }
export { useConfigActions }
export { SettingsProvider }

export default usePersistantSettings
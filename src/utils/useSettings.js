import { useReducer } from 'react'

const reducer = (state, action) => {
    switch(action.type) {
        case 'setThemeType':
            return {...state, themeType: action.payload}
        default:
            return state
    }
}

/**
 * Settings Hook
 * @param {Settings} defaultState Default State
 * @returns {[Settings, SettingsActions]} Array of settings and actions
 */
function useSettings(defaultState) {
    const initialState = {
        themeType: 'light',
        wallets: [
            { platform: "eth", address: "0x9708416338Ff224fDCA6b61C84460c4239c5Cb57" }
        ],
        ...defaultState
    }

    // reducer
    const [state, dispatch] = useReducer(reducer, initialState)
    
    // actions
    const setThemeType = value => dispatch({ type: 'setThemeType', payload: value})

    const actions = {
        setThemeType
    }
    return [state, actions]
}

export default useSettings
import { convertToDate } from "./dataAccess";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return;
        }
        let state = JSON.parse(serializedState);
        convertToDate(state);
        cleanUpState(state);
        return state;
    }
    catch (err) {
        return;
    }
}

function cleanUpState(state) {
    if (state && state.app) {
        if (state.app.processSelectionDialog) {
            state.app.processSelectionDialog.loadingProcesses = false;
        }
        state.app.loadingProcessDefinition = false;
        state.app.executingProcess = false;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch (err) {
        console.error(err);
    }
}
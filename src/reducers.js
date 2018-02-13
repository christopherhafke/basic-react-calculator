import { UPDATE_LAST_VALUE, APPEND_NEXT_VALUE, APPEND_OPERATOR, WIPE } from './actions';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
    values: [],
    operators: [],
}

function updateLastValue(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_LAST_VALUE:
            let newValues = state.values;
            if (state.values.length === 0) {
                 newValues.push(action.value);
            }
            else {
                newValues[newValues.length - 1] += action.value;
            }
            return {
                ...state,
                values: newValues
            };

        default:
            return state;
    }
}

function appendNextValue(state = INITIAL_STATE, action) {
    switch (action.type) {
        case APPEND_NEXT_VALUE:
            let newValues = state.values;
            newValues.push('');
            return {
                ...state,
                values: newValues
            };

        default:
            return state;
    }
}

function appendOperator(state = INITIAL_STATE, action) {
    switch (action.type) {
        case APPEND_OPERATOR:
            let newOperators = state.operators;
            newOperators.push(action.operator);
            return {
                ...state,
                operators: newOperators
            };

        default:
            return state;
    }
}

function wipe(state = INITIAL_STATE, action) {
    switch (action.type) {
        case WIPE:
            console.log("got here")
            return INITIAL_STATE;

        default:
            return state;
    }
}

const reducers = combineReducers({
    updateLastValue,
    appendNextValue,
    appendOperator,
    wipe
})

export default reducers;
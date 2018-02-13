
export const UPDATE_LAST_VALUE = 'UPDATE_LAST_VALUE';
export const APPEND_NEXT_VALUE = 'APPEND_NEXT_VALUE';
export const APPEND_OPERATOR = 'APPEND_OPERATOR';
export const WIPE = 'WIPE';

export function updateLastValue(value) {
    return {
        type: UPDATE_LAST_VALUE,
        value: value
    }
}

export function appendNextValue() {
    return {
        type: APPEND_NEXT_VALUE
    }
}

export function appendOperator(operator) {
    return {
        type: APPEND_OPERATOR,
        operator: operator
    }
}

export function wipe() {
    return {
    	type: WIPE
    }
}



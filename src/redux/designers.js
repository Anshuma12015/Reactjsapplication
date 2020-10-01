 import * as ActionTypes from './ActionTypes';

export const Designers = (state = {
    isLoading: true,
    errMess: null,
    designers: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DESIGNERS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                designers: action.payload
            };

        case ActionTypes.DESIGNERS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                designers: []
            }

        case ActionTypes.DESIGNERS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            };

        default:
            return state;
    }
};
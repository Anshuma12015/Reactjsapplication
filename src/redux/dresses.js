import * as ActionTypes from './ActionTypes';

export const Dresses = (state = { isLoading: true,
    errMess: null,
    dresses:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DRESSES:
            return {...state, isLoading: false, errMess: null, dresses: action.payload};

        case ActionTypes.DRESSES_LOADING:
            return {...state, isLoading: true, errMess: null, dresses: []}

        case ActionTypes.DRESSES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
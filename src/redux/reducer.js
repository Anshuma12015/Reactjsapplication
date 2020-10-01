import { DRESSES } from '../shared/dresses';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { DESIGNERS } from '../shared/designers';

export const initialState = {
    dresses: DRESSES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    designers: DESIGNERS
};

export const Reducer = (state = initialState, action) => {
    return state;
};
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Dresses } from './dresses';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Designers } from './designers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dresses: Dresses,
            comments: Comments,
            promotions: Promotions,
            designers: Designers,
           ...createForms({
                feedback: InitialFeedback
           })
        }),
      applyMiddleware(thunk, logger)
    );

    return store;
}
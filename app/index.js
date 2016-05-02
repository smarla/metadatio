/**
 * Created by sm on 30/04/16.
 */

import base from './base';
import forms from './forms';
import menus from './menus';
import pages from './pages';
import React from 'react'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './base/reducers'
import App from './base/components/app'

let store = createStore(appReducers)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

export default {
    base,
    forms,
    menus,
    pages
};
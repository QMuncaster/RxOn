import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js';
import store from "../imports/ui/store/store"
// this file is the main client-side entry point

Meteor.startup(() => {
    render(renderRoutes({store}), document.getElementById('render-target'));
});


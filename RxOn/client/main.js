import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/routes.js';
import store from "../imports/ui/store/store"

Meteor.startup(() => {
    render(renderRoutes({store}), document.getElementById('render-target'));
});


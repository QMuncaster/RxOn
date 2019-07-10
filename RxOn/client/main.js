import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js';
import store from "../imports/ui/store/store"
import WebFont from 'webfontloader';
// this file is the main client-side entry point

// This is needed to use Roboto font used by Material UI
WebFont.load({
  google: {
    families: ['Roboto:300,400,500']
  }
});

Meteor.startup(() => {
    render(renderRoutes({store}), document.getElementById('render-target'));
});


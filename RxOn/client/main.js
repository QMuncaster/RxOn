import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { renderRoutes } from "../imports/startup/client/routes.js";
import store from "../imports/ui/store/store";
import WebFont from "webfontloader";
// this file is the main client-side entry point

Meteor.startup(() => {
  // This injects Roboto fonts used by Material UI
  WebFont.load({
    google: {
      families: ["Roboto:300,400,500"]
    }
  });
  render(
    renderRoutes({ store }), document.getElementById("render-target"));
});

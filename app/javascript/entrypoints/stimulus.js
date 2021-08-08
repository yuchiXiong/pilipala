// src/application.js
import {Application} from "stimulus";
import {definitionsFromContext} from "stimulus/webpack-helpers";

const application = Application.start();
const controllers = import.meta.globEager("../**/*_controller.js");
application.load(definitionsFromContext(context));

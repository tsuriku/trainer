import { bindActionCreators } from "redux";
import * as viakissKeyboardPattern from "./modules/viakissKeyboardPattern";

import store from "./index"

const { dispatch } = store;

export const ViakissKeyboardPattern = bindActionCreators(viakissKeyboardPattern, dispatch);
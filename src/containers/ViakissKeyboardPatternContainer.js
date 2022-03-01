import { PatternView } from "../components/KeyboardPattern";
import React, { Component } from "react";
import { connect } from "react-redux";
import ViakissKeyboardPatternTemplate from "../templates/ViakissKeyboardPattern"

// import { ViakissKeyboardPatternActions } from "store/actionCreators";

class ViakissKeyboardPatternContainer extends Component {
    render() {
        return <>
            <ViakissKeyboardPatternTemplate
                keyboardPattern={<PatternView />}
            />
        </>
    }
}

export default connect(
    ({ viakissKeyboardPattern }) => {
        return {
            message: viakissKeyboardPattern.message,
        }
    }
)(ViakissKeyboardPatternContainer);
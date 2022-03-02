import { PatternView } from "../components/PatternView";
import React, { Component } from "react";
import { connect } from "react-redux";
import ViakissKeyboardPatternTemplate from "../templates/ViakissKeyboardPattern"

// import { ViakissKeyboardPatternActions } from "store/actionCreators";

class ViakissKeyboardPatternContainer extends Component {
    render() {
        return <>
            <ViakissKeyboardPatternTemplate
                keyboardPattern={<PatternView maxTime={4000} />}
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
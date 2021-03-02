import React, { Component } from "react";
import { connect } from "react-redux";
import ViakissKeyboardPatternTemplate from "templates/ViakissKeyboardPattern"

// import { ViakissKeyboardPatternActions } from "store/actionCreators";

class ViakissKeyboardPatternContainer extends Component {
    render() {
        return <>
            <ViakissKeyboardPatternTemplate
                keyboard={"키보드 모양"}
                timer={"타이머"}
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
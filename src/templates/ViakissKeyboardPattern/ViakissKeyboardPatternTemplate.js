import React from "react";
import styles from "./ViakissKeyboardPatternTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

const ViakissKeyboardPattern = ({
    keyboardPattern,
}) => {
    return (
        <div className={cx("viakiss-keyboard-pattern-template")}>

            <div className={cx("keyboard-pattern")}>
                {keyboardPattern}
            </div>
        </div>
    )
}

export default ViakissKeyboardPattern;
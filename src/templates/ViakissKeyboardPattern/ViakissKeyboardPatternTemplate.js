import React from "react";
import styles from "./ViakissKeyboardPatternTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

const ViakissKeyboardPattern = ({
    keyboard,
    timer,
}) => {
    return (
        <div className={cx("viakiss-keyboard-pattern-template")}>
            <div className={cx("keyboard")}>
                {keyboard}
            </div>
            <div className={cx("timer")}>
                {timer}
            </div>
        </div>
    )
}

export default ViakissKeyboardPattern;
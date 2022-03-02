import React from "react";
import styles from "./ProgressBar.scss"
import classnames from "classnames/bind"

const cx = classnames.bind(styles)

export const ProgressBar = (props) => {
    const { progress = 0, max = 1, text = null } = props;

    const p = progress * 100 / max;
    const pt = text === null ? `${p}%` : text;

    return (
        <div className={cx("progress-bar-wrap")}>
            <div className={cx("progress")}
                style={{
                    width: `${p}%`
                }}>
            </div>
            <div className={cx("text")}>{pt}</div>
        </div>
    )
}

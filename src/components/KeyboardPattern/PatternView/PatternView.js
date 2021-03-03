import React, { Component } from "react";
import { List, Record } from "immutable";
import styles from "./PatternView.scss";
import classnames from "classnames/bind";
import ProgressBar from "components/ProgressBar";

const cx = classnames.bind(styles)

const PatternData = Record({
    text: "",
    state: "ready",
})

class PatternItem extends Component {
    static defaultProps = {
        item: {
            text: "",
            state: "ready",
        }
    }

    render() {
        const { text, state } = this.props.item

        return <div className={cx("pattern", state)}>
            {text}
        </div>
    }
}

class PatternView extends Component {
    static defaultProps = {
        patterns: "QWEASD",
        textLength: 8,
        maxTime: 4000,
    }

    state = {
        items: List([
        ]),
        inputCount: 0,
        result: "",
        run: false,
        remainTime: 0,
    }

    startTime = 0
    timeFlag = false
    timerAnimation = null

    initPatterns = () => {
        const { textLength } = this.props

        const list = []

        for (var i = 0; i < textLength; i++) {
            list[i] = PatternData({})
        }

        this.setState({
            ...this.state,
            items: List(list)
        })
    }

    resetPatterns = () => {
        const { patterns, textLength } = this.props

        const list = []

        for (var i = 0; i < textLength; i++) {
            list[i] = PatternData({
                text: patterns[Math.floor(Math.random() * patterns.length)],
                state: i === 0 ? "current" : "ready"
            })
        }

        this.setState({
            ...this.state,
            items: List(list)
        })
    }

    handleResult = (clear) => {
        if (clear) {
            this.setState({
                ...this.state,
                result: "success",
            })
        }
        else {
            this.setState({
                ...this.state,
                result: "failure",
            })
        }

        this.timeFlag = true
        this.handleStop()
    }

    handlePatternCheck = (key) => {
        const { items, inputCount, run } = this.state
        if (run && inputCount < items.size && !this.timeFlag) {

            if (items.get(inputCount).text === key) {
                var newItems = items.update(inputCount, item => item.set("state", "success"))
                if (inputCount + 1 < items.size) {
                    newItems = newItems.update(inputCount + 1, item => item.set("state", "current"))
                }

                this.setState({
                    ...this.state,
                    items: newItems,
                })

                if (inputCount === (items.size - 1)) {
                    this.handleResult(true)
                } else {
                    this.setState({
                        ...this.state,
                        inputCount: inputCount + 1,
                    })
                }
            } else {
                this.handleResult(false)
            }
        }
    }

    handleStart = () => {
        this.resetPatterns()

        this.startTime = Date.now()
        this.timeFlag = false

        this.timerAnimation = setInterval(() => {
            const { maxTime } = this.props
            const now = Date.now()
            if (this.startTime + maxTime <= now) {
                this.handleStop()
            }
            else {
                this.setState({
                    ...this.state,
                    remainTime: now - this.startTime,
                })
            }
        }, 50);

        this.setState({
            ...this.state,
            inputCount: 0,
            run: true,
            result: "",
        })
    }

    handleStop = () => {
        this.setState({
            ...this.state,
            remainTime: 0,
            run: false,
        })
        this.timeFlag = true

        clearInterval(this.timerAnimation)
    }

    keyDown = (e) => {
        const { patterns } = this.props
        const { run } = this.state
        const input = String.fromCharCode(e.keyCode).toUpperCase()
        if (patterns.includes(input)) {
            this.handlePatternCheck(input)
        }
        else if (input === " ") {
            if (run) {
                this.handleStop()
            }
            else {
                this.handleStart()
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.keyDown)

        this.initPatterns()
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyDown)
    }

    renderPatterns = () => {
        const { items } = this.state
        const list = items.map((item, index) => {
            return <PatternItem
                key={index}
                item={item}
            />
        })

        return list
    }

    renderMessage = () => {
        const { run, result } = this.state
        if (!run && result === "") {
            return (<div className={cx("message")}>
                Space 를 눌러 시작 해주세요
            </div>)
        }

        if (result !== "")
            return (<div className={cx("message", result)}>
                {result === "success" && "성공!"}
                {result === "failure" && "실패..."}
            </div>)

        return null
    }

    render() {
        const { maxTime } = this.props
        const { remainTime } = this.state

        return <div className={cx("pattern-view-wrap")}>
            <div className={cx("key-patterns")}>
                {this.renderPatterns()}
            </div>
            <div className={cx("timer-progress")}>
                <ProgressBar
                    progress={maxTime - remainTime}
                    max={maxTime}
                    text={`${((maxTime - remainTime) / 1000).toFixed(1)}초`} />
            </div>
            {this.renderMessage()}
        </div>
    }
}

export default PatternView;
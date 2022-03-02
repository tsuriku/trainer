import classnames from 'classnames/bind';
import { List, Record } from 'immutable';
import React, { Component } from 'react';

import { ProgressBar } from '../ProgressBar';
import styles from './PatternView.scss';

const cx = classnames.bind(styles)

const PatternData = Record({
    text: "",
    state: "ready",
})

const PatternItem = (props) => {
    const {
        text = "",
        state = "ready",
    } = props;

    return <div className={cx("pattern", state)}>
        {text}
    </div>
}

export class PatternView extends Component {
    static defaultProps = {
        patterns: "QWEASD",
        textLength: 8,
        maxTime: 4000,
        onSuccess: (durationTime) => {
        },
        onFailure: () => {
        },
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
        const { items } = this.state
        const newItems = items.map((item, index) => {
            return PatternData({
                text: item.text,
                state: index === 0 ? "current" : "ready",
            })
        })

        this.setState({
            ...this.state,
            items: newItems,
            inputCount: 0
        })
    }

    makePatterns = () => {
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
        const { maxTime, onSuccess, onFailure } = this.props
        const { remainTime } = this.state

        if (clear) {
            onSuccess(maxTime - remainTime)
            this.setState({
                ...this.state,
                result: "success",
            })
        }
        else {
            onFailure()
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
                this.resetPatterns()
            }
        }
    }

    handleStart = () => {
        this.makePatterns()

        this.startTime = Date.now()
        this.timeFlag = false

        this.timerAnimation = setInterval(() => {
            const { maxTime } = this.props
            const now = Date.now()
            if (this.startTime + maxTime <= now) {
                this.handleResult(false)
            }
            else {
                this.setState({
                    ...this.state,
                    remainTime: now - this.startTime,
                })
            }
        }, 10);

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
        if (patterns.indexOf(input) >= 0) {
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
                text={item.text}
                state={item.state}
            />
        })
        return list
    }

    renderMessage = () => {
        const { run, result } = this.state
        if (!run && result === "") {
            return (<div className={cx("message")}>
                Nyomj 'Spacebar'-t az indításhoz
            </div>)
        }

        if (result !== "")
            return (<div className={cx("message", result)}>
                {result === "success" && "SIKER!"}
                {result === "failure" && "SIKERTELEN..."}
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
                    text={`${((maxTime - remainTime) / 1000).toFixed(1)} mp.`} />
            </div>
            {this.renderMessage()}
        </div>
    }
}

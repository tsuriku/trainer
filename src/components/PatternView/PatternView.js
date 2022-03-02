import classnames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ProgressBar } from '../ProgressBar';
import styles from './PatternView.scss';

const cx = classnames.bind(styles)

const PatternItem = (props) => {
    const {
        text = "",
        state = "ready",
    } = props;

    return <div className={cx("pattern", state)}>
        {text}
    </div>
}

export const PatternView = (props) => {
    const {
        patterns = "QWEASD",
        textLength = 8,
        maxTime = 4000
    } = props;

    const [items, setItems] = useState(() => Array(textLength).fill('').map(() => ({
        text: "",
        state: "ready"
    })));
    const [result, setResult] = useState("");
    const [run, setRun] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const inputCount = useRef(0);
    const startTime = useRef(0);
    const timeFlag = useRef(false);
    const timerAnimation = useRef(null);

    const resetPatterns = useCallback(() => {
        setItems((items) => items.map(({ text }, index) => ({
            text,
            state: index === 0 ? "current" : "ready"
        })));
        inputCount.current = 0;
    }, []);

    const makePatterns = useCallback(() => {
        setItems(Array(textLength).fill('').map((_, i) => ({
            text: patterns[Math.floor(Math.random() * patterns.length)],
            state: i === 0 ? "current" : "ready"
        })));
    }, [textLength, patterns]);

    const stop = useCallback(() => {
        setRemainingTime(0);
        setRun(false);

        timeFlag.current = true
        clearInterval(timerAnimation.current);
    }, []);
    
    useEffect(() => {
        stop();
        makePatterns();
    }, [textLength, stop, makePatterns]);
  
    const handleResult = useCallback((clear) => {
        if (clear) {
            setResult("success");
        } else {
            setResult("failure");
        }

        timeFlag.current = true;
        stop();
    }, [stop]);

    const handlePatternCheck = useCallback((key) => {
        if (!run || timeFlag.current || inputCount.current >= items.size) return;
        
        if (items[inputCount.current].text === key) {
            setItems((items) => items.map(({ text, state }, index) => ({
                text,
                state:
                    index === inputCount.current ? "success" : 
                    index === inputCount.current + 1 ? "current" :
                    state
            })));

            if (inputCount.current === (items.length - 1)) {
                handleResult(true);
            } else {
                inputCount.current++;
            }
        } else {
            resetPatterns();
        }
    }, [run, items, handleResult, resetPatterns]);

    const start = useCallback(() => {
        makePatterns();
        
        startTime.current = Date.now();
        timeFlag.current = false;
        timerAnimation.current = setInterval(() => {
            const now = Date.now();
            if (startTime.current + maxTime <= now) {
                handleResult(false);
            } else {
                setRemainingTime(now - startTime.current);
            }
        }, 10);

        inputCount.current = 0;
        setRun(true);
        setResult('');
    }, [maxTime, handleResult, makePatterns]);

    const handleKeyUp = useCallback((e) => {
        const input = String.fromCharCode(e.keyCode).toUpperCase();
        if (patterns.indexOf(input) >= 0) {
            handlePatternCheck(input);
        } else if (input === " ") {
            if (run) {
                stop();
            } else {
                start();
            }
        }
    }, [start, stop, handlePatternCheck, patterns, run]);

    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyUp]);

    return (
        <div className={cx("pattern-view-wrap")}>
            <div className={cx("key-patterns")}>
                {items.map((item, index) => (
                    <PatternItem
                        key={index}
                        text={item.text}
                        state={item.state}
                    />
                ))}
            </div>
            <div className={cx("timer-progress")}>
                <ProgressBar
                    progress={maxTime - remainingTime}
                    max={maxTime}
                    text={`${((maxTime - remainingTime) / 1000).toFixed(1)} mp.`} />
            </div>
            {!run && result === '' && (
                <div className={cx("message")}>
                    Nyomd meg a <span class="gomb">Space</span> billentyűt az indításhoz
                </div>
            )}
            {result !== '' && (
                <div className={cx("message", result)}>
                    {result === "success" && "SIKER!"}
                    {result === "failure" && "SIKERTELEN..."}
                </div>
            )}
        </div>
    );
}

import styles from './style.module.css';
import { useEffect, useState, useCallback, forwardRef, useContext } from 'react';

import { CircularProgressbarWithChildren, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './custom.css';
import { myContext } from '../App';
const Pomodoro = forwardRef(
	(
		{
			pomodoroValue,
			restValue,
			longRestValue,
			level,
			settingsArray,
			isStart,
			setIsStart,
			time,
			timeClick,
			pomodoro,
			rest,
			longRest,
			timeInterval,
			percentage,
			minutes,
		},
		ref,
	) => {
		const { onStartClick, onPauseClick, calculateTime, changeStartTime, refreshClock } =
			useContext(myContext);

		useEffect(() => {
			calculateTime();
		}, [time]);

		useEffect(() => {
			if (isStart) {
				const timerId = setInterval(refreshClock, 250);
				return function cleanup() {
					clearInterval(timerId);
				};
			}
		}, [timeClick, isStart]);

		useEffect(() => {
			changeStartTime();
		}, [pomodoroValue, restValue, longRestValue]);

		return (
			<div ref={ref} className={styles.root}>
				<div className={styles.container}>
					<h2>Tap to start</h2>
					<ul className={styles.intervals}>
						<li>
							Pomodoro <span>{pomodoro}</span>
						</li>
						<li>
							Rest <span>{rest}</span>
						</li>
						<li>
							Long Rest <span>{longRest}</span>
						</li>
					</ul>

					<div
						className={
							timeInterval == 1 || timeInterval == 2
								? [styles.timer, styles.rest].join(' ')
								: styles.timer
						}>
						<CircularProgressbar
							value={percentage}
							strokeWidth={2}
							styles={{
								path: {
									stroke: timeInterval ? 'rgb(121, 202, 0)' : `rgb(68, 56, 239)`,
								},
								trail: {
									stroke: timeInterval ? `rgb(121, 202, 0, 0.25)` : 'rgba(26, 153, 232, 0.114)',
								},
							}}
						/>
						<div className={timeInterval ? [[styles.time, styles.rest].join(' ')] : styles.time}>
							{isStart ? minutes : pomodoroValue}:
							{isStart
								? new Date(time).getSeconds() < 10
									? `0${new Date(time).getSeconds()}`
									: new Date(time).getSeconds()
								: '00'}
							<div className={styles.levelContainer}>
								<p className={styles.level}>Level</p>
								<div className={styles.levelName}>{settingsArray[level].name}</div>
							</div>
						</div>
					</div>

					<button
						onClick={() => {
							!isStart ? onStartClick() : onPauseClick();
						}}
						className={styles.start}>
						{isStart ? 'Pause' : 'Start'}
					</button>
				</div>
			</div>
		);
	},
);
export default Pomodoro;

import styles from './style.module.css';
import { useEffect, useState, useCallback } from 'react';
import useSound from 'use-sound';
import rington from '../sounds/ringtones/rington.mp3';
import { CircularProgressbarWithChildren, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './custom.css';
const Pomodoro = ({
	pomodoroValue,
	restValue,
	longRestValue,
	level,
	settingsArray,
	isStart,
	setIsStart,
}) => {
	const [pomodoro, setPomodoro] = useState(0);

	const [rest, setRest] = useState(0);

	const [longRest, setLongRest] = useState(0);

	const [timeClick, setTimeClick] = useState(0);

	const [time, setTime] = useState(pomodoroValue * 60 * 1000);

	const [timeInterval, setTimeInterval] = useState(0);

	const [minutes, setMinutes] = useState(Math.floor((time / (1000 * 60)) % 60));

	const [percentage, setPercentage] = useState(0);

	const [stopWorkRest] = useSound(rington);

	const onStartClick = () => {
		setTimeClick(window.performance.now());
		setIsStart(!isStart);
	};

	const onPauseClick = () => {
		setIsStart(!isStart);
		setTime(new Date(pomodoroValue * 60 * 1000));
	};

	useEffect(() => {
		time > 0 ? setMinutes(Math.floor(time / (1000 * 60))) : setMinutes(0);
		if (timeInterval == 0) {
			setPercentage(((pomodoroValue * 60 * 1000 - time) / (pomodoroValue * 60 * 1000)) * 100);
		} else if (timeInterval == 1) {
			setPercentage(((restValue * 60 * 1000 - time) / (pomodoroValue * 60 * 1000)) * 100);
		} else if (timeInterval == 2) {
			setPercentage(((longRestValue * 60 * 1000 - time) / (pomodoroValue * 60 * 1000)) * 100);
		}
	}, [time]);

	const refreshClock = () => {
		setTime(() => {
			if (timeInterval == 0) {
				if (pomodoroValue * 60 * 1000 + timeClick - window.performance.now() > 0) {
					return pomodoroValue * 60 * 1000 + timeClick - window.performance.now();
				} else {
					stopWorkRest();
					if ((pomodoro + 5) % 4 == 0) {
						setTimeInterval(2);
						setPomodoro(pomodoro + 1);
						setTimeClick(window.performance.now());

						return longRestValue * 60 * 1000;
					} else {
						setTimeInterval(1);
						setPomodoro(pomodoro + 1);
						setTimeClick(window.performance.now());
						return restValue * 60 * 1000;
					}
				}
			} else if (timeInterval == 1) {
				if (restValue * 60 * 1000 + timeClick - window.performance.now() > 0) {
					return restValue * 60 * 1000 + timeClick - window.performance.now();
				} else {
					stopWorkRest();
					setTimeInterval(0);
					setTimeClick(window.performance.now());
					setRest(rest + 1);
					return pomodoroValue * 60 * 1000;
				}
			} else if (timeInterval == 2) {
				if (longRestValue * 60 * 1000 + timeClick - window.performance.now() > 0) {
					return longRestValue * 60 * 1000 + timeClick - window.performance.now();
				} else {
					stopWorkRest();
					setTimeInterval(0);
					setTimeClick(window.performance.now());
					setLongRest(longRest + 1);
					return pomodoroValue * 60 * 1000;
				}
			}
		});
	};

	useEffect(() => {
		if (isStart) {
			const timerId = setInterval(refreshClock, 250);
			return function cleanup() {
				clearInterval(timerId);
			};
		}
	}, [timeClick, isStart]);

	useEffect(() => {
		setTime(pomodoroValue * 60 * 1000);
	}, [pomodoroValue, restValue, longRestValue]);

	console.log('percentage: ', percentage);
	return (
		<div className={styles.root}>
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
};
export default Pomodoro;

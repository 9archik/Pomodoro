import styles from './style.module.css';
import { useEffect, useState, useCallback } from 'react';
import useSound from 'use-sound';
import rington from '../sounds/ringtones/rington.mp3';
const Pomodoro = ({ pomodoroValue, restValue, longRestValue, level, settingsArray }) => {
	const [pomodoro, setPomodoro] = useState(0);
	
	const [rest, setRest] = useState(0);
	
	const [longRest, setLongRest] = useState(0);

	const [timeClick, setTimeClick] = useState(0);

	const [time, setTime] = useState(pomodoroValue * 60 * 1000);

	const [isStart, setIsStart] = useState(false);

	const [timeInterval, setTimeInterval] = useState(0);

	const onStartClick = () => {
		setTimeClick(window.performance.now());
		setIsStart(!isStart);
	};

	const onPauseClick = () => {
		setIsStart(!isStart);
		setTime(new Date(pomodoroValue * 60 * 1000));
	};

	const [stopWorkRest] = useSound(rington);
	
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

				<div className={styles.timer}>
					<div className={styles.time}>
						{isStart ? new Date(time).getMinutes() : pomodoroValue}:
						{isStart
							? new Date(time).getSeconds() < 10
								? `0${new Date(time).getSeconds()}`
								: new Date(time).getSeconds()
							: '00'}
					</div>
					<div className={styles.levelContainer}>
						<p className={styles.level}>Level</p>
						<div className={styles.levelName}>{settingsArray[level].name}</div>
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

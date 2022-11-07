import styles from './style.module.css';
const Pomodoro = ({ pomodoroValue, restValue, longRestValue, level }) => {
	const settingsArray = [
		{ name: 'Baby Step', pomodoro: 10, rest: 5, longRest: 10 },
		{ name: 'Popular', pomodoro: 20, rest: 5, longRest: 15 },
		{ name: 'Medium', pomodoro: 40, rest: 8, longRest: 20 },
		{ name: 'Extended', pomodoro: 60, rest: 10, longRest: 25 },
		{ name: 'Custom', pomodoro: pomodoroValue, rest: restValue, longRest: longRestValue },
	];
	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<h2>Tap to start</h2>
				<ul className={styles.intervals}>
					<li>
						Pomodoro <span>0</span>
					</li>
					<li>
						Rest <span>0</span>
					</li>
					<li>
						Long Rest <span>0</span>
					</li>
				</ul>

				<div className={styles.timer}>
					<div className={styles.time}>20:00</div>
					<div className={styles.levelContainer}>
						<p className={styles.level}>Level</p>
						<div className={styles.levelName}>{settingsArray[level].name}</div>
					</div>
				</div>

				<button className={styles.start}>Start</button>
			</div>
		</div>
	);
};
export default Pomodoro;

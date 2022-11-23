import logo from './logo.svg';
import './App.css';
import Header from './header';
import Pomodoro from './Pomodoro';
import React, { createContext, useContext, useRef } from 'react';
import { useState } from 'react';
import TasksBlock from './TasksBlock';
import MusicPlayer from './MusicPlayer';
import useSound from 'use-sound';
import rington from './sounds/ringtones/rington.mp3';

export const myContext = createContext();

function App() {
	const [level, setLevel] = useState(1);

	const [pomodoroValue, setPomodoroValue] = useState(20);
	const [restValue, setRestValue] = useState(5);
	const [longRestValue, setLongRestValue] = useState(15);

	const [stopWorkRest] = useSound(rington);

	const [settingsArray, setSettingsArray] = useState([
		{ name: 'Baby Step', pomodoro: 10, rest: 5, longRest: 10 },
		{ name: 'Popular', pomodoro: 20, rest: 5, longRest: 15 },
		{ name: 'Medium', pomodoro: 40, rest: 8, longRest: 20 },
		{ name: 'Extended', pomodoro: 60, rest: 10, longRest: 25 },
		{ name: 'Custom', pomodoro: pomodoroValue, rest: restValue, longRest: longRestValue },
	]);
	const [isStart, setIsStart] = useState(false);

	let ref = useRef('ref');

	const onStartClick = () => {
		setTimeClick(window.performance.now());
		setIsStart(true);
	};

	const onPauseClick = () => {
		setIsStart(false);
		setTime(new Date(pomodoroValue * 60 * 1000));
	};

	const [pomodoro, setPomodoro] = useState(0);

	const [rest, setRest] = useState(0);

	const [longRest, setLongRest] = useState(0);

	const [timeClick, setTimeClick] = useState(0);

	const [time, setTime] = useState(pomodoroValue * 60 * 1000);

	const [timeInterval, setTimeInterval] = useState(0);

	const [minutes, setMinutes] = useState(Math.floor((time / (1000 * 60)) % 60));

	const [percentage, setPercentage] = useState(0);

	const calculateTime = () => {
		time > 0 ? setMinutes(Math.floor(time / (1000 * 60))) : setMinutes(0);
		if (timeInterval == 0) {
			setPercentage(((pomodoroValue * 60 * 1000 - time) / (pomodoroValue * 60 * 1000)) * 100);
		} else if (timeInterval == 1) {
			setPercentage(((restValue * 60 * 1000 - time) / (pomodoroValue * 60 * 1000)) * 100);
		} else if (timeInterval == 2) {
			setPercentage(((longRestValue * 60 * 1000 - time) / (pomodoroValue * 60 * 1000)) * 100);
		}
	};

	const changeStartTime = () => {
		setTime(pomodoroValue * 60 * 1000);
	};

	const counterNull = () =>
	{
		setPomodoro(0);
		setLongRest(0);
		setRest(0);
		setTimeInterval(0)
	}

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

	return (
		<>
			<myContext.Provider
				value={{ onStartClick, onPauseClick, calculateTime, changeStartTime, refreshClock, counterNull }}>
				<Header
					level={level}
					setLevel={(level) => setLevel(level)}
					pomodoroValue={pomodoroValue}
					setPomodoroValue={(pomodoroValue) => setPomodoroValue(pomodoroValue)}
					restValue={restValue}
					setRestValue={(restValue) => setRestValue(restValue)}
					longRestValue={longRestValue}
					setLongRestValue={(longRestValue) => setLongRestValue(longRestValue)}
					settingsArray={settingsArray}
					isStart={isStart}
					setIsStart={(isStart) => setIsStart(isStart)}
				/>
				<div className="timer-task">
					<Pomodoro
						level={level}
						pomodoroValue={pomodoroValue}
						restValue={restValue}
						longRestValue={longRestValue}
						settingsArray={settingsArray}
						isStart={isStart}
						setIsStart={(isStart) => setIsStart(isStart)}
						time={time}
						timeClick={timeClick}
						pomodoro={pomodoro}
						rest={rest}
						longRest={longRest}
						timeInterval={timeInterval}
						percentage={percentage}
						minutes={minutes}
						ref={ref}
					/>
					<TasksBlock ref={ref} />
				</div>
			</myContext.Provider>

			<MusicPlayer />
		</>
	);
}

export default App;

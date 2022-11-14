import logo from './logo.svg';
import './App.css';
import Header from './header';
import Pomodoro from './Pomodoro';
import React from 'react';
import { useState } from 'react';
import TasksBlock from './TasksBlock';
import MusicPlayer from './MusicPlayer';

function App() {
	const [level, setLevel] = useState(1);

	const [pomodoroValue, setPomodoroValue] = useState(20);
	const [restValue, setRestValue] = useState(5);
	const [longRestValue, setLongRestValue] = useState(15);

	const [settingsArray, setSettingsArray] = useState([
		{ name: 'Baby Step', pomodoro: 10, rest: 5, longRest: 10 },
		{ name: 'Popular', pomodoro: 20, rest: 5, longRest: 15 },
		{ name: 'Medium', pomodoro: 40, rest: 8, longRest: 20 },
		{ name: 'Extended', pomodoro: 60, rest: 10, longRest: 25 },
		{ name: 'Custom', pomodoro: pomodoroValue, rest: restValue, longRest: longRestValue },
	]);
		const [isStart, setIsStart] = useState(false);
	return (
		<>
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
			/>
			<div className="timer-task">
				<Pomodoro
					level={level}
					pomodoroValue={pomodoroValue}
					restValue={restValue}
					longRestValue={longRestValue}
					settingsArray={settingsArray}
					isStart={isStart}
					setIsStart={(isStart) =>setIsStart(isStart)}
				/>
				<TasksBlock />
			</div>

			<MusicPlayer/>
		</>
	);
}

export default App;

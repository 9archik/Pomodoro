import logo from './logo.svg';
import './App.css';
import Header from './header';
import Pomodoro from './Pomodoro';
import React from 'react';
import { useState } from 'react';
import TasksBlock from './TasksBlock';
function App() {
	const [level, setLevel] = useState(1);

	const [pomodoroValue, setPomodoroValue] = useState(50);
	const [restValue, setRestValue] = useState(50);
	const [longRestValue, setLongRestValue] = useState(50);
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
			/>
			<div className="timer-task">
				<Pomodoro
					level={level}
					pomodoroValue={pomodoroValue}
					restValue={restValue}
					longRestValue={longRestValue}
				/>
				<TasksBlock/>
			</div>
		</>
	);
}

export default App;

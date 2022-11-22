import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './style.module.css';
const Header = ({
	level,
	setLevel,
	pomodoroValue,
	setPomodoroValue,
	restValue,
	setRestValue,
	longRestValue,
	setLongRestValue,
	settingsArray,
	isStart,
}) => {
	const [customizeIsOpen, setCustomizeIsOpen] = useState(false);

	const [customRest, setCustomRest] = useState(50);
	const [customLongRest, setCustomLongRest] = useState(50);
	const [customPom, setCustomPom] = useState(50);

	useEffect(() => {
		isStart && setCustomizeIsOpen(false);
	}, [isStart]);

	const onChangeCheckbox = (index) => {
		setLevel(index);
		setPomodoroValue(settingsArray[index].pomodoro);
		setRestValue(settingsArray[index].rest);
		setLongRestValue(settingsArray[index].longRest);
	};

	const onClickCustomCheckbox = (index) => {
		setLevel(index);
		setPomodoroValue(customPom);
		setRestValue(customRest);
		setLongRestValue(customLongRest);
	};

	const setPom = (value) => {
		setCustomPom(value);
		setPomodoroValue(value);
	};

	const setRest = (value) => {
		setCustomRest(value);
		setRestValue(value);
	};

	const setLongRest = (value) => {
		setCustomLongRest(value);
		setLongRestValue(value);
	};

	
	return (
		<header>
			<a className={styles.logo} href="#">
				Pomodoro timer
			</a>

			<div className={styles.buttons}>
				<div className={isStart ? [styles.customize, styles.block].join(' ') : styles.customize}>
					<button onClick={() => !isStart && setCustomizeIsOpen(!customizeIsOpen)}>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="sliders-h"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							className="pointer-events-none svg-inline--fa fa-sliders-h fa-w-16"
							data-v-08ce792a="">
							<path
								fill="currentColor"
								d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"
								data-v-08ce792a=""
								className=""></path>
						</svg>
						<span>Customize</span>
					</button>
					{customizeIsOpen && (
						<ul className={styles.settings}>
							{settingsArray.map((el, index) => {
								if (index < settingsArray.length - 1)
									return (
										<li onClick={() => onChangeCheckbox(index)}>
											<div className={styles.customCheckbox}>
												<input
													checked={level === index ? 'yes' : ''}
													name="level"
													type="radio"
													id={el.name}
												/>
												<span></span>
											</div>

											<label for={el.name}>
												<div className={styles.level}>{el.name}</div>
												<div className={styles.time}>
													<span>{el.pomodoro} min</span> &#183; <span>{el.rest} min</span> &#183;{' '}
													<span>{el.longRest} min</span>
												</div>
											</label>
										</li>
									);
								else <></>;
							})}

							<li className={styles.customBlock}>
								<div
									onClick={() => onClickCustomCheckbox(settingsArray.length - 1)}
									className={styles.customCheckbox}>
									<input checked={level === 4 ? 'yes' : ''} name="level" type="radio" id="custom" />
									<span></span>
								</div>
								<label for="" className={styles.custom}>
									<div className={styles.level}>Custom</div>
									<ul>
										<li>
											<div>
												<span>{customPom} min</span> <span>Pomidoro</span>
											</div>
											<input
												className={level === 4 ? '' : styles.sliderBlock}
												type="range"
												min="1"
												max="100"
												step="1"
												value={customPom}
												onChange={(events) => level === 4 && setPom(events.target.value)}
											/>
										</li>

										<li>
											<div>
												<span>{customRest} min</span> <span>Rest</span>
											</div>
											<input
												className={level === 4 ? '' : styles.sliderBlock}
												type="range"
												min="1"
												max="100"
												step="1"
												defaultValue="50"
												value={customRest}
												onChange={(events) => level === 4 && setRest(events.target.value)}
											/>
										</li>

										<li>
											<div>
												<span>{customLongRest} min</span> <span>Long rest</span>
											</div>
											<input
												className={level === 4 ? '' : styles.sliderBlock}
												type="range"
												min="1"
												max="100"
												step="1"
												defaultValue="50"
												value={customLongRest}
												onChange={(events) => level === 4 && setLongRest(events.target.value)}
											/>
										</li>
									</ul>
								</label>
							</li>
						</ul>
					)}
				</div>

				<button onClick={() => handlerRestart()} className={styles.restart}>
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="undo-alt"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						className="pointer-events-none svg-inline--fa fa-undo-alt fa-w-16"
						data-v-08ce792a="">
						<path
							fill="currentColor"
							d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"
							data-v-08ce792a=""
							className=""></path>
					</svg>
					<span>Restart</span>
				</button>
			</div>
		</header>
	);
};

export default Header;

import React from 'react';
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
}) => {
	const [customizeIsOpen, setCustomizeIsOpen] = useState(false);

	console.log('level', level);
	return (
		<header>
			<a className={styles.logo} href="#">
				Pomodoro timer
			</a>

			<div className={styles.buttons}>
				<div className={styles.customize}>
					<button onClick={() => setCustomizeIsOpen(!customizeIsOpen)}>
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
						Customize
					</button>
					{customizeIsOpen && (
						<ul className={styles.settings}>
							<li onClick={() => setLevel(0)}>
								<div className={styles.customCheckbox}>
									<input checked={level === 0 ? 'yes' : ''} name="level" type="radio" id="baby" />
									<span></span>
								</div>

								<label for="baby">
									<div className={styles.level}>Baby step</div>
									<div className={styles.time}>
										<span>10 min</span> &#183; <span>5 min</span> &#183; <span>10 min</span>
									</div>
								</label>
							</li>

							<li onClick={() => setLevel(1)}>
								<div className={styles.customCheckbox}>
									<input
										checked={level === 1 ? 'yes' : ''}
										name="level"
										type="radio"
										id="popular"
									/>
									<span></span>
								</div>

								<label for="popular">
									<div className={styles.level}>Popular</div>
									<div className={styles.time}>
										<span>20 min</span> &#183; <span>5 min</span> &#183; <span>15 min</span>
									</div>
								</label>
							</li>

							<li onClick={() => setLevel(2)}>
								<div className={styles.customCheckbox}>
									<input checked={level === 2 ? 'yes' : ''} name="level" type="radio" id="medium" />
									<span></span>
								</div>

								<label for="medium">
									<div className={styles.level}>Medium</div>
									<div className={styles.time}>
										<span>40 min</span> &#183; <span>8 min</span> &#183; <span>20 min</span>
									</div>
								</label>
							</li>

							<li onClick={() => setLevel(3)}>
								<div className={styles.customCheckbox}>
									<input
										checked={level === 3 ? 'yes' : ''}
										name="level"
										type="radio"
										id="extended"
									/>
									<span></span>
								</div>
								<label for="extended">
									<div className={styles.level}>Extended</div>
									<div className={styles.time}>
										<span>60 min</span> &#183; <span>10 min</span> &#183; <span>25 min</span>
									</div>
								</label>
							</li>

							<li className={styles.customBlock}>
								<div onClick={() => setLevel(4)} className={styles.customCheckbox}>
									<input checked={level === 4 ? 'yes' : ''} name="level" type="radio" id="custom" />
									<span></span>
								</div>
								<label for="" className={styles.custom}>
									<div className={styles.level}>Custom</div>
									<ul>
										<li>
											<div>
												<span>{pomodoroValue} min</span> <span>Pomidoro</span>
											</div>
											<input
												className={level === 4 ? '' : styles.sliderBlock}
												type="range"
												min="1"
												max="100"
												step="1"
												value={pomodoroValue}
												onChange={(events) => level === 4 && setPomodoroValue(events.target.value)}
											/>
										</li>

										<li>
											<div>
												<span>{restValue} min</span> <span>Rest</span>
											</div>
											<input
												className={level === 4 ? '' : styles.sliderBlock}
												type="range"
												min="1"
												max="100"
												step="1"
												defaultValue="50"
												value={restValue}
												onChange={(events) => level === 4 && setRestValue(events.target.value)}
											/>
										</li>

										<li>
											<div>
												<span>{longRestValue} min</span> <span>Long rest</span>
											</div>
											<input
												className={level === 4 ? '' : styles.sliderBlock}
												type="range"
												min="1"
												max="100"
												step="1"
												defaultValue="50"
												value={longRestValue}
												onChange={(events) => level === 4 && setLongRestValue(events.target.value)}
											/>
										</li>
									</ul>
								</label>
							</li>
						</ul>
					)}
				</div>

				<button className={styles.restart}>
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
					Restart
				</button>
			</div>
		</header>
	);
};

export default Header;

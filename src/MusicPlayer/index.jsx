import { useEffect, useState } from 'react';
import styles from './style.module.css';

import lofiGirl from '../images/lofiGirl.png';
import ambientImage from '../images/ambient.jpg';
import trapImage from '../images/trap.jpg';

import nextTrack from '../images/next.png';
import prevTrack from '../images/previous.png';
import volumeUp from '../images/volume-up.png';
import volumeOff from '../images/volume-off.png';

import lofi1 from '../sounds/music/Lofi_1.mp3';
import lofi2 from '../sounds/music/Lofi_2.mp3';
import lofi3 from '../sounds/music/Lofi_3.mp3';
import lofi4 from '../sounds/music/Lofi_4.mp3';

import ambient1 from '../sounds/music/Ambient_1.mp3';
import ambient2 from '../sounds/music/Ambient_2.mp3';
import ambient3 from '../sounds/music/Ambient_3.mp3';
import ambient4 from '../sounds/music/Ambient_4.mp3';

import trap1 from '../sounds/music/Trap_1.mp3';
import trap2 from '../sounds/music/Trap_2.mp3';
import trap3 from '../sounds/music/Trap_3.mp3';
import trap4 from '../sounds/music/Trap_4.mp3';

const MusicPlayer = () => {
	const [isPlay, setIsPlay] = useState(false);
	const [burgerOpen, setBurgerOpen] = useState(false);
	const [volumeOn, setVolumeOn] = useState(true);

	const [volumeValue, setVolumeValue] = useState(80);

	const mixes = [
		{
			folder: [
				{ url: lofi1, name: 'lofi-1' },
				{ url: lofi2, name: 'lofi-2' },
				{ url: lofi3, name: 'lofi-3' },
				{ url: lofi4, name: 'lofi-4' },
			],

			urlImage: lofiGirl,
			name: 'Lofi',
		},

		{
			folder: [
				{ url: ambient1, name: 'ambient-1' },
				{ url: ambient2, name: 'ambient-2' },
				{ url: ambient3, name: 'ambient-3' },
				{ url: ambient4, name: 'ambient-4' },
			],

			urlImage: ambientImage,
			name: 'Ambient',
		},

		{
			folder: [
				{ url: trap1, name: 'trap-1' },
				{ url: trap2, name: 'trap-2' },
				{ url: trap3, name: 'trap-3' },
				{ url: trap4, name: 'trap-4' },
			],

			urlImage: trapImage,
			name: 'Trap',
		},
	];

	useEffect(() => {
		if (volumeValue == 0) setVolumeOn(false);
	}, [volumeValue]);

	return (
		<div className={styles.root}>
			<div className={burgerOpen ? styles.mixes : [[styles.mixes, styles.close].join(' ')]}>
				<h4>Mixes</h4>
				<ul className={styles.playlists}>
					{mixes.map((elem) => {
						return (
							<li className={styles.btnPlaylist}>
								<div className={styles.image}>
									<img src={elem.urlImage} width="112" height="112" alt="" />
									<span>current</span>

									<div className={styles.circlePlay}></div>
								</div>

								<div className={styles.namePlaylist}>{elem.name}</div>
								<div className={styles.numTracks}>{4} tracks</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className={styles.control}>
				<button onClick={() => setBurgerOpen(!burgerOpen)} className={styles.burger}>
					<span></span>
				</button>
				<button
					onClick={() => setIsPlay(!isPlay)}
					className={
						isPlay
							? [[styles.button, styles.pause].join(' ')]
							: [[styles.button, styles.play].join(' ')]
					}></button>
				<button className={styles.prev}>
					<img src={prevTrack} alt="" />
				</button>
				<button className={styles.next}>
					<img src={nextTrack} alt="" />
				</button>
				<button
					onClick={() => {
						setVolumeOn(!volumeOn);
					}}
					className={styles.volumeSwitch}>
					{volumeOn ? <img src={volumeUp} alt="" /> : <img src={volumeOff} alt="" />}
				</button>
				<input
					value={volumeOn ? volumeValue : 0}
					onChange={(event) => {
						setVolumeValue(event.target.value);
						setVolumeOn(true);
					}}
					type="range"
					min="0"
					max="100"
					step="5"
				/>
				<div className={styles.nameTrack}>lofi 1</div>
			</div>
		</div>
	);
};

export default MusicPlayer;

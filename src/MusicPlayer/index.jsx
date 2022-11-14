import { useState } from "react";
import styles from "./style.module.css"
import lofiGirl from '../images/lofiGirl.png'
const MusicPlayer = () => {
	const [isPlay, setIsPlay] = useState(false);
	const mixes = [
		
			{
				folder: [
					{ url: 'k', name: 'lofi-1' },
					{ url: 'k', name: 'lofi-2' },
					{ url: 'k', name: 'lofi-3' },
					{ url: 'k', name: 'lofi-4' },
				],

				urlImage: lofiGirl,
				name: 'Lofi',
			},
		
		
			{
				folder: [
					{ url: 'k', name: 'ambient-1' },
					{ url: 'k', name: 'ambient-2' },
					{ url: 'k', name: 'ambient-3' },
					{ url: 'k', name: 'ambient-4' },
				],

				urlImage: lofiGirl,
				name: 'Ambient',
			},
		
		
			{
				folder: [
					{ url: 'k', name: 'trap-1' },
					{ url: 'k', name: 'trap-2' },
					{ url: 'k', name: 'trap-3' },
					{ url: 'k', name: 'trap-4' },
				],

				urlImage: lofiGirl,
				name: 'Trap',
			},
		
	];

	return (
		<div className={styles.root}>
			<div className={styles.mixes}>
				<h4>Mixes</h4>
				<ul className={styles.playlists}>
					{mixes.map((elem) => {
                        console.log(elem.name)
						return (
							<li className={styles.btnPlaylist}>
								<div className={styles.image}>
									<img src={elem.urlImage} width="112" height="112" alt="" />
									<span>current</span>

                                    <div className={styles.circlePlay}>
                                    <span></span>
                                    </div>
								</div>

								<div className={styles.namePlaylist}>{elem.name}</div>
								<div className={styles.numTracks}>{4} tracks</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className={styles.control}>
				{/* <button className={styles.burger}></button>
				<button
					className={
						isPlay
							? [[styles.start, styles.pause].join(' ')]
							: [[styles.start, styles.play].join(' ')]
					}></button>
				<button className={styles.prev}></button>
				<button className={styles.next}></button> */}

				<input type="range" min="0" max="100" step="5" />
				<div className={styles.nameTrack}>lofi 1</div>
			</div>
		</div>
	);
};

export default MusicPlayer;

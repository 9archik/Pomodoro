import React, { useState, useEffect } from 'react';

function ScreenHeight() {
	const [windowDimenion, detectHW] = useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});

	const detectSize = () => {
		detectHW({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', detectSize);

		return () => {
			window.removeEventListener('resize', detectSize);
		};
	}, [windowDimenion]);

    return windowDimenion.winHeight;
}

import React from 'react';
import PropTypes from 'prop-types';

const IconeLogo = ({ width, height, black }) => {
	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		black ? (
			<img
				src={require('../assets/img/iconLogo.png')}
				width={width}
			// height={width / 2}
			/>
		) : (
			<img
				src={require('../assets/img/iconLogoWhite.png')}
				width={width}
			// height={width / 2}
			/>
		)


	);
};
IconeLogo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};
IconeLogo.defaultProps = {
	width: 1000,
	height: 1000,
};

export default IconeLogo;

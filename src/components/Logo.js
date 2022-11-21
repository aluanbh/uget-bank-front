import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ width, height, black }) => {
	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		black ? (
			<img
				src={require('../assets/img/logoblack.png')}
				width={width}
			// height={width / 2}
			/>
		) : (
			<img
				src={require('../assets/img/logoWhite.png')}
				width={width}
			// height={width / 2}
			/>
		)
	);
};
Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};
Logo.defaultProps = {
	width: 2155,
	height: 854,
};

export default Logo;

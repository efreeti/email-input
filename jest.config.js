module.exports = {
	verbose: true,
	moduleNameMapper: {
		'\\.(css|less|scss)$': 'identity-obj-proxy'
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	}
};

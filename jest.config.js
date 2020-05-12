module.exports = {
	verbose: true,
	moduleNameMapper: {
		'\\.(css|less|scss)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	}
};

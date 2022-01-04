module.exports = {
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    setupFilesAfterEnv: ['./__test__/setup/setupTest.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    collectCoverageFrom: [
      'src/components/**/*.{js,jsx}',
      '!src/components/index.js'
    ],
    testEnvironment: 'jsdom',
    snapshotSerializers: ['enzyme-to-json/serializer'],
  };
  
module.exports = {
    verbose: true,
    clearMocks: true,
    collectCoverage: false,
    setupFilesAfterEnv: ['./__test__/setup/setupTest.js'],
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    }
}
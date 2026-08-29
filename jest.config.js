module.exports = {
  rootDir: "src",

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",

    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/../__mocks__/fileMock.js",

    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
  },

  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

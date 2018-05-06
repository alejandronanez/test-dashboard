export function generateDummyTest() {
  var delay = 7000 + Math.random() * 7000;
  var testPassed = Math.random() > 0.5;

  return function (callback) {
    setTimeout(function () {
      callback(testPassed);
    }, delay);
  };
};

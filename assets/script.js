var gradients = [
    { start: [36, 27, 207], stop: [2, 31, 77] },
    { start: [31, 27, 158], stop: [46, 81, 158] },
    { start: [3, 20, 59], stop: [13, 27, 59] }
  ];
  // how long for each transition
  var transitionTime = 4;
  
  // internal type vars
  var currentIndex = 0; // where we are in the gradients array
  var nextIndex = 1; // what index of the gradients array is next
  var stepsCount = 0; // steps counter
  var stepsTotal = Math.round(transitionTime * 60); // total amount of steps
  var rgbSteps = {
    start: [0,0,0],
    stop: [0,0,0]
  }; // how much to alter each rgb value
  var rgbValues = {
    start: [0,0,0],
    stop: [0,0,0]
  }; // the current rgb values, gets altered by rgb steps on each interval
  var color1, color2;
  
  // sets next current and next index of gradients array
  function setNext(num) {
    return (num + 1 < gradients.length) ? num + 1 : 0;
  }
  
  // work out how big each rgb step is
  function calcStepSize(a,b) {
    return (a - b) / stepsTotal;
  }
  
  // populate the rgbValues and rgbSteps objects
  function calcSteps() {
    for (var key in rgbValues) {
      if (rgbValues.hasOwnProperty(key)) {
        for(var i = 0; i < 3; i++) {
          rgbValues[key][i] = gradients[currentIndex][key][i];
          rgbSteps[key][i] = calcStepSize(
            gradients[nextIndex][key][i], rgbValues[key][i]
          );
        }
      }
    }
  }
  
  // update current rgb vals, update DOM element with new CSS background
  function updateGradient(){
    // update the current rgb vals
    for (var key in rgbValues) {
      if (rgbValues.hasOwnProperty(key)) {
        for(var i = 0; i < 3; i++) {
          rgbValues[key][i] += rgbSteps[key][i];
        }
      }
    }
  
    // generate CSS rgb values
    var tColor1 = 'rgb('+(rgbValues.start[0] | 0)+','+(rgbValues.start[1] | 0)+','+(rgbValues.start[2] | 0)+')';
    var tColor2 = 'rgb('+(rgbValues.stop[0] | 0)+','+(rgbValues.stop[1] | 0)+','+(rgbValues.stop[2] | 0)+')';
  
    // has anything changed on this interation
    if (tColor1 != color1 || tColor2 != color2) {
  
      // update cols strings
      color1 = tColor1;
      color2 = tColor2;
      
      // update :root vars
      document.documentElement.style.setProperty('--grad-1', color1);
      document.documentElement.style.setProperty('--grad-2', color2);
    }
  
    // we did another step
    stepsCount++;
    // did we do too many steps?
    if (stepsCount > stepsTotal) {
      // reset steps count
      stepsCount = 0;
      // set new indexs
      currentIndex = setNext(currentIndex);
      nextIndex = setNext(nextIndex);
      // calc steps
      calcSteps();
    }
  
    window.requestAnimationFrame(updateGradient);
  }
  
  // initial step calc
  calcSteps();
  
  // go go go!
  window.requestAnimationFrame(updateGradient);

  // Copy to clipboard code 
  function a() {
    navigator.clipboard.writeText('ItzHarryMC#6993')
    window.alert("Copied 'ItzHarryMC#6993' to Clipboard!");
  }
  (window.onload = onLoad), (window.onresize = onResize);
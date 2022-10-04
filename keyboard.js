const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const timestamps = [];

var countOftrueTaps = 0;
var countOfFalseTaps = 0;
var counterDocument = document.createElement('div');

timestamps.unshift(getTimestamp());
var elapsedTime = 0;

function getRandomKey() {
    function getRandomNumber(min, max) {
        min_number = Math.ceil(min);
        max_number = Math.floor(max);
        return Math.floor(Math.random() * (max_number - min_number + 1)) + min_number;
    }

  return keys[getRandomNumber(0, keys.length-1)]
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
  let start = Date.now()
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000)
}

document.addEventListener("keyup", event => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");
  
  keyElement.classList.add("hit")
  keyElement.addEventListener('animationend', () => {
    keyElement.classList.remove("hit")
  })
  
  if (keyPressed === highlightedKey.innerHTML) {
    timestamps.unshift(getTimestamp());
    elapsedTime = timestamps[0] - timestamps[1];
    console.log(`Speed: ${60/elapsedTime} ch / min`)
    highlightedKey.classList.remove("selected");
    targetRandomKey();
    ++countOftrueTaps;
  } else {
    ++countOfFalseTaps;
  }

  if(document.querySelector('input[id=inf]').checked) {
    counterDocument.innerHTML = "Count of true taps: " + countOftrueTaps + '<br><br>';
    counterDocument.innerHTML += "Count of false taps: " + countOfFalseTaps + '<br><br>';
    counterDocument.innerHTML += "Speed: " + (60 / elapsedTime) + ' ch / min <br><br>';
    counterDocument.className = "info";
    document.body.append(counterDocument);
  } else {
    counterDocument.innerHTML = '';
  }

  if(document.querySelector('input[id=color-gen]').checked) {
    for(let i = 0; i < document.getElementsByClassName('pinky').length; ++i) {
      r = Math.floor(Math.random() * (256));
      g = Math.floor(Math.random() * (256));
      b = Math.floor(Math.random() * (256));

      document.getElementsByClassName('pinky')[i].style = `background-color: rgb(${r}, ${g}, ${b});`;
    }

    for(let i = 0; i < document.getElementsByClassName('ring').length; ++i) {
      r = Math.floor(Math.random() * (256));
      g = Math.floor(Math.random() * (256));
      b = Math.floor(Math.random() * (256));

      document.getElementsByClassName('ring')[i].style = `background-color: rgb(${r}, ${g}, ${b});`;
    }

    for(let i = 0; i < document.getElementsByClassName('middle').length; ++i) {
      r = Math.floor(Math.random() * (256));
      g = Math.floor(Math.random() * (256));
      b = Math.floor(Math.random() * (256));
      
      document.getElementsByClassName('middle')[i].style = `background-color: rgb(${r}, ${g}, ${b});`;
    }
  }
})

targetRandomKey();
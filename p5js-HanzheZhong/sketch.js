let serial;
let portName = '/dev/tty.usbmodem12201'; //port number！
let circles = [];
let camera;
let synth;

function setup() {
  createCanvas(600, 600);
  
  serial = new p5.SerialPort();
  serial.open(portName); 
  
  camera = createCapture(VIDEO);
  camera.size(600, 600);
  camera.hide(); 

  colorMode(HSB, 360, 100, 100, 100);
  noFill();

  synth = new p5.MonoSynth();
}

function draw() {
  image(camera, 0, 0, width, height);

for (let i = 0; i < circles.length; i++) {
  let c = circles[i];
  drawCircle(c);
  }
}

function getFrequencyForKey(k) {
  let keyLower = k.toLowerCase();
  let freq = 0;
//This section is about the "asdfghj" action of the keyboard, which corresponds to the middle C on the piano and is called C4. Therefore, the line below this one is C3, and the line above it is C5.
  if (keyLower === 'z') freq = 130.81;      // C3
  else if (keyLower === 'x') freq = 146.83; // D3
  else if (keyLower === 'c') freq = 164.81; // E3
  else if (keyLower === 'v') freq = 174.61; // F3
  else if (keyLower === 'b') freq = 196.00; // G3
  else if (keyLower === 'n') freq = 220.00; // A3
  else if (keyLower === 'm') freq = 246.94; // B3

  else if (keyLower === 'a') freq = 261.63; // C4
  else if (keyLower === 's') freq = 293.66; // D4
  else if (keyLower === 'd') freq = 329.63; // E4
  else if (keyLower === 'f') freq = 349.23; // F4
  else if (keyLower === 'g') freq = 392.00; // G4
  else if (keyLower === 'h') freq = 440.00; // A4
  else if (keyLower === 'j') freq = 493.88; // B4

  else if (keyLower === 'q') freq = 523.25; // C5
  else if (keyLower === 'w') freq = 587.33; // D5
  else if (keyLower === 'e') freq = 659.25; // E5
  else if (keyLower === 'r') freq = 698.46; // F5
  else if (keyLower === 't') freq = 783.99; // G5
  else if (keyLower === 'y') freq = 880.00; // A5
  else if (keyLower === 'u') freq = 987.77; // B5

  else if (keyLower === 'k') freq = 523.25; // C5
  else if (keyLower === 'l') freq = 587.33; // D5

  else if (keyLower === 'i') freq = 1046.50; // C6
  else if (keyLower === 'o') freq = 1174.66; // D6
  else if (keyLower === 'p') freq = 1318.51; // E6

  return freq;
}

function keyPressed() {
  let k = key;

  let freq = getFrequencyForKey(k);
  if (freq > 0) {
    createVisualCircle();
    playNoteForFreq(freq, k);
    sendToArduino(k);

  }
}

function createVisualCircle() {
    let cx = random(50, width - 50);
    let cy = random(50, height - 50);
    let r = random(20, 120);
    let H = random(0, 360);
    let S = random(70, 100);
    let B = random(80, 100);

    let circle = { x: cx, y: cy, r: r, h: H, s: S, b: B };
    circles.push(circle);
}

function sendToArduino(k) {

    if (serial) {
        serial.write(k);
        console.log("Arduino: " + k);
    }
}

function playNoteForFreq(freq, k) {
  let keyLower = k.toLowerCase();
  let velocity = 0.5;//Prevent too noisy.
  let dur = 0.25;

  if ('zxcvbnm'.includes(keyLower)) {
    dur = 0.35;
  } else if ('asdfghjkl'.includes(keyLower)) {
    dur = 0.25; 
  } else {
    dur = 0.18; 
  }//This part is how to imitate the physical characteristics of real musical instruments.
  synth.play(freq, velocity, 0, dur);
}

function drawCircle(c) {
  stroke(c.h, c.s, c.b, 60);
  strokeWeight(6);
  ellipse(c.x, c.y, c.r * 2 * 0.95, c.r * 2 * 0.95);
  stroke(c.h, c.s, 100, 100);
  strokeWeight(3);
  ellipse(c.x, c.y, c.r * 2 * 0.9, c.r * 2 * 0.9);
}
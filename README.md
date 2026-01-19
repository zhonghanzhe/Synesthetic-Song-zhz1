# Synesthetic Song: An Interactive Light and Sound Instrument

## Short Description
A small-scale interactive installation that functions as a digital instrument, bridging the virtual and physical worlds by translating keyboard inputs into synchronized sound, generative visuals, and rhythmic ambient lighting.

## Concept / Intent
"Synesthetic Song" explores how humans and computers can create together. It turns a standard keyboard into a musical tool. When the audience types on the 26 alphabet keys, they are not just typing text; they are playing music.

The system gives immediate feedback: shapes appear on the screen, and lights flash in the room. This project mixes a digital screen with real-world lights, creating an immersive space where the audience can feel the rhythm of technology.

**Background:**
This is a personal project. I have been playing the piano for 24 years.Inspired by the interactive installation "Verbier" by Collectif Scale, I wanted to use modern digital tools like p5.js and Arduino to build a simpler, accessible version of that experience, allowing the audience to feel the connection between sound and light in a personal setting.

## Technology Used
* **Software:** p5.js (for screen visuals and sound), Arduino IDE (to control physical lights).
* **Hardware:** Computer, Arduino board, LED light strips.
* **Communication:** Serial communication (via USB).

## Technical Implementation
The system works in a loop: the user presses a key (Input), and the computer responds with Sound, Screen Visuals, and Physical Lights (Output).

* **Mapping Logic (Light):** virtually "sliced" the single long LED strip into 10 distinct sections using a mathematical modulo operator (`%`), ensuring 26 keys mapped perfectly to limited light segments.
* **Frequency Mapping (Sound):** Programmed a precise frequency mapping system.Assigned specific Hertz frequencies to specific keyboard rows—creating low, mid, and high octaves that mimic a real piano layout.
* **Synthesis:** Used a custom synthesis engine that instantly translates key codes into musical notes while simultaneously triggering the correct light segment.

## How to Run / Setup
1. **Environment:** The work is intended to be shown in a dark room so the LED lights stand out.
2. **Connections:** Connect the computer, Arduino board, and LED light strips.
3. **Power:** Use "power injection" to keep the lights bright.
4. **Operation:** Ensure serial communication is established via USB to bridge p5.js and Arduino.

**Demo Video:**
[Watch on Vimeo](https://vimeo.com/1142187664?share=copy&fl=sv&fe=ci)

## Reflection and Future Development
Making this project taught me how to connect different technologies, specifically making p5.js and Arduino talk to each other smoothly.

Moving forward, I aim to deepen my technical skills by exploring the collaboration between coding, Arduino, and software like TouchDesigner. Additionally, I plan to integrate my background in graphic design with my experience in piano performance.

## Credits / References
**Created by:** Hanzhe Zhong

**References:**
* **Adafruit Industries:** Adafruit_NeoPixel Library. Available at: https://github.com/adafruit/Adafruit_NeoPixel 
* **Arduino:** Remainder (%) Operator Reference. Available at: https://docs.arduino.cc/language-reference/en/structure/arithmetic-operators/remainder/ 
* **Collectif Scale:** Verbier. https://www.collectifscale.com/ 
* **p5-serial:** Basic Serial Example. Available at: https://github.com/p5-serial/p5.serialport/blob/main/examples/01-basics/sketch.js 
* **Schnupp, J., Nelken, I. and King, A.:** Auditory Neuroscience: Making Sense of Sound. MIT Press. 
* **Worldsemi:** WS2812B Intelligent Control LED Integrated Light Source Datasheet. 
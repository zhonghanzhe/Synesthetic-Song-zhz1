#include <Adafruit_NeoPixel.h>

#define PIN        6       
#define NUM_LEDS   300      
#define SEGMENTS   10      
#define LEDS_PER_SEG (NUM_LEDS / SEGMENTS)

Adafruit_NeoPixel strip(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

// This array is used to record the current color target of each section of the light strip.
// The "gradually fading" memory function
uint32_t segmentColors[SEGMENTS]; 
// Record whether each section needs to be updated
bool segmentActive[SEGMENTS];

void setup() {
  Serial.begin(9600);
  strip.begin();
  strip.setBrightness(100); 
  strip.show();
  randomSeed(analogRead(0));
  
  
  for(int i=0; i<SEGMENTS; i++) {
   segmentActive[i] = false;
  }
}

void loop() {
  
  if (Serial.available() > 0) {
    char key = Serial.read();
  if (key >= 'a' && key <= 'z') {
    int segIndex = (key - 'a') % SEGMENTS;
    triggerSegment(segIndex); 
  }
}

  // Handle fade-out animation
  fadeAllSegments();
  
  
  strip.show();
  
  
  delay(10); 
}


void triggerSegment(int segIndex) {
  
  uint32_t newColor = strip.Color(random(50, 255), random(50, 255), random(50, 255));
  
  // Calculate the start and end points of this section.
  int start = segIndex * LEDS_PER_SEG;
  int end = start + LEDS_PER_SEG;

  
  for(int i=start; i<end; i++) {
  strip.setPixelColor(i, newColor);
  }
}

// Let all the lights gradually dim.
void fadeAllSegments() {
  
  for(int i=0; i<NUM_LEDS; i++) {
    // Obtain the current color of this lamp
    uint32_t c = strip.getPixelColor(i);
    
    
    uint8_t r = (uint8_t)(c >> 16);
    uint8_t g = (uint8_t)(c >>  8);
    uint8_t b = (uint8_t)c;

    
    
    if(r > 10) r -= 10; else r = 0;
    if(g > 10) g -= 10; else g = 0;
    if(b > 10) b -= 10; else b = 0;

    //Set to the original color
    strip.setPixelColor(i, strip.Color(r, g, b));
  }
}
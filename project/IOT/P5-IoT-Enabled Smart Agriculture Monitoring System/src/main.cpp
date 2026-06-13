#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

#define DHTPIN 14
#define SOIL 34
#define LDR 35
#define RELAY 25
DHT dht(DHTPIN, DHT22);

const char* ssid = "Wokwi-GUEST";
const char* pass = "";
String apiKey = "MVLWKLFXPXBBPBVS";

void setup() {
  Serial.begin(115200);
  pinMode(RELAY, OUTPUT);
  digitalWrite(RELAY, LOW);
  dht.begin();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  int soil = analogRead(SOIL);
  int light = analogRead(LDR);

  digitalWrite(RELAY, soil < 1500 ? HIGH : LOW);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://api.thingspeak.com/update?api_key=" + apiKey +
                  "&field1=" + t + "&field2=" + h +
                  "&field3=" + soil + "&field4=" + light;
    http.begin(url);
    http.GET();
    http.end();
  }

  Serial.printf("T:%.1f H:%.1f Soil:%d Light:%d\n", t, h, soil, light);
  delay(15000);
}
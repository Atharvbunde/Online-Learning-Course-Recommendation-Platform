# 🌱 IoT-Enabled Smart Agriculture Monitoring System

An ESP32-based smart agriculture monitoring system built and simulated using **Wokwi**, which monitors soil moisture, temperature, humidity, and light intensity in real time, automates irrigation control via a relay, and sends live data to a **ThingSpeak** dashboard.

---

## 📋 Project Overview

This project demonstrates a complete IoT pipeline:

```
Sensors (DHT22, Soil Moisture, LDR) 
   → ESP32 (reads & processes data) 
   → Relay (controls pump based on soil moisture) 
   → WiFi 
   → ThingSpeak Dashboard (live monitoring)
```

It helps farmers and greenhouse owners monitor field conditions remotely and automate irrigation, reducing water wastage and manual effort.

---

## ⚙️ Components Used (Wokwi Simulation)

| Component | Purpose |
|---|---|
| ESP32 DevKit | Main microcontroller, reads sensors & connects to WiFi |
| DHT22 | Measures temperature & humidity |
| Soil Moisture Sensor (Potentiometer in sim) | Measures soil moisture level |
| LDR (Photoresistor) | Measures light intensity |
| Relay Module | Controls water pump (ON/OFF) |

---

## 🔌 Pin Connections

| Component | Pin | ESP32 Pin |
|---|---|---|
| DHT22 | SDA (Data) | GPIO 14 |
| Soil Moisture Sensor | SIG (Analog Out) | GPIO 34 |
| LDR | AO (Analog Out) | GPIO 35 |
| LDR | DO (Digital Out) | GPIO 32 |
| Relay Module | IN | GPIO 25 |

---

## 🚀 How It Works (Step-by-Step Guide)

1. **Power Up**: ESP32 boots and connects to WiFi (`Wokwi-GUEST` for simulation).
2. **Sensor Reading**: Every 15 seconds, the ESP32 reads:
   - Temperature & humidity from the DHT22
   - Soil moisture level from the analog soil sensor
   - Light intensity from the LDR
3. **Irrigation Logic**: If soil moisture value is below the threshold (1500), the relay is turned **ON**, simulating the water pump activation. Otherwise, it stays **OFF**.
4. **Cloud Update**: All sensor values are sent to ThingSpeak via an HTTP GET request using the channel's Write API Key.
5. **Dashboard Monitoring**: Live values and trends are visible on the ThingSpeak dashboard through gauges, numeric displays, and charts.
6. **Serial Monitor Output**: Sensor readings and pump status are also printed to the serial monitor for debugging.

---

## 📡 ThingSpeak Setup Guide

1. Go to [thingspeak.com](https://thingspeak.com) and create a free account.
2. Navigate to **Channels → My Channels → New Channel**.
3. Enter the channel details:
   - **Name**: IoT Smart Agriculture Monitoring System
   - **Description**: This channel collects real-time environmental data from an ESP32-based IoT system for smart farming. It monitors soil moisture, temperature, humidity, and light intensity to automate irrigation and generate alerts for optimal crop health and water efficiency.
   - **Field 1**: Temperature (°C)
   - **Field 2**: Humidity (%)
   - **Field 3**: Soil Moisture
   - **Field 4**: Light Intensity
4. Click **Save Channel**.
5. Go to the **API Keys** tab and copy your **Write API Key**.
6. Paste the key into `main.cpp`:
   ```cpp
   String apiKey = "YOUR_WRITE_API_KEY";
   ```
7. Go to **Private View** to see auto-generated graphs.
8. (Optional) Click **Add Widgets** to add Gauges, Numeric Displays, or Lamp Indicators for a better dashboard layout.
9. Go to **Sharing** tab to enable a **Public View** link for sharing your dashboard.

---

## 🏭 Industry Relevance

Smart agriculture combines IoT sensing, automation, and analytics to reduce water and fertilizer usage by up to 30%. Similar systems are deployed by agritech companies and farms using platforms like AWS IoT Core, Azure FarmBeats, and John Deere Operations Center.

**Real-World Applications:**
- Polyhouse and nursery automation
- Smart drip irrigation systems
- Remote soil analytics for precision farming
- Agricultural training labs and university demos

**Benefits:**
- 📈 Smart agriculture IoT market projected to reach USD 28B by 2032 (>9% CAGR)
- 💰 Automated irrigation reduces water usage by 20–30% and manual labor by 40%
- ⚙️ Moisture-based control extends pump/motor life by over 25%

---

## 🖼️ Images / Screenshots

> Place all screenshots inside the `images/` folder of this repository using the filenames below.

### Wokwi Simulation
![Simulation](images/Simulation.png)

### Serial Monitor / Terminal Output
![Terminal Output](images/Terminal.png)

### ThingSpeak Dashboard
![ThingSpeak Dashboard](images/Dashboard.png)

### Soil Moisture Gauge & Light Intensity (Numeric)
![Soil Moisture Gauge and Light Intensity](images/Soil_Moisture_Guage_and_Numric_light_intensity.png)

### Soil Moisture & Light Intensity Chart
![Soil Moisture and Light Intensity Chart](images/Soil_Moisturizer_and_Light_Intensity.png)

### Temperature & Humidity Gauge
![Temperature and Humidity Gauge](images/Temp_Humidity_Gauge.png)

### Temperature & Humidity Chart
![Temperature and Humidity Chart](images/Temparature_and_humidity_chart.png)

---

## 📂 Project Structure

```
IoT-Smart-Agriculture-Monitoring-System/
├── main.cpp
├── platformio.ini
├── wokwi.toml
├── diagram.json
├── images/
└── README.md
```

---

## 🛠️ How to Run

1. Open the project in **Wokwi** (or VS Code with PlatformIO + Wokwi extension).
2. Make sure `diagram.json`, `main.cpp`, `platformio.ini`, and `wokwi.toml` are in place.
3. Add your ThingSpeak **Write API Key** in `main.cpp`.
4. Click the green **Play ▶** button to start the simulation.
5. View sensor readings on the **Serial Monitor**.
6. Open your ThingSpeak channel's **Private View** to see live data updates.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.



---

## 👤 Author

**Atharv Vishnuda Bunde**
Mechatronics Student

Linkdin : https://www.linkedin.com/in/atharv-bunde-602361400/


Feel free to connect, fork this repository, or raise issues for suggestions and improvements! 🌾

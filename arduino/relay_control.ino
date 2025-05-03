const int relayPins[] = {8, 9}; // D8 (Relé 1), D9 (Relé 2)

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 2; i++) {
    pinMode(relayPins[i], OUTPUT);
    digitalWrite(relayPins[i], HIGH); // Inicia desligado
  }
}

void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    
    if (cmd == "R1_ON") digitalWrite(8, LOW);
    else if (cmd == "R1_OFF") digitalWrite(8, HIGH);
    else if (cmd == "R2_ON") digitalWrite(9, LOW);
    else if (cmd == "R2_OFF") digitalWrite(9, HIGH);
    
    Serial.print("Exec:"); // Confirmação
    Serial.println(cmd);
  }
}

const int relayPins[] = {8, 9}; // D8 (Relé 1), D9 (Relé 2)

void setup() {
  Serial.begin(9600); // Inicializa comunicação serial
  for (int i = 0; i < 2; i++) {
    pinMode(relayPins[i], OUTPUT);
    digitalWrite(relayPins[i], HIGH); // Relés iniciam desligados (nível lógico alto)
  }
}

void loop() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    cmd.trim(); // Remove espaços e quebras de linha

    if (cmd == "R1_ON") {
      digitalWrite(relayPins[0], LOW);
    } else if (cmd == "R1_OFF") {
      digitalWrite(relayPins[0], HIGH);
    } else if (cmd == "R2_ON") {
      digitalWrite(relayPins[1], LOW);
    } else if (cmd == "R2_OFF") {
      digitalWrite(relayPins[1], HIGH);
    }

    // Envia uma resposta para confirmar o comando recebido
    Serial.print("Executed: ");
    Serial.println(cmd);
  }
}

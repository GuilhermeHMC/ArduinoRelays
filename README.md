# Arduino Relays Tester - Multilanguage and Accessible - Open Source Project

**Projeto Open Source** para controle e teste de relés via Arduino e Node.js, com foco em **acessibilidade**, **modo claro/escuro** e **internacionalização** (Português, Inglês e Francês).

---

## 📷 Diagrama de Montagem

![Diagrama de Hardware](assets/images/ArduinoRelaysDiagram.png)

> Montagem simples utilizando Arduino para testes manuais e programados de relés.

---

## 🌐 Funcionalidades

- Controle manual e programado de relés.
- Interface Web moderna (modo claro e escuro).
- Suporte a três idiomas: Português, Inglês e Francês.
- Design acessível para todos, com foco em inclusão (problemas visuais, mobilidade reduzida e autismo).
- Backend Node.js para comunicação com Arduino.

---

## 🛠 Estrutura do Projeto

/ (raiz)
/assets
/images
ArduinoRelaysDiagram.png
ArduinoRelays1.jpeg
ArduinoRelays2.jpeg
/frontend
index.html
style.css
app.js
/backend
server.js
/arduino
relay_control.ino
/i18n
en.json
pt.json
fr.json
README.md


---

## 🚀 Como Rodar

1. Suba o firmware no Arduino com o arquivo `relay_control.ino`.
2. Instale as dependências do Node.js no backend.
3. Inicie o servidor Node.js (`node server.js`).
4. Acesse `http://localhost:3000` no navegador.
5. Controle os relés pela interface web!

---

## 💖 Apoie este Projeto

Se você gostou deste projeto e quer apoiar novos desenvolvimentos focados em automação e acessibilidade:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/SeuUsuario)

Ou envie uma contribuição via Pix:

![Pix](assets/images/Pix.png)

---

## 📜 Licença

Este projeto é de código aberto sob a licença MIT.

---

## 📬 Contato

- **Autor**: Guilherme H. M. Cardoso
- **Email**: guihmca@gmail.com

---

> **Nota**: Este projeto é apenas para fins educacionais e de fomento à inclusão de pessoas com deficiência no mundo da tecnologia e automação.

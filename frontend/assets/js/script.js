const API_KEY = 'arduino123'; // Igual ao .env
const WS_URL = `ws://localhost:3000`;

let socket;
let reconnectInterval = 2000; // tempo de reconexão em milissegundos

document.addEventListener('DOMContentLoaded', () => {

  function connectWebSocket() {
    socket = new WebSocket(WS_URL);

    socket.addEventListener('open', () => {
      console.log('🔌 WebSocket conectado');
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'relay') {
        const led = document.getElementById(`led${data.id}`);
        const toggle = document.querySelector(`input[data-relay="${data.id}"]`);
        const isActive = (data.state === 'on');

        led.classList.toggle('on', isActive);
        led.classList.toggle('off', !isActive);
        toggle.checked = isActive;
      }
    });

    socket.addEventListener('close', () => {
      console.warn('⚠️ WebSocket desconectado. Tentando reconectar...');
      setTimeout(connectWebSocket, reconnectInterval); // reconecta após um tempo
    });

    socket.addEventListener('error', (error) => {
      console.error('❌ WebSocket erro:', error);
      socket.close(); // força fechar para cair no onclose e reconectar
    });
  }

  // Inicializa WebSocket
  connectWebSocket();

  // Controle dos relés
  document.querySelectorAll('.switch input').forEach(toggle => {
    toggle.addEventListener('change', async function() {
      const relayId = this.dataset.relay;
      const isActive = this.checked;

      try {
        const response = await fetch(
          `/api/relay/${relayId}/${isActive ? 'on' : 'off'}?apiKey=${API_KEY}`
        );

        if (!response.ok) throw new Error(await response.text());

        // Sucesso - (o estado atualizado vem pelo WebSocket)

      } catch (error) {
        console.error('Erro:', error);
        this.checked = !isActive;
        alert(`Erro: ${error.message}`);
      }
    });
  });

  // Botão de tema
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    html.setAttribute('data-theme',
      html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
  });
});

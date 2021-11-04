window.addEventListener('DOMContentLoaded', () => {
  console.log('hello from index.js. DOMContentLoaded')
  window.messages = ['init message']
  buttonAuth();
  buttonConnectIO();
  buttonTestIO();
  buttonSendMessage();
})

function buttonSendMessage() {
  document.querySelector('#send').addEventListener('click', async () => {
    const messageText = document.querySelector("#message").value;
    console.log('Sending message', messageText)
    window.socket.emit("chat", messageText)
  })
}

function buttonAuth() {
  document.querySelector('#auth').addEventListener('click', async () => {
    const login = document.querySelector('#login').value;
    const password = document.querySelector('#password').value;
    console.log('Auth clicked', login, password);
    const credentials =
      {
        email: login,
        password: password
      }
    const response = await fetch('http://130.61.44.151:8086/api/v1/auth/login', {
      method: 'POST',
      type: 'no-cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const responseBody = await response.json()
    console.log('Login response = ', responseBody.token)
    document.querySelector('#token').value = responseBody.token;
  })
}

function buttonConnectIO() {
  document.querySelector('#connect').addEventListener('click', () => {
    console.log('connect clicked');
    const jwt = document.querySelector('#token').value
    window.socket = io("http://localhost:3000", {
      extraHeaders: {
        'x-auth-token': jwt
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-auth-token': jwt
          }
        }
      },
    })
    window.socket.on("chat", (arg) => {
      console.log('New chat message:', arg)
      const item = document.createElement('li');
      item.textContent = arg;
      document.querySelector("#msgs").appendChild(item);
    })
    console.log('socket connection = ', socket);
  })
}

function buttonTestIO() {
  document.querySelector('#test').addEventListener('click', () => {
    console.log('test clicked');
    window.socket.emit("hello", "My message")

    window.socket.on("newmsg", (arg1, arg2, arg3) => {
      console.log(arg1); // 1
      console.log(arg2); // "2"
      console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }
    });
})}



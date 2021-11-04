window.addEventListener('DOMContentLoaded', () => {
  console.log('hello from index.js. DOMContentLoaded')
  window.messages = ['init message']
  buttonAuth();
  buttonConnectIO();
  buttonTestIO();
})

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
    window.socket = io("http://localhost:3000", {
      extraHeaders: {
        'x-auth-token': 'THE_JWT_TOKEN'
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-auth-token': 'THE_JWT_TOKEN'
          }
        }
      },
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

  })
}



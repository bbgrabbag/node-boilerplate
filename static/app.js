/* eslint-disable no-undef */
const client = io('http://localhost:8000')
const events = document.getElementById('events')
const emissions = document.getElementById('emissions')

const renderEvent = (event) => {
  const el = document.createElement('p')
  el.innerText = `${event.name}: ID${event.clientId} ${event.message}`
  return el
}

client.on('connection', (event) => {
  events.appendChild(renderEvent(event))
})

client.on('CLIENT_DISCONNECTED', (event) => {
  events.appendChild(renderEvent(event))
})

client.on('POLO', (event) => {
  events.appendChild(renderEvent(event))
})

client.on('NEW_GUEST', (event) => {
  events.appendChild(renderEvent(event))
})

emissions.echo.addEventListener('click', () => client.emit('MARCO'))

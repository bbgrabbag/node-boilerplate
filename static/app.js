/* eslint-disable no-undef */
const client = io('http://localhost:8000')
const events = document.getElementById('events')
const emissions = document.getElementById('emissions')

const renderEvent = (event) => {
  const el = document.createElement('p')
  el.innerText = `${event.name}: ID:${event.socketId} ${event.message}`
  return el
}

client.on('connect', () => {
  events.appendChild(renderEvent({ socketId: 'SERVER', name: 'connect', message: `Client ID:${client.id} has connected.` }))
})

client.on('CLIENT_DISCONNECTED', (event) => {
  events.appendChild(renderEvent(event))
})

client.on('ECHO', (event) => {
  events.appendChild(renderEvent(event))
})

client.on('NEW_GUEST', (event) => {
  events.appendChild(renderEvent(event))
})

emissions.echo.addEventListener('click', () => client.emit('ECHO', 'Marco!'))


import express from 'express'
import http from 'http'
import path from 'path'

export const app = express()
export const server = http.createServer(app)

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'static')))

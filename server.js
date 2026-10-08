import { createServer } from 'node:http'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = path.dirname(fileURLToPath(import.meta.url))
const dataDirectory = path.join(projectDirectory, 'data')
const dataFile = path.join(dataDirectory, 'employees.json')
const maxRequestSize = 5 * 1024 * 1024

const sendJson = (response, status, body) => {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  response.end(JSON.stringify(body))
}

const readRequestBody = async (request) => {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > maxRequestSize) {
      throw new Error('Request body is too large.')
    }
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

const isValidEmployees = (employees) =>
  Array.isArray(employees) &&
  employees.every((employee) =>
    employee &&
    typeof employee === 'object' &&
    (typeof employee.id === 'string' || typeof employee.id === 'number') &&
    Array.isArray(employee.tasks) &&
    employee.tasks.every((task) => task && typeof task === 'object' && !Array.isArray(task))
  )

const server = createServer(async (request, response) => {
  if (request.url !== '/api/employees') {
    sendJson(response, 404, { error: 'Not found.' })
    return
  }

  if (request.method === 'GET') {
    try {
      const content = await readFile(dataFile, 'utf8')
      sendJson(response, 200, { employees: JSON.parse(content) })
    } catch (error) {
      if (error.code === 'ENOENT') {
        sendJson(response, 200, { employees: null })
        return
      }
      console.error('Unable to read employee data file:', error)
      sendJson(response, 500, { error: 'Unable to read the employee data file.' })
    }
    return
  }

  if (request.method === 'PUT') {
    try {
      const body = await readRequestBody(request)
      if (!isValidEmployees(body.employees)) {
        sendJson(response, 400, { error: 'Employee data must be an array of employees with task arrays.' })
        return
      }

      await mkdir(dataDirectory, { recursive: true })
      const temporaryFile = `${dataFile}.${randomUUID()}.tmp`
      await writeFile(temporaryFile, `${JSON.stringify(body.employees, null, 2)}\n`, 'utf8')
      await rename(temporaryFile, dataFile)
      sendJson(response, 200, { saved: true })
    } catch (error) {
      console.error('Unable to save employee data file:', error)
      const status = error instanceof SyntaxError || error.message === 'Request body is too large.' ? 400 : 500
      sendJson(response, status, { error: status === 400 ? error.message : 'Unable to save the employee data file.' })
    }
    return
  }

  response.setHeader('Allow', 'GET, PUT')
  sendJson(response, 405, { error: 'Method not allowed.' })
})

server.listen(3001, '127.0.0.1', () => {
  console.log('Employee data API listening at http://127.0.0.1:3001')
})

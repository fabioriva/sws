import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  const { username, password } = await req.body
  const url = 'http://localhost:3001/api/login.js'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (response.ok) {
      const { token, aps } = await response.json()
      return res.status(200).json({ token, aps })
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    const { response } = error
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message })
  }
}

import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing')
  }

  const auth = await req.headers.authorization
  const url = 'http://localhost:3001/api/profile.js'
  try {
    const { token } = JSON.parse(auth)
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token })
      }
    })
    if (response.ok) {
      const user = await response.json()
      return res.status(200).json(user)
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

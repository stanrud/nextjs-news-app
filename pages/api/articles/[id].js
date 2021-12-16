import { articles } from '../../../data/articles'

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      const article = articles.find(i => i.id === id)
      res.status(200).json(article)
      break
    case 'POST':
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

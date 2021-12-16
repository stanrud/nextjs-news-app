import { articles } from '../../data/articles'

export default function handler(req, res) {
  const {
    query: { skip, limit },
    method,
  } = req

  switch (method) {
    case 'GET':
      console.log('skip', skip)
      console.log('limit', limit)
      res.status(200).json(articles)
      break
    case 'POST':
      res.status(200).json({ message: 'Create a new article' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

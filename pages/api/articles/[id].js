import { articles } from '../../../data/articles'
import { articlesRepo } from '../../../helpers/articles-repo'

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      const article = articlesRepo.getById(id)
      res.status(200).json(article)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

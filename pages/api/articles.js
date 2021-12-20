import { articlesRepo } from '../../helpers/articles-repo'

export default function handler(req, res) {
  const {
    body,
    method,
    query
  } = req

  switch (method) {
    case 'GET':
      const articles = articlesRepo.getAll(query)
      res.status(200).json(articles)
      break
    case 'POST':
      articlesRepo.create(body)
      res.status(200).json({ message: 'Successfully created a new article' })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

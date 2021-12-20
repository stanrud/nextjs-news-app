import { articlesRepo } from 'helpers/articles-repo'

export default function handler(req, res) {
  const {
    body,
    method,
    query
  } = req

  switch (method) {
    case 'GET':
      return getArticles()
    case 'POST':
      return createArticle(body)
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

  function getArticles() {
    try {        
      const articles = articlesRepo.getAll(query)
      return res.status(200).json(articles)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  function createArticle(body) {
    try {        
      articlesRepo.create(body)
      return res.status(200).json({ message: 'Successfully created a new article' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

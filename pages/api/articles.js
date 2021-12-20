import { connectToDatabase } from 'lib/mongodb'

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

  async function getArticles() {
    try {        
      const { db } = await connectToDatabase()
      const data = await db
        .collection('news')
        .find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray()
      const articles = JSON.parse(JSON.stringify(data))
      return res.status(200).json(articles)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async function createArticle({ title, email, body, image }) {
    try {
      if (!title || !email || !image) {
        throw new Error('title, email and image are required!')
      }
      const article = {
        title,
        email,
        body,
        image,
        createdAt: new Date().toISOString()
      }
      const { db } = await connectToDatabase()
      await db.collection('news').insertOne(article)
      return res.status(200).json({ message: 'Successfully created a new article' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

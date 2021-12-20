import { connectToDatabase } from 'lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      const { db } = await connectToDatabase()
      const data = await db
        .collection('news')
        .findOne({ _id: new ObjectId(id) })
      const article = JSON.parse(JSON.stringify(data))
      res.status(200).json(article)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

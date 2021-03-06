import { useRouter } from 'next/router'
import Image from 'next/image'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import { connectToDatabase } from 'lib/mongodb'
import { ObjectId } from 'mongodb'

export default function Article({ article }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Box className='flex justify-center items-center'>
        <CircularProgress />
      </Box>
    )
  }

  if (!article) return <div>Loading...</div>

  return (
    <article key={article.id} className='mt-5 mx-10 md:mx-0 flex flex-col items-center'>
      <p className='font-medium md:font-bold text-xl md:text-4xl my-10'>
        {article.title}
      </p>
      {
        article.image ?
          <div className='relative w-full h-80 md:h-[62vh]'>
            <Image
              src={article.image}
              alt={article.title}
              layout='fill'
              objectFit='cover'
              loader={() => article.image}
              className=''
            />
          </div> :
          null
      }
      <p className='font-normal my-10 text-base'>
        {article.body}
      </p>
    </article>
  )
}

export async function getServerSideProps({ params: { id }}) {
  const { db } = await connectToDatabase()

  const data = await db
    .collection('news')
    .findOne({ _id: new ObjectId(id) })

  if (!data) {
    return {
      notFound: true,
    }
  }

  const article = JSON.parse(JSON.stringify(data))

  return { props: { article } }
}
import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import { connectToDatabase } from 'lib/mongodb'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import Fab from 'components/Fab'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function Home({ articles }) {
  if (!articles) {
    return (
      <Box className='flex justify-center items-center'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <div className=''>
      <Head>
        <title>Modern News app</title>
        <meta name='description' content='Modern News app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        {articles.map((article) => (
          <Link
            key={article._id}
            passHref={true}
            underline='none'
            href='/articles/[id]'
            as={`/articles/${article._id}`}
          >
            <CardActionArea>
              <Card
                raised={false}
                className='flex flex-row h-30 md:h-40 shadow-md my-4'
              >
                <CardMedia
                  component='img'
                  image={article.image}
                  style={{ width: '30%' }}
                />
                <CardContent>
                  <Typography gutterBottom variant='h6' component='div' className='text-base md:text-lg font-medium md:font-semibold'>
                    {article.title}
                  </Typography>
                  <Typography variant='caption' component='div' color='text.secondary'>
                    {moment(article.createdAt).format('LL')}
                  </Typography>
                  <Typography variant='caption' component='div' color='text.secondary'>
                    {article.email}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Link>
        ))}
        <div className='fixed right-5 bottom-5 sm:bottom-10 sm:right-10'>
          <Fab />
        </div>
      </main>

      <footer className=''></footer>

    </div>
  )
}


export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase()

  const data = await db
    .collection('news')
    .find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const articles = JSON.parse(JSON.stringify(data))

  return {
    props: { articles: articles }
  }
}
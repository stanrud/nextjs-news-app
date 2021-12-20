import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import Fab from 'components/Fab'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { articlesRepo } from 'helpers/articles-repo'

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
            key={article.id}
            passHref={true}
            underline='none'
            href='/articles/[id]'
            as={`/articles/${article.id}`}
          >
            <CardActionArea
              className='my-4'
            >
              <Card
                raised={false}
                className='flex flex-row h-30 md:h-40 shadow-md'
              >
                <CardMedia
                  component='img'
                  image={article.image}
                  className='w-3/12'
                />
                <CardContent>
                  <Typography gutterBottom variant='h6' component='div' className='text-base md:text-lg font-medium md:font-semibold'>
                    {article.title}
                  </Typography>
                  <Typography variant='caption' component='div' color='text.secondary'>
                    {moment(article.createdAt).format('LL')}
                  </Typography>
                  <Typography variant='caption' component='div' underline color='text.secondary'>
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


export async function getStaticProps(context) {
  const articles = await articlesRepo.getAll()

  if (!articles) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { articles },
  }
}
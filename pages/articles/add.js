import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Input,
  Alert,
  Button,
  Backdrop,
  CircularProgress,
  TextareaAutosize
} from '@mui/material'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { articleService } from 'services/article.service'
import * as Yup from 'yup'
import Image from 'next/image'

const imagePlaceholder = require('src/assets/images/image-placeholder.png')

export default function AddEdit(props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [file, setFile] = useState(null)

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    email: Yup.string()
      .required('Email is required'),
    image: Yup.mixed()
      .test('image', 'Image is required', (value) => value && value.length > 0)
      .test('fileType', 'Unsupported file type', (value) => value && value.length > 0 && value[0].type.includes('image'))
  })

  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState, getValues } = useForm(formOptions)
  const { errors } = formState

  const handleFileChange = (e) => {
    const { files } = e.target
    if (files && files[0]) {
      if (!files[0].type.includes('image')) {
        setFile(null)
        return enqueueSnackbar('Unsupported file type', { variant: 'error' })
      }
      if (files[0].size > 5000000) {
        setFile(null)
        return enqueueSnackbar('Image file is too large (5MB max)', { variant: 'error' })
      }
      setFile(files[0])
    }
  }

  const onSubmit = (data) => {
    return articleService.create(data)
      .then(() => router.push('/'))
      .catch(e => console.log('error', e))
  }

  return (
    <>
      <Head>
        <title>Add a new article</title>
      </Head>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={formState.isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 w-full'>
        <Button
          component='label'
          className='relative my-2 h-96 flex items-center justify-center border-2'
        >
          <Image
            src={file ? URL.createObjectURL(file) : imagePlaceholder}
            alt='Article Image'
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          />
          <Input
            hidden
            type='file'
            name='image'
            {...register('image', {
              onChange: (e) => handleFileChange(e),
            })}
          />
        </Button>
        <Input
          name='title'
          disableUnderline
          placeholder='Title'
          className='w-full h-15 my-2 text-3xl bg-slate-50 px-4 py-2 rounded-lg'
          {...register('title')}
        />
        <Input
          name='email'
          placeholder='Author Email'
          disableUnderline
          className='w-full h-15 my-2 text-xl bg-slate-50 px-4 py-2 rounded-lg'
          {...register('email')}
        />
        <TextareaAutosize
          name='body'
          minRows={5}
          placeholder='Body'
          className='w-full text-xl my-2 bg-slate-50 text-gray-600 px-4 py-2 rounded-lg'
          {...register('body')}
        />
        {Object.keys(errors).length > 0 && Object.keys(errors).map(error => <Alert key={error} className='my-1 rounded-lg' severity='error'>{errors[error].message}</Alert>)}
        <div className='my-6 flex justify-end'>
          <Button href='/' color='info' className='mx-2'>Cancel</Button>
          <Button type='submit' disabled={formState.isSubmitting} variant='outlined' color='success' className='mx-2'>Publish</Button>
        </div>
      </form>
    </>
    
  )
}
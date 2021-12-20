const apiUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api'
  : 'https://nextjs-news-app-tawny.vercel.app/api'

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/demo/image/upload'

export { apiUrl, cloudinaryUrl }
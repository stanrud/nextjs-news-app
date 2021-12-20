const apiUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api'
  : process.env.API_URL

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/demo/image/upload'

export { apiUrl, cloudinaryUrl }
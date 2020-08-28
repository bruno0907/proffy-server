import * as multer from 'multer'
import path from 'path'

const PATH = path.resolve(__dirname, '..', '..', 'uploads')


module.exports = {
  storage: multer.diskStorage({
    
    destination: PATH,
    
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)
      const fileName = `${name}-${Date.now()}${ext}`.toLocaleLowerCase().split(' ').join('-')

      cb(null, fileName)
    }
  })
}
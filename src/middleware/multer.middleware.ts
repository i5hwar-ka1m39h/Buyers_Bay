import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/temp")
    },
    filename: function(req, file, cb){
        const suffix = `${Date.now()}_${Math.round(Math.random()*1E9)}`

        cb(null, `${file.fieldname}_${suffix}`)
    }
})

export const upload = multer({storage:storage})
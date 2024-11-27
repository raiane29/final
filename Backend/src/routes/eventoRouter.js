import { Router } from "express";
import multer from 'multer';
import { create, getEventos, getEvento, deleteEvento} from "../controllers/eventoController.js";
//import imageUpload from "../helper/image-upload.js";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.post('/criar', upload.single('imagem'), create);
router.get('/listar', getEventos);
router.get('/:id', getEvento);
// router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);

export default router;

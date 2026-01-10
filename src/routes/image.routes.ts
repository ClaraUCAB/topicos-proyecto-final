import { Router } from 'express';
import multer from 'multer';
import { ImageHandler } from '../handlers/ImageHandler.ts';
import { ImageService } from '../services/ImageService.ts';

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });
const router = Router();

const handler = new ImageHandler(new ImageService());

router.post('/resize', upload.single('image'), handler.resize.bind(handler));
router.post('/crop', upload.single('image'), handler.crop.bind(handler));
router.post('/format', upload.single('image'), handler.format.bind(handler));
router.post('/rotate', upload.single('image'), handler.rotate.bind(handler));
router.post('/filter', upload.single('image'), handler.filter.bind(handler));
router.post('/pipeline', upload.single('image'), handler.pipeline.bind(handler));

export default router;

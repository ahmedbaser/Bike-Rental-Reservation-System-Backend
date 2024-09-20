import express from 'express';
import contactUsSection from '../controllers/contactController';

const router = express.Router();


router.post('/contact', contactUsSection)
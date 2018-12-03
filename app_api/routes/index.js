var express = require ('express');
var router = express.Router();
var ctrlVideos = require('../controllers/videos.js');
//var ctrlCreditos = require('../controllers/creditos.js');
var validate = require('../../app_server/routes/auth')
//videos
router.get('/videos', ctrlVideos.videosList);
router.post('/videos', /*validate.required ,*/ctrlVideos.videosCreate);
router.get('/videos/:videoid',ctrlVideos.videosReadOne);
router.put('/videos/:videoid', /*validate.required,*/ ctrlVideos.videosUpdateOne);
router.delete('/videos/:videoid',/* validate.required,*/ ctrlVideos.videosDeleteOne);

//creditos
/*
router.post('/videos/:videoid/creditos', ctrlCreditos.creditosCreate);
router.get('/videos/:videoid/creditos/:creditoid', ctrlCreditos.creditosReadOne);
router.put('/videos/:videoid/creditos/:creditoid', ctrlCreditos.creditosUpdateOne);
router.delete('/videos/:videoid/creditos/creditoid', ctrlCreditos.creditosDeleteOne);
*/
module.exports = router;
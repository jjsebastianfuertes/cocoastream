var express = require ('express');
var router = express.Router();
var ctrlVideos = require('../controllers/videos.js');
//var ctrlCreditos = require('../controllers/creditos.js');

//videos
router.get('/videos', ctrlVideos.videosList);
router.post('/videos',ctrlVideos.videosCreate);
router.get('/videos/:videoid',ctrlVideos.videosReadOne);
router.put('/videos/:videoid',ctrlVideos.videosUpdateOne);
router.delete('/videos/:videoid', ctrlVideos.videosDeleteOne);

//creditos
/*
router.post('/videos/:videoid/creditos', ctrlCreditos.creditosCreate);
router.get('/videos/:videoid/creditos/:creditoid', ctrlCreditos.creditosReadOne);
router.put('/videos/:videoid/creditos/:creditoid', ctrlCreditos.creditosUpdateOne);
router.delete('/videos/:videoid/creditos/creditoid', ctrlCreditos.creditosDeleteOne);
*/
module.exports = router;
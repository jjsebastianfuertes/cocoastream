var express = require ('express');
var router = express.Router();
var ctrlVideos = require('../controllers/videos.js');

//videos
router.get('/videos', ctrlVideos.videosList);
router.post('/videos',ctrlVideos.videosCreate);
router.get('/videos/:videoid',ctrlVideos.videosReadOne);
router.put('/videos/:videoid',ctrlVideos.videosUpdateOne);
router.delete('/videos/:videoid', ctrlVideos.videosDeleteOne);

module.exports = router;
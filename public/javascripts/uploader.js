var cloudinary = require('cloudinary');

var vidPreview = document.getElementById('vid-preview');
var fileUpload = document.getElementById('file-upload');


cloudinary.config({ 
    cloud_name: 'cocoastream', 
    api_key: '374781827885525', 
    api_secret: 'JX8B3MlwzJ2P2O0rSe4CHJDOxkk' 
  });

fileUpload.addEventListener('change', function(){
    var file = event.target.files[0];
    
});
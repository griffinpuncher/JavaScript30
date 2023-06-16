//document.addEventListener('DOMContentLoaded',()=>{
                
        const video = document.querySelector('.player');
        const canvas = document.querySelector('.photo');
        const ctx = canvas.getContext('2d');
        const strip = document.querySelector('.strip');
        const snap = document.querySelector('.snap');

        function getVideo() {
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then(localMediaStream => {
                        video.srcObject = localMediaStream;
                        video.play();
                }).catch(err => {
                        console.log('Oops!');
                });
        }
        
        function paintToCanvas() {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                setInterval(()=>{
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                }, 10)
        }
        
        getVideo();
        paintToCanvas();
//});
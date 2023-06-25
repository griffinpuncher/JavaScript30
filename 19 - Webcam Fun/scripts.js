//document.addEventListener('DOMContentLoaded',()=>{
                
        const video = document.querySelector('.player');
        const canvas = document.querySelector('.photo');
        const ctx = canvas.getContext('2d');
        const strip = document.querySelector('.strip');
        const snap = document.querySelector('.snap');

        ctx.canvas.willReadFrequently = true;

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
                        let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        pixels = rgbSplit(pixels);
                        //pixels = redEffect(pixels);
                        ctx.putImageData(pixels, 0, 0);
                }, 48)
        }

        function redEffect(pixels) {
                for(let i = 0; i < pixels.data.length; i += 4) {
                        pixels.data[i + 0] *= 3;
                        pixels.data[i + 1] *= .75;
                        pixels.data[i + 2] *= .5; 
                }
                return pixels;
        }

        function rgbSplit(pixels) {
                const inputLog = {};

                document.querySelectorAll('.rgb input').forEach((input)=>{
                        inputLog[input.name] = input.value;
                });

                console.log(inputLog);

                for(let i = 0; i < pixels.data.length; i += 4) {
                        pixels.data[i + 250] = pixels.data[i + 0];
                        pixels.data[i - 250] = pixels.data[i + 1];
                        pixels.data[i + 150] = pixels.data[i + 2]; 
                }
                return pixels;
        }

        function greenScreen() {
                for(let i = 0; i < pixels.data.length; i += 4) {
                        pixels.data[i + 0] *= 3;
                        pixels.data[i + 1] *= .75;
                        pixels.data[i + 2] *= .5; 
                }
                return pixels;
        }

        function takePhoto() {
                snap.currentTime = 0;
                snap.play();

                const data = canvas.toDataURL('image/jpeg');
                const link = document.createElement('a');
                link.href = data;
                link.setAttribute('download', 'handsome');
                link.innerHTML = `<img src='${data}' alt='Download image'>`;
                strip.insertBefore(link, strip.firstChild);
        }
        
        getVideo();

        video.addEventListener('canplay', paintToCanvas);
//});
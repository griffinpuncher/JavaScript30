//document.addEventListener('DOMContentLoaded',()=>{
                
        const video = document.querySelector('.player');
        const canvas = document.querySelector('.photo');
        const ctx = canvas.getContext('2d');
        const strip = document.querySelector('.strip');
        const snap = document.querySelector('.snap');

        const parameterInputs = document.querySelectorAll('.rgb input');
        let isExecuting = false;
        let callbackQueue = [];

        const inputLog = {};
        let offset = [110,-250,200];

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
                        pixels = greenScreen(pixels);
                        //pixels = rgbSplit(pixels);
                        //ctx.globalAlpha = .1;
                        //pixels = redEffect(pixels);
                        ctx.putImageData(pixels, 0, 0);
                        
                }, 48)
        };

        function redEffect(pixels) {
                for(let i = 0; i < pixels.data.length; i += 4) {
                        pixels.data[i + 0] *= 3;
                        pixels.data[i + 1] *= .75;
                        pixels.data[i + 2] *= .5; 
                }
                return pixels;
        }

        function rgbSplit(pixels) {
                const startTime = performance.now();

                for(let i = 0; i < pixels.data.length; i += 4) {
                        pixels.data[i + offset[0]] = pixels.data[i + 0];
                        pixels.data[i - offset[1]] = pixels.data[i + 1];
                        pixels.data[i + offset[2]] = pixels.data[i + 2]; 
                }
                const endtime = performance.now();
                console.log(endtime - startTime);
                return pixels;
        }

        function greenScreen(pixels) {
                for(let i = 0; i < pixels.data.length; i += 4) {
                        red = pixels.data[i + 0];
                        green = pixels.data[i + 1];
                        blue = pixels.data[i + 2];
                        alpha = pixels.data[i + 3];
                        if(red >= inputLog.rmin && red <= inputLog.rmax &&
                                green >= inputLog.gmin && green <= inputLog.gmax &&
                                blue >= inputLog.bmin && blue <= inputLog.bmax) {
                                pixels.data[i + 3] = 0;
                        }
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

        function updateParameters() {
                parameterInputs.forEach((input)=>{
                        inputLog[input.name] = input.value;
                });
                offset = [inputLog.roff,inputLog.goff,inputLog.boff];
                console.log(inputLog);
        }

        updateParameters()

        getVideo();

        video.addEventListener('canplay', paintToCanvas);

        parameterInputs.forEach((input)=>{
                input.addEventListener('input' ,updateParameters)
        });
//});
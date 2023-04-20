document.addEventListener("DOMContentLoaded", function() {
    
    const clicks = document.querySelectorAll(".key");
    clicks.forEach((click) => {
        const dataKey = click.getAttribute("data-key");
        click.addEventListener("click", () => {
            playAudio(dataKey);
        });       
        window.addEventListener("keydown", (e) => {
            const divLetter = document.querySelector(`div[data-key="${dataKey}"] > kbd`).textContent.toLowerCase();
            if (e.key === divLetter) {
                playAudio(dataKey);
            };
        });
    });

    function playAudio(dataKey) {
        const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
        audio.currentTime = 0;
        audio.play();
        document.querySelector(`div[data-key="${dataKey}"]`).classList.add("playing");
        audio.addEventListener("ended", () => {
            document.querySelector(`div[data-key="${dataKey}"]`).classList.remove("playing");
        })
    }
});
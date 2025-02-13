document.addEventListener("DOMContentLoaded", () => {
    const rectangle = document.getElementById("rectangle"); //The filter that cover the whole background video
    const timerDisplay = document.getElementById("timer"); //Time calculator
    const colorCodeDisplay = document.getElementById("colorCode"); //To display filter's color code

    //Color change
    function blendColors(startColor, endColor, blendFactor, transparency = 0.2) {
        let blendedColor = [];
    
        for (let i = 0; i < 3; i++) {
            blendedColor.push(Math.round(startColor[i] + blendFactor * (endColor[i] - startColor[i])));
        }
    
        return `rgba(${blendedColor[0]}, ${blendedColor[1]}, ${blendedColor[2]}, ${transparency})`;
    }
    

    const yellow = [255, 255, 0];
    const blue = [0, 0, 255];

    //Manually simulate a timer that starts 17:10
    //This part I reference ChatGPT by asking how can I create a timer that start with 17:00 instead of the current time. I didn't ask for the specific code, but it briefly describe the methodology to me.
    const startHour = 17;
    const startMinute = 10;
    const totalDuration = 10 * 60 * 1000;

    let startTime = performance.now();

    function updateBackgroundColor() {
        let elapsedTime = performance.now() - startTime;
        let progress = Math.min(elapsedTime / totalDuration, 1);

        let currentColor = blendColors(yellow, blue, progress);
        rectangle.style.backgroundColor = currentColor;

        let simulatedMinutes = Math.floor(elapsedTime / 60000);
        let simulatedSeconds = Math.floor((elapsedTime % 60000) / 1000);

        let displayMinutes = (startMinute + simulatedMinutes).toString().padStart(2, '0');
        let displaySeconds = simulatedSeconds.toString().padStart(2, '0');

        timerDisplay.textContent = `${startHour}:${displayMinutes}:${displaySeconds}`;
        colorCodeDisplay.textContent = `Color: ${currentColor}`;

        if (progress < 1) {
            requestAnimationFrame(updateBackgroundColor);
        }
    }

    updateBackgroundColor();
});

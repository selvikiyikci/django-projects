let timeLeft = 0;
let countdown;

document.getElementById("startBtn").addEventListener("click", function () {
    clearInterval(countdown);

    const inputValue = document.getElementById("timeInput").value;
    if (!inputValue || inputValue <= 0) {
        alert("Lütfen geçerli bir süre girin!");
        return;
    }

    timeLeft = parseInt(inputValue);
    document.getElementById("timer").innerText = `${timeLeft} saniye`;

    countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countdown);
            document.getElementById("timer").innerText = "Süre doldu!";
        } else {
            document.getElementById("timer").innerText = `${timeLeft} saniye`;
        }
    }, 1000);
});

document.getElementById("resetBtn").addEventListener("click", function () {
    clearInterval(countdown);
    document.getElementById("timer").innerText = "Hazır";
    document.getElementById("timeInput").value = "";
});

const orb = document.getElementById("orb");

// Mouse parallax
document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    orb.style.transform = `translate(${x}px, ${y}px)`;

});

// Click pop
orb.addEventListener("click", () => {

    orb.classList.remove("pop");

    void orb.offsetWidth;

    orb.classList.add("pop");

});
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createStars();
}

function createStars() {

    stars = [];

    const pageHeight = document.body.scrollHeight;

    for(let i = 0; i < 600; i++){

        stars.push({

            x: Math.random() * window.innerWidth,

            y: Math.random() * pageHeight,

            size: Math.random() * 2 + 0.3,

            alpha: Math.random(),

            twinkle: Math.random() * Math.PI * 2

        });

    }

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const scroll = window.scrollY;

    for(const star of stars){

        const y = star.y - scroll;

        if(y < -20 || y > window.innerHeight + 20) continue;

        star.twinkle += 0.02;

        ctx.beginPath();

        ctx.fillStyle = `rgba(255,255,255,${
            star.alpha * (0.6 + Math.sin(star.twinkle) * 0.4)
        })`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#52F2B8";

        ctx.arc(
            star.x,
            y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    requestAnimationFrame(animate);

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();

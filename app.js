const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "red";


class Ball {
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random() * 80 + 40;
        this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
        this.y = -this.radius;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.angle = 0;
        this.va = Math.random() * 0.1 - 0.05;
        this.range = Math.random() * 30;
        this.gravity = Math.random() * 0.005;
        this.vy = 0;
        
    }
    update() {
        if (this.x < this.radius || this.x > this.effect.width - this.radius) this.speedX *= -1;
        //if (this.y < this.radius || this.y > this.effect.height - this.radius) this.speedY *= -1;
        if (this.y > this.effect.height + this.radius) {
            this.y = -this.radius;
            this.vy = 0;
            this.speedY = Math.random() * 1.5 + 0.5;
        }
        if (this.y > this.radius * 2) {
            this.vy += this.gravity;
            this.speedY += this.vy  
            //this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
        }
        //this.angle += this.va;
        //this.x += this.speedX * Math.sin(this.angle) * this.range;
      
        this.x += this.speedX 
        //this.y += this.speedY * Math.cos(this.angle) * this.range;
        this.y += this.speedY
    }
    draw(context) { 
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

class MetaballsEffect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.metaballsArray = [];
    }
    init(numberOfBalls) {
        for (let i = 0; i < numberOfBalls; i++) {
            this.metaballsArray.push(new Ball(this));
        }
    }
    update() {  
        this.metaballsArray.forEach(metaball => metaball.update());
    }
    draw(context) {
        this.metaballsArray.forEach(metaball => metaball.draw(context))
    }
}

const effect = new MetaballsEffect(canvas.width, canvas.height);
effect.init(20);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(animate)
}
animate();


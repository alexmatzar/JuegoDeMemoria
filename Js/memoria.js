const grid = document.getElementById('grid');
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];
let selectedCards = [];
let matchedCards = [];

// baraja o revuelve
let cardsArray = [...images, ...images];
cardsArray = cardsArray.sort(() => Math.random() - 0.5);

// Crear las cartas, ojo
cardsArray.forEach((img) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front"></div> <!-- Reverso de la carta -->
        <img class="back" src="../img/${img}" alt="img"> <!-- Imagen que se muestra al voltear -->
    `;
    grid.appendChild(card);

    // Agregar evento click para voltear la carta
    card.addEventListener('click', () => {
        if (selectedCards.length < 2 && !card.classList.contains('flip')) {
            card.classList.add('flip');
            selectedCards.push(card);

            if (selectedCards.length === 2) {
                checkForMatch();
            }
        }
    });
});

function checkForMatch() {
    const [card1, card2] = selectedCards;
    if (card1.innerHTML === card2.innerHTML) {
        matchedCards.push(card1, card2);
        selectedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            selectedCards = [];
        }, 1000);
    }
}

// btn de inicio
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startContainer').style.display = 'none';
    document.getElementById('introContainer').style.display = 'flex';

    // antony, esas son las cartas, 5 segundos después de que aparezca Morty
    setTimeout(() => {
        startGame();
    }, 10000);
});

function startGame() {
    document.getElementById('introContainer').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
}

// las estrellas
var Stars = function(args) {
    if (args === undefined) args = {};
    var _scope = this;

    this.stars = [];
    this.vel = args.vel || 1;
    this.radius = args.radius || 1;
    this.alpha = 0.2;
    this.starsCounter = args.stars || 300;
    var center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    var canvas, context;
    this.init = function() {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        context = canvas.getContext("2d");
        context.lineCap = "round";
        this.start();
        this.resize();
        // 
        window.addEventListener("resize", this.resize.bind(this));
    }

    this.start = function() {
        this.stars = [];
        for (var i = 0; i < this.starsCounter; i++) {
          setTimeout(function(){
            _scope.stars.push(new Star());
          }, i*30);
        }
    }

    this.resize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;
    }

    this.animate = function() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
    this.render = function() {
        context.fillStyle = 'rgba(1, 4, 35, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "white";
        for (var i = 0; i < this.stars.length; i++) this.stars[i].update();
    }

    var Star = function() {
        this.x = center.x;
        this.y = center.y;
        this.init = function() {
            this.radius = Math.random() * _scope.radius;
            this.x = center.x;
            this.y = center.y;
            this.lineWidth = 0;
            this.vel = {
                x: Math.random() * 4 - 2,
                y: Math.random() * 4 - 2
            }
        }
        this.update = function() {
            this.vel.x *= 1.05;
            this.vel.y *= 1.05;
            this.lineWidth += 0.035;
            this.x0 = this.x;
            this.y0 = this.y;
            this.x += this.vel.x;
            this.y += this.vel.y;
            this.draw();
            if (this.isDead()) this.init();
        }
        this.draw = function() {
            context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x, this.y);
            context.lineWidth = this.lineWidth;
            context.stroke();
        }
        this.isDead = function() {
            return (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height);
        }
        this.init();
        return this;
    }
    this.init();
    this.animate();
    return this;
}

var _stars = new Stars();
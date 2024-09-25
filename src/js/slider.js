// Acessar todas as imagens do slider
let slideImages = document.querySelectorAll('.slider-image');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let dotsContainer = document.querySelector('.dotsContainer');
let counter = 0;

// Função para gerar os dots dinamicamente
function createDots() {
    dotsContainer.innerHTML = ''; // Limpa os dots antigos

    slideImages.forEach((_, index) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // O primeiro dot começa como ativo
        dot.setAttribute('attr', index);
        dot.addEventListener('click', function() {
            switchImage(dot);
        });
        dotsContainer.appendChild(dot);
    });

    // Atualizar a lista de dots com os novos elementos criados
    dots = document.querySelectorAll('.dot');
}

// Função que alterna a imagem atual com base no indicador (dot) clicado
function switchImage(currentImage) {
    let imageId = parseInt(currentImage.getAttribute('attr')); // Parse o valor do atributo
    if (imageId > counter) {
        slideImages[counter].style.animation = 'next1 0.3s ease-in forwards';
        counter = imageId;
        slideImages[counter].style.animation = 'next2 0.3s ease-in forwards';
    } else if (imageId === counter) {
        return;
    } else {
        slideImages[counter].style.animation = 'prev1 0.3s ease-in forwards';
        counter = imageId;
        slideImages[counter].style.animation = 'prev2 0.3s ease-in forwards';
    }
    indicators();
}

// Função que atualiza os indicadores (dots)
function indicators() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[counter].classList.add('active');
}

// Evento de avançar para próxima imagem
next.addEventListener('click', slideNext);
function slideNext() {
    slideImages[counter].style.animation = 'next1 0.3s ease-in forwards';
    if (counter >= slideImages.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    slideImages[counter].style.animation = 'next2 0.3s ease-in forwards';
    indicators();
}

// Evento de voltar para a imagem anterior
prev.addEventListener('click', slidePrev);
function slidePrev() {
    slideImages[counter].style.animation = 'prev1 0.3s ease-in forwards';
    if (counter === 0) {
        counter = slideImages.length - 1;
    } else {
        counter--;
    }
    slideImages[counter].style.animation = 'prev2 0.3s ease-in forwards';
    indicators();
}

// Função para gerar os dots e inicializar o slider
function initSlider() {
    slideImages = document.querySelectorAll('.slider-image'); // Atualiza a lista de imagens
    createDots(); // Gera os dots para as imagens
}

// Iniciar o slider quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initSlider);

//*************** Swipe no Mobile ****************** */

let touchStartX = 0;
let touchEndtX = 0;

function VerificarDirecao() {
    if(touchEndtX < touchStartX){
        slideNext();
    }
    if(touchEndtX > touchStartX){
        slidePrev();
    }
}

var bb = document.getElementsByClassName('slider-image');

for(let i = 0; i < bb.length; i++){
    bb[i].addEventListener("touchstart", (e) =>{
        touchStartX = e.changedTouches[0].screenX;
    });

    bb[i].addEventListener("touchend", (e) =>{
        touchEndtX = e.changedTouches[0].screenX;
        VerificarDirecao();
    });
}

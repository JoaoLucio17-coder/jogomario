const shark = document.querySelector('.shark');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

// Controla se o jogador perdeu para evitar pulos pós-morte
let isGameOver = false;

const jump = (event) => {
    // Se o evento veio do teclado, verifica se foi a Barra de Espaço
    if (event.type === 'keydown') {
        if (event.code !== 'Space') return; // Ignora outras teclas
        event.preventDefault(); // Impede a tela de tremer/rolar
    }

    // Se o jogo acabou, a barra de espaço ou toque reinicia o jogo
    if (isGameOver) {
        restart();
        return;
    }

    // Executa o pulo se o tubarão já não estiver pulando
    if (!shark.classList.contains('jump')) {
        shark.classList.add('jump');
        setTimeout(() => { 
            shark.classList.remove('jump');
        }, 500);
    }
}

// Loop principal de checagem de colisão
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const sharkPosition = +window.getComputedStyle(shark).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    // Condição de colisão adaptada ao tamanho do seu tubarão
    if (pipePosition <= 100 && pipePosition > 0 && sharkPosition < 60) {
        isGameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        shark.style.animation = 'none';
        shark.style.bottom = `${sharkPosition}px`;

        shark.src = 'assets/imgs/shurark.png';
        shark.style.width = '200px';
        shark.style.marginLeft = '35px';

        cloud.style.animation = 'none'; // Para a animação da nuvem no lugar
        cloud.style.left = `${cloudPosition}px`;

        gameOver.style.visibility = 'visible';

        clearInterval(loop);
    }
}, 10);

// Função de reinício que recarrega a página de forma limpa
const restart = () => {
    window.location.reload();
}

// Ouvintes de eventos atualizados recebendo o parâmetro 'event'
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

// Botão de reiniciar físico na tela
restartButton.addEventListener('click', restart);

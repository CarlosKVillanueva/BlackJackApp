/*
(function () {
})();
*/

// FUNCION ANONIMA AUTOINVOCADA - PATRON MODULO
const modulo = (() => {
    'use strict';


    let deck = [];
    const palos = ["C", "D", "H", "S"], figuras = ["J", "Q", "K", "A"], BLACKJACK = 21;
    let puntosJugadores = [];
// Ref HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnDetener = document.querySelector('#btnDetener');
    const puntosSmall = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartasJugador');

    const inicializarJuego = ( nroJugadores = 2) => {
        deck = createDeck();
        puntosJugadores = [];
        for (let i = 0; i < nroJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosSmall.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnDetener.disabled = false;
        btnPedir.disabled = false;

    };

    const createDeck = () => {
        deck = [];
        for (let i = 2; i < 11; i++) {
            for (let palo of palos) {
                deck.push(i + palo);
            }
        }
        for (let palo of palos) {
            for (let figura of figuras) {
                deck.push(figura + palo);
            }
        }
        return _.shuffle(deck);
    };

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay mas cartas en el deck';
        }
        return deck.pop();
    };

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (!isNaN(valor)) ? +valor : valor === 'A' ? 11 : 10;
    }
// Eventos

    let puntosJug;
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJug = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJug > BLACKJACK) {
            console.warn('Perdiste!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoIA(puntosJug);
        } else if (puntosJug === BLACKJACK) {
            console.warn('21!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoIA(puntosJug);
        }
    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoIA(puntosJug);
    })

    btnNuevo.addEventListener('click',
        () => {
            inicializarJuego();
        })
// Turno IA

    // Turno =  primer Jugador y ultimo la IA
    const acumularPuntos = (carta,turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosSmall[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta)
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosIA] = puntosJugadores;
        setTimeout(() => {
            if (puntosIA === puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > BLACKJACK || puntosIA === BLACKJACK) {
                alert('Gana la IA');
            } else if (puntosIA > BLACKJACK || puntosMinimos === BLACKJACK) {
                alert('Gana el Jugador');
            }
        }, 500);
    }

    const turnoIA = (puntosMinimos) => {

        let puntosIA;
        do {
            const carta = pedirCarta();
            const turno = puntosJugadores.length - 1;
            puntosIA = acumularPuntos(carta, turno);
            crearCarta( carta, turno);
        } while (puntosIA < puntosMinimos && puntosMinimos <= BLACKJACK);

        determinarGanador();
    };

    return {
        nuevoJuego: inicializarJuego
    }
})();






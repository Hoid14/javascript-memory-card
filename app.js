document.addEventListener('DOMContentLoaded', () => {
    //lista de todas las opciones de tarjetas

    const cardArray = [
        {
            name: 'zoroark',
            img: 'images/zoroark.png'
        },
        {
            name: 'mimikyu',
            img: 'images/mimikyu.png'
        },
        {
            name: 'bulbasaur',
            img: 'images/bulbasaur.png'
        },
        {
            name: 'lucario',
            img: 'images/lucario.png'
        },
        {
            name: 'squirtle',
            img: 'images/squirtle.png'
        },
        {
            name: 'greninja',
            img: 'images/greninja.png'
        },
        {
            name: 'pikachu',
            img: 'images/pikachu.png'
        },
        {
            name: 'charmander',
            img: 'images/charmander.png'
        },
        {
            name: 'mimikyu',
            img: 'images/mimikyu.png'
        },
        {
            name: 'greninja',
            img: 'images/greninja.png'
        },
        {
            name: 'pikachu',
            img: 'images/pikachu.png'
        },
        {
            name: 'bulbasaur',
            img: 'images/bulbasaur.png'
        },
        {
            name: 'squirtle',
            img: 'images/squirtle.png'
        },
        {
            name: 'charmander',
            img: 'images/charmander.png'
        },
        {
            name: 'lucario',
            img: 'images/lucario.png'
        },
        {
            name: 'zoroark',
            img: 'images/zoroark.png'
        }
        
        
      ]
  
    cardArray.sort(() => 0.5 - Math.random()) //desordena el array
  
    const grid = document.querySelector('.grid') //selecciona el elemento HTML con la clase grid
    const replay = document.querySelector('.replay') //selecciona el elemento HTML con la clase replay

    const buttonYes = document.querySelector('#yes')
    const buttonNo = document.querySelector('#no')
    


    const resultDisplay = document.querySelector('#result') //selecciona el elemento HTML con el id result
    const commentDisplay = document.querySelector("#comentarios")
    const triesDisplay = document.querySelector("#tries")

    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    let triesCounter = 0
    let cardsClickable = true;

    buttonYes.addEventListener('click', runYes)
    buttonNo.addEventListener('click', runNo)

    function runYes(){
        grid.style.display = 'grid'
        replay.style.display = 'none'
        startGame()
        
    }
    function runNo (){
        replay.innerHTML = ''
        const h2 = document.createElement('h2')
        h2.textContent = 'Gracias por jugar!!'
        replay.appendChild(h2)
    }
    //crea tu tablero
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/pokeball.png')
        card.setAttribute('data-id', i) //le asigna un id a cada tarjeta
        card.addEventListener('click', flipCard)
        card.classList.add('card');
        grid.appendChild(card) //agrega el elemento img al elemento HTML
      }
    }

  
    //comprobar coincidencias
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/pokeball.png')
        cards[optionTwoId].setAttribute('src', 'images/pokeball.png')
        commentDisplay.textContent ='Has clickeado la misma imagen!'
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        commentDisplay.textContent ='Encontraste una coincidencia'
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        triesCounter++
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', 'images/pokeball.png')
        cards[optionTwoId].setAttribute('src', 'images/pokeball.png')
        triesCounter++
        commentDisplay.textContent ='Fallaste! Intentalo de nuevo'
        
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length
      triesDisplay.textContent = triesCounter
      if  (cardsWon.length === cardArray.length/2) {
        commentDisplay.textContent = 'Felicitaciones, encontraste todas!!'

        grid.style.display = 'none'
        replay.style.display = 'block'
        
      }
      cardsClickable = true;
    }
  
    //voltear tu tarjeta
    function flipCard() {
      if (!cardsClickable) return
      
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      
      if (cardsChosen.length ===2) {
        cardsClickable = false;
        //si el jugador ha seleccionado dos cartas, espera medio segundo y luego verifica si las cartas coinciden
        setTimeout(checkForMatch, 500)
      }
    }

    function startGame(){
        cardsChosen = []
        cardsChosenId = []
        cardsWon = []
        triesCounter =0
        cardsClickable = true;
        triesDisplay.textContent = '0'
        resultDisplay.textContent = '0'
        grid.innerHTML=''
        cardArray.sort(() => 0.5 - Math.random())
        createBoard()

    }
    createBoard()
  })
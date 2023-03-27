const card = document.querySelectorAll('.cell')


suffleImage()
clicking()
function suffleImage(){


    card.forEach(c=>{

        const num = [...Array(card.length).keys()]
        const random = Math.floor(Math.random()*card.length)

        c.style.order = num[random]
    })
}

function clicking()
function match(cardOne , cardTwo)
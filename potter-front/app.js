const main = document.querySelector("main")
const userInput = document.querySelector(".input")
const nameInput = document.querySelector("#name")
const header = document.querySelector(".header")
let good = 0
let bad = 0
let filterChars = []
let userName = ''
let userHouse = ''
let userMentor = 0
let userFriend = 0
let userOutcome = ''

const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]

userInput.addEventListener("submit", (event) => {
    event.preventDefault()
    userName = event.target.value
    userInput.remove()
    header.remove()
    userHouse = newHouse()
    mentor(userHouse)
})

function createCards(charList) {
    let div = document.createElement("div")
    div.className = "cards"
    let select = document.createElement("h1")
    select.id = "mentor-header"
    select.innerText = "Choose a Mentor Wisely..."
    main.appendChild(select)


    charList.forEach(character => {
        let single = document.createElement("div")
        single.className = "oneCard"
        let h3 = document.createElement("h3")
        let p = document.createElement("p")
        let id = document.createElement("p")
        let button = document.createElement("button")
        button.innerText = "Select Mentor?"
        button.className = "mentor-b"

        button.addEventListener("click", (event) => {
            let sib = event.target.previousSibling
            userMentor = sib.innerText
            div.remove()
            select.remove()
            fetch("http://localhost:3000/api/v1/characters")
                .then(response => response.json())
                .then(res => friend(res, userHouse))
                .then(res => res[Math.floor(Math.random() * res.length)])
                .then(showFriend)
        })

        h3.innerText = character.name
        
        if (character.role != null) {
            p.innerText = character.role
        }

        id.innerText = character.id

        single.append(h3, p, id, button)
        div.append(single)
    })

    main.appendChild(div)
}

function newHouse() {
    return houses[Math.floor(Math.random() * houses.length)]
}

function mentor(house) {
    if (house == "Gryffindor") {
        fetch("http://localhost:3000/api/v1/characters")
            .then(response => response.json())
            .then(gryffMentor)
            .then(createCards)
    }
    else if (house == "Slytherin") {
        fetch("http://localhost:3000/api/v1/characters")
            .then(response => response.json())
            .then(slythMentor)
            .then(createCards)
        
    }
    else if (house == "Ravenclaw") {
        fetch("http://localhost:3000/api/v1/characters")
            .then(response => response.json())
            .then(ravMentor)
            .then(createCards)
        
    }
    else if (house == "Hufflepuff") {
        fetch("http://localhost:3000/api/v1/characters")
            .then(response => response.json())
            .then(huffMentor)
            .then(createCards)
        
    }
}


function friend(characters, house) {
    return characters.filter(character => {
        return character.role != null && character.role.toLowerCase().includes("student") && character.house == house
    })
}

function showFriend(friend) {
    let page = document.createElement("div")
    page.className = "friend-page"
    let heading = document.createElement("h1")
    heading.id = "greeting"
    let holder = document.createElement("div")
    holder.className = "holder"
    heading.innerText = "Your Best Friend!"
    let nameF = document.createElement("h2")
    let roleF = document.createElement("p")
    let idF = document.createElement("p")
    let next = document.createElement("button")
    next.innerText = "Discover your magical fate"

    next.addEventListener("click", (event) => {
        const userData = []
        let prev = event.target.previousSibling
        userFriend = prev.innerText
        holder.remove()
        fetch(`http://localhost:3000/api/v1/characters/${userMentor}`)
            .then(res => res.json())
            .then(res => {userData.push(res)
                fetch(`http://localhost:3000/api/v1/characters/${userFriend}`)
                .then(res => res.json())
                .then(res => {userData.push(res)
                    showOutcome(determineOutcome(outcome(userData[0], userData[1])))})
            })
    })

    nameF.innerText = friend.name
    roleF.innerText = friend.role
    idF.innerText = friend.id

    page.append(nameF, roleF, idF, next)
    holder.append(heading, page)
    main.appendChild(holder)
}

function outcome(mentor, friend) {
    bad = 0
    good = 0
    if (mentor.deathEater == true) {
        bad++
        if (mentor.house != null && mentor.house == userHouse) {
            bad = bad * 2
        }
    }
    if (friend.deathEater == true) {
        bad = bad + 2
    }
    if (mentor.orderOfThePhoenix == true) {
        good++
        if (mentor.house != null && mentor.house == userHouse) {
            good = good * 2
        }
    }
    if (friend.dumbledoresArmy == true) {
        good = good + 2
    }
    return (good - bad)
}

function determineOutcome(total) {
    if (total > 3) {
        return "Future Headmaster!"
    }
    else if (total < -3) {
        return "Future Death Eater!"
    }
    else if (total < 4 && total > 1) {
        return "Future Auror!"
    }
    else if (total > -4 && total < -1) {
        return "Future Ministry Employee!"
    }
    else {
        return "Future Teacher!"
    }
}

function showOutcome(outcome) {
    let announce = document.createElement("div")
    announce.className = "announce"
    let announcement = document.createElement("h1")
    announcement.innerText = outcome
    let image = document.createElement("img")

    if (outcome == "Future Headmaster!") {
        image.src = "dumbledore.jpeg"
    }
    else if (outcome == "Future Death Eater!") {
        image.src = "death-eater.jpg"
    }
    else if (outcome == "Future Auror!") {
        image.src = "wand-fight.jpeg"
    }
    else if (outcome == "Future Ministry Employee!") {
        image.src = "ministry.jpeg"
    }
    else if (outcome == "Future Teacher!") {
        image.src = "hogwarts.jpeg"
    }

    announce.append(announcement, image)
    main.append(announce)
}

function gryffMentor(characters) {
    return characters.filter(character => {
        return character.orderOfThePhoenix == true || character.patronus != null
    })
}

function slythMentor(characters) {
    return characters.filter(character => {
        return character.deathEater == true || character.ministryOfMagic == true
    })
}

function ravMentor(characters) {
    return characters.filter(character => {
        return (character.role != null && character.role.includes("Auror")) || character.orderOfThePhoenix== true
    })
}

function huffMentor(characters) {
    return characters.filter(character => {
        return character.ministryOfMagic == true || character.orderOfThePhoenix == true
    })
}
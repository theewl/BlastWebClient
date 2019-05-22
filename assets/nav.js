const settings = require('electron-settings')

document.body.addEventListener('click', (event) => {
    if (event.target.dataset.section) {
        handleSectionTrigger(event)
    }
    else if(event.target.dataset.game) {
        handleGameTrigger(event)
    }
})

// handles when a game button is clicked
function handleGameTrigger(event){
    // set global variable 'game' to the current game
    let activeGame = event.target.dataset.game
    settings.set('active_game', activeGame)
    document.getElementById('game').innerHTML = activeGame

    // set active game button
    const buttons = document.querySelectorAll('.active')
    Array.prototype.forEach.call(buttons, (a) => {
        a.classList.remove('active')
    })
    // I'm surprised the line below doesn't work instead
    //document.querySelector('.active').classList.remove('active')

    event.target.parentElement.classList.add('active')

    // Session data is the default page shown
    document.getElementById('button-session-data').click()
}

function handleSectionTrigger (event) {
    hideAllSectionsAndDeselectButtons()

    // Highlight clicked button and show view
    event.target.classList.add('is-selected')
    // Display the current section
    const sectionId = settings.get('active_game') + '-' + `${event.target.dataset.section}-section`

    //sectionId will be used globally
    //settings.set('section_id', sectionId)

    //console.log(sectionId)
    document.getElementById(sectionId).style.display = "block"
}

function activateDefaultSection () {
    document.getElementById('button-fn').click()
}

function hideAllSectionsAndDeselectButtons () {
    const sections = document.querySelectorAll('.js-section')
    Array.prototype.forEach.call(sections, (section) => {
        // hides the content
        section.style.display = "none";
    })

    const buttons = document.querySelectorAll('.nav-button.is-selected')
    Array.prototype.forEach.call(buttons, (button) => {
        button.classList.remove('is-selected')
    })
}

//Default
activateDefaultSection()
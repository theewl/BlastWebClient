//const settings = require('electron-settings')

document.body.addEventListener('click', (event) => {
    if (event.target.dataset.section) {
        handleSectionTrigger(event)
    }
})

function handleSectionTrigger (event) {
    hideAllSectionsAndDeselectButtons()

    // Highlight clicked button and show view
    event.target.classList.add('is-selected')
    // Display the current section
    const sectionId = `${event.target.dataset.section}-section`
    document.getElementById(sectionId).style.display = "block"
}

function activateDefaultSection () {
    document.getElementById('button-session-data').click()
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
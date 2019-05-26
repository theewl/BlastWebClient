// table.js
const settings = require('electron-settings')

// export allows us to invoke the function from elsewhere and pass in arguments
module.exports =
    {
        displaySessionData: function (result, fields, page) {
            let currentDate = ""
            let container, row1, col1, row2

            for (var i = 0; i < result.length; i++) {
                let timestamp = result[i]['TIMESTAMP'].split(" ")
                let date = timestamp[0]
                let time = timestamp[1]

                console.log(date)
                console.log(time)

                if(date != currentDate) // new row
                {
                    currentDate = date

                    container = createDiv("container-fluid")

                    // card header (timestamp)
                    heading = document.createElement("h2")
                    text = document.createTextNode(date)
                    heading.appendChild(text)
                    classAttr = document.createAttribute("class")
                    classAttr.value = "card-row-header"
                    heading.setAttributeNode(classAttr)

                    row1 = createDiv("row")
                    col1 = createDiv("col-md-12")
                    row2 = createDiv("row flex-nowrap")

                    //------------------------------------->

                    col2 = createDiv("col-md-3")
                    row3 = createDiv("row")
                    col3 = createDiv("col-md-12")

                    card = createTableFromDB(result[i], fields, time) // time is subject to change

                    col3.appendChild(card)
                    row3.appendChild(col3)
                    col2.appendChild(row3)

                    //------------------------------------>

                    row2.appendChild(col2)
                    col1.appendChild(row2)
                    row1.appendChild(col1)
                    container.appendChild(heading)
                    container.appendChild(row1)

                    document.getElementById(page).appendChild(container)
                }
                else // create a table and add it...
                {
                    console.log("same")
                    col2 = createDiv("col-md-3")
                    row3 = createDiv("row")
                    col3 = createDiv("col-md-12")

                    card = createTableFromDB(result[i], fields, time) // time is subject to change

                    col3.appendChild(card)
                    row3.appendChild(col3)
                    col2.appendChild(row3)

                    row2.appendChild(col2)
                    col1.appendChild(row2)
                    row1.appendChild(col1)
                    container.appendChild(row1)
                }

                /*container = createDiv("container")

                // card header (timestamp)
                heading = document.createElement("h2")
                text = document.createTextNode("Date")
                heading.appendChild(text)
                classAttr = document.createAttribute("class")
                classAttr.value = "card-row-header"
                heading.setAttributeNode(classAttr)

                row1 = createDiv("row")
                col1 = createDiv("col-md-12")
                row2 = createDiv("row")
                col2 = createDiv("col-md-3")
                row3 = createDiv("row")
                col3 = createDiv("col-md-12")

                card = createTableFromDB(result[i], fields, result[i].timestamp) // time is subject to change

                col3.appendChild(card)
                row3.appendChild(col3)
                col2.appendChild(row3)
                row2.appendChild(col2)
                col1.appendChild(row2)
                row1.appendChild(col1)
                container.appendChild(heading)
                container.appendChild(row1)

                document.getElementById(page).appendChild(container)*/
            }
        },
        displayCareerStats: function(result, page){
            switch(result.platform) {
                case 1:
                    platform = "xbox"
                    break;
                case 2:
                    platform = "ps4"
                    break;
                default:
                    platform = "pc"
            }

            container = createDiv("container")

            row1 = createDiv("row")
            col1 = createDiv("col-md-12")
            row2 = createDiv("row flex-row flex-nowrap")

            // all time
            col2 = createDiv("col-md-3")
            row3 = createDiv("row ")
            col3 = createDiv("col-md-12")
            allTime = {
                "ACCOUNT NAME": result.accountName,
                "PLATFORM": result.platform,
                "SCORE": result.score,
                "ELIMINATIONS": result.kills,
                "K/D RATIO": result.kd,
                "WINS": result.wins,
                "WIN RATIO": result.wr};
            card = createTable(result, allTime, "All-Time Statistics")
            col3.appendChild(card)
            row3.appendChild(col3)
            col2.appendChild(row3)
            row2.appendChild(col2)


            soloStats = {
                "SCORE": result.soloScore,
                "ELIMINATIONS": result.soloKills,
                "K/D RATIO": result.soloKd,
                "WINS": result.soloWins,
                "WIN RATIO": result.soloWr};

            // solo
            col2 = createDiv("col-md-3")
            row3 = createDiv("row")
            col3 = createDiv("col-md-12")
            card = createTable(result, soloStats,"solo")
            col3.appendChild(card)
            row3.appendChild(col3)
            col2.appendChild(row3)
            row2.appendChild(col2)

            duoStats = {
                "SCORE": result.duoScore,
                "ELIMINATIONS": result.duoKills,
                "K/D RATIO": result.duoKd,
                "WINS": result.duoWins,
                "WIN RATIO": result.duoWr};

            // duo
            col2 = createDiv("col-md-3")
            row3 = createDiv("row")
            col3 = createDiv("col-md-12")
            card = createTable(result, duoStats,"duo")
            col3.appendChild(card)
            row3.appendChild(col3)
            col2.appendChild(row3)
            row2.appendChild(col2)

            squadStats = {
                "SCORE": result.squadScore,
                "ELIMINATIONS": result.squadKills,
                "K/D RATIO": result.squadKd,
                "WINS": result.squadWins,
                "WIN RATIO": result.squadWr};

            // squad
            col2 = createDiv("col-md-3")
            row3 = createDiv("row")
            col3 = createDiv("col-md-12")
            card = createTable(result, squadStats,"squad")
            col3.appendChild(card)
            row3.appendChild(col3)
            col2.appendChild(row3)
            row2.appendChild(col2)

            col1.appendChild(row2)
            row1.appendChild(col1)
            container.appendChild(row1)

            document.getElementById(page).appendChild(container)
        }
    }

function createTable(result, fields, name){
    card = createDiv("card")

    card_head = createDiv("card-header")

    // p: card-header-heading
    inner_heading = document.createElement("p")
    text = document.createTextNode(name)
    inner_heading.appendChild(text)
    card_head.appendChild(inner_heading)
////////
    card_body = createDiv("card-body")

    row4 = createDiv("row")

    col4 = createDiv("col-md-6")

    col5 = createDiv("col-md-6 leftLine")

    console.log(fields)
    let i = 0
    for (var key in fields) {

        head = document.createElement("p")
        text = document.createTextNode(key)
        head.appendChild(text)

        body = document.createElement("p")
        text = document.createTextNode(fields[key])
        body.appendChild(text)
        classAttr = document.createAttribute("class")
        classAttr.value = "data"
        body.setAttributeNode(classAttr)

        if(i < (Object.keys(fields).length)/2) {
            col4.appendChild(head)
            col4.appendChild(body)
        }
        else {
            col5.appendChild(head)
            col5.appendChild(body)
        }
        i = i + 1
    }

    //figure out a way to add images randomly (not difficult)

    row4.appendChild(col4)
    row4.appendChild(col5)
    card_body.appendChild(row4)
    card.appendChild(card_head)
    card.appendChild(card_body)

    return card
}

function createTableFromDB(result, fields, name) {
    card = createDiv("card")

    card_head = createDiv("card-header")

    // p: card-header-heading
    inner_heading = document.createElement("p")
    text = document.createTextNode(name)
    inner_heading.appendChild(text)
    card_head.appendChild(inner_heading)

    card_body = createDiv("card-body")

    row4 = createDiv("row")

    col4 = createDiv("col-md-6")

    // left column table entries
    // not taking timestamp into consideration (yet), which would determine how many tables per row
    // ideally we wouldn't have to copy/paste the for loop below
    //Doesnt work if odd # of fields
    for (let j = 0; j <= fields.length/2; j++)
    {
        let key = fields[j]['name']

        head = document.createElement("p")
        text = document.createTextNode(key)
        head.appendChild(text)

        body = document.createElement("p")
        text = document.createTextNode(result[key])
        body.appendChild(text)
        classAttr = document.createAttribute("class")
        classAttr.value = "data"
        body.setAttributeNode(classAttr)

        col4.appendChild(head)
        col4.appendChild(body)
    }

    col5 = createDiv("col-md-6 leftLine")

    // right column table entries
    for (let j = (fields.length / 2) + 1; j < fields.length; j++) {
        let key = fields[j]['name']

        head = document.createElement("p")
        text = document.createTextNode(key)
        head.appendChild(text)

        body = document.createElement("p")
        text = document.createTextNode(result[key])
        body.appendChild(text)
        classAttr = document.createAttribute("class")
        classAttr.value = "data"
        body.setAttributeNode(classAttr)

        col5.appendChild(head)
        col5.appendChild(body)
    }

    //f

    row4.appendChild(col4)
    row4.appendChild(col5)
    card_body.appendChild(row4)
    card.appendChild(card_head)
    card.appendChild(card_body)

    return card
}

function createDiv(className) {
    // div: col-md-12
    const div = document.createElement("div")
    const classAttr = document.createAttribute("class")
    classAttr.value = className
    div.setAttributeNode(classAttr)
    return div
}
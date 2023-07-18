const usersAvailableDays = [
    {
        id: 1,
        name: "Guilherme Tinen Ortolani",
        team: "Javascript Developers",
        availableDates: [
            "07-18-2023"
        ],
    },
    {
        id: 2,
        name: "Guilherme Tinen Ortolani 2",
        team: "Javascript Developers",
        availableDates: [
            "07-20-2023",
            "08-21-2023"
        ],
    },
    {
        id: 3,
        name: "Guilherme Tinen Ortolani 3",
        team: "Javascript Developers",
        availableDates: [
            
        ],
    }
]

let actualDate = new Date();
let actualMonth = actualDate.getMonth() + 1;
let actualYear = actualDate.getFullYear();
let numberOfDays = new Date(actualYear, actualMonth, 0).getDate();

const buildTable = () => {
    buildTableControllers()
    buildTableHeader()
    buildTableBody()
}

const buildTableControllers = () => {
    const nDate = new Date(actualYear, actualMonth-1, 1)
    $('#selectedDate').text(`${nDate.toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}`)
}

const buildTableHeader = () => {
    const tb = $('table#tb_horas_diponiveis')
    $('table#tb_horas_diponiveis thead').remove('thead')
    const thead = document.createElement("thead")
    const tr = document.createElement("tr")

    for(key in [...Array(2).keys()]) {
        const th = document.createElement('th')
        th.innerText = key == 0 ? 'Membro da equipe' : key == 1 ? 'Time' : ''
        tr.append(th)
    }

    for(key in [...Array(numberOfDays).keys()]) {
        const th = document.createElement('th')
        th.innerText = `${parseInt(key)+1}`
        th.classList.add("monthDay")
        tr.append(th)
    }
    thead.append(tr)
    tb.append(thead)
}

const buildTableBody = () => {
    const tb = $('table#tb_horas_diponiveis')
    $('table#tb_horas_diponiveis tbody').remove()
    const tbody = document.createElement("tbody")

    usersAvailableDays.forEach(user => {
        const tr = document.createElement("tr")

        const availableDays = handleDaysOfMonthUserIsAvailable(user,actualMonth,actualYear)
        const weekends = handleMonthWeekends()
        

        // APPEND MEMBER NAME AND MEMBER TEAM 
        for(key of Object.keys(user)) {
            if(key === 'name' || key === 'team') {
                const td = document.createElement('td')
                td.innerText = `${user[key] ?? '-'}`
                tr.append(td)
            }
        }

        // APPEND ALL DAYS 
        for(key in [...Array(numberOfDays).keys()]) {
            const td = document.createElement('td')
            const availableInThisDay = availableDays.indexOf((parseInt(key)+1)) > -1
            td.innerText = availableInThisDay ? 'D' : `F`
            if(weekends.indexOf(parseInt(key)+1) > -1) {
                td.classList.add("weekend")
            }
            if(availableInThisDay) {
                td.classList.add("available")
            }else {
                td.classList.add("not-available")
            }
            tr.append(td)
        }
        
        tbody.append(tr)
        tb.append(tbody)
    })
}

const handleDaysOfMonthUserIsAvailable = (user,month,year) => {
    if(!user||!month||!year) {
        return []
    }

    if(!user.availableDates.length) return []

    const userAvailableDays = user.availableDates ?? []
    
    return userAvailableDays.map(dt=>{
        const dtAux = new Date(dt)
        if(dtAux.getFullYear()!==year) return undefined
        if(dtAux.getMonth()+1!==month) return undefined
        return dtAux.getDate()
    }).filter(dt=>dt)
    
}

const handleMonthWeekends = () => {
    const weekends = []

    for(day in [...Array(numberOfDays).keys()]) {
        const dt = new Date(actualYear,actualMonth-1,(parseInt(day)+1))
        if (dt.getDay() == 0 || dt.getDay() == 6) {
            weekends.push(parseInt(day)+1)
        }
    }
    return weekends
}

const handleActualMonth = (action) => {
    if(action==='next') {

        if(actualMonth===11) {
            actualYear++
            actualMonth = 1
            numberOfDays = new Date(actualYear, actualMonth, 0).getDate();
            buildTable()
            return
        }
    
        actualMonth++
        numberOfDays = new Date(actualYear, actualMonth, 0).getDate();
    } else if(action==='prev') {
        if(actualMonth===1) {
            actualYear--
            actualMonth = 12
            numberOfDays = new Date(actualYear, actualMonth, 0).getDate();
            buildTable()
            return
        }
    
        actualMonth--
        numberOfDays = new Date(actualYear, actualMonth, 0).getDate();
    }

    buildTable()
    
}


buildTable()
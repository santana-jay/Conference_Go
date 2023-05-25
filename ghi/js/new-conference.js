window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/'

    try{
        const response = await fetch(url)

        if(response.ok){
            const data = await response.json()
            const selectTag = document.getElementById('location')

            for(let i in data.locations){
                const location = data.locations[i]
                const option = document.createElement('option')
                option.value = location.id
                option.innerHTML = location.name

                selectTag.appendChild(option)
            }

        }else{
            throw new Error('Error fetching locations')
        }
    }catch(e){
        console.log("errorrr",e)
    }

    const formTag = document.getElementById('create-conference-form')
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))
        const conferenceUrl = "http://localhost:8000/api/conferences/"
        const fetchConfig = {
            method: 'post',
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response = await fetch(conferenceUrl, fetchConfig)
            if(response.ok){
                formTag.reset()
                const newConference = await response.json()
            }
        }catch(e){
            console.log('Error creating location', e)
        }
    })
})

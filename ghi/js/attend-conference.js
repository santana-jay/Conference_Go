window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const errorMessageElement = document.getElementById('error-message')

    const url = 'http://localhost:8000/api/conferences/';

    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
            }

            const loadingSpinner = document.getElementById('loading-conference-spinner')
            loadingSpinner.classList.add('d-none')
            selectTag.classList.remove('d-none')

        }else{
            throw new Error('Failed to fetch data')
        }

    }catch(e){
        console.log('Error fetching conference',(e))
        errorMessageElement.textContent = 'There was an error loading the conference data. Please try again later.'
        errorMessageElement.classList.remove('d-none')
    }

    const formTag = document.getElementById('create-attendee-form')
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData))

        const attendeeUrl = 'http://localhost:8001/api/attendees/'
        const fetchConfig = {
            method: 'post',
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try{
            const response = await fetch(attendeeUrl, fetchConfig)
            if(response.ok){
                const successTag = document.getElementById('success-message')
                successTag.classList.remove('d-none')
                formTag.classList.add('d-none')
                selectTag.classList.add('d-none')
            }
        }catch(e){
            // Display an error message
        }

    })
});

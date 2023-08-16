window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    const selectTag = document.getElementById('conference');

    try{
        const response = await fetch(url);

        if (response.ok) {
        const data = await response.json();

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.id;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }
    }
    }catch(e){
        console.log(e);
    }


    const formTag = document.getElementById('create-presentation-form');

    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const conferenceId = selectTag.selectedIndex;

        console.log("conference id",conferenceId);
        const locationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try{
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newConference = await response.json();
                console.log(newConference);
            }
        }catch(e){
            console.log(e);
        }
    });
});

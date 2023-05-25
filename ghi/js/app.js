function createCard(name, description, pictureUrl, startDate, endDate, location){

    const formattedStartDate = new Date(startDate).toLocaleDateString("en-US");
    const formattedEndDate = new Date(endDate).toLocaleDateString("en-US");

    return `
    <div class="card shadow">
        <img src="${pictureUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
            <p class="card-date">${formattedStartDate}-${formattedEndDate}</p>
        </div>
    </div>
    `
}



window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
        // Figure out what to do when the response is bad
        throw new Error('Error fetching conference data')
        } else {
        const data = await response.json();



        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const startDate = details.conference.starts
                const endDate = details.conference.ends
                const location = details.conference.location.name
                const html = createCard(title, description, pictureUrl, startDate, endDate, location);
                // const column = document.querySelector('.row')
                const columnContainer = document.querySelector('.row-cols-3');
                columnContainer.innerHTML += html
            }
        }

        }
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('alert', 'alert-danger');
        errorMessage.textContent = 'error occurred while fetching conference details.';
        document.body.insertBefore(errorMessage, document.body.firstChild);
    }

});















// This was on line 24
//     const conference = data.conferences[0];
        //     const nameTag = document.querySelector('.card-title');
        //     nameTag.innerHTML = conference.name;

        //     const detailUrl = `http://localhost:8000${conference.href}`;
        //     const detailResponse = await fetch(detailUrl);

        //     if(detailResponse.ok){
        //         const dataDetails = await detailResponse.json();
        //         const detailTag = document.querySelector('.card-text')
        //         const imageTag = document.querySelector('.card-img-top')
        //         imageTag.src = dataDetails.conference.location.picture_url;
        //         detailTag.innerHTML = dataDetails.conference.description;

        //         console.log('details:', dataDetails);
        //     }else {
        //         console.log('there was an issue with your detail request big guy');

        //     }

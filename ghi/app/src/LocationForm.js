import React, {useEffect, useState} from 'react'

export default function LocationForm(props) {
    const [states, setStates] = useState([]);
    const [name, setName] = useState('')
    const [roomCount, setRoomCount] = useState('')
    const [city, setCity] = useState('')
    const [state, setSelectedState] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleRoomCount = (event)=>{
        const value = event.target.value
        setRoomCount(value)
    }

    const handleSetCity = (event) =>{
        setCity(event.target.value)
    }

    const handleStateChange = (event) => {
        setSelectedState(event.target.value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        // create an empty json object
        const data = {}
        data.room_count = roomCount
        data.name = name
        data.city = city
        data.state = state

        console.log(data)

        const locationUrl = 'http://localhost:8000/api/locations/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(locationUrl, fetchConfig)
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation)

            setName('');
            setRoomCount('');
            setCity('');
            setSelectedState('');
        }
    }


    const fetchData = async () => {
        const locationUrl = 'http://localhost:8000/api/states/'

        const response = await fetch(locationUrl)

        if (response.ok){
            const data = await response.json()
            // console.log(data)
            setStates(data.states)
        }else{
            console.error(response)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    // console.log('states:', states)

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={roomCount} onChange={handleRoomCount} placeholder="Room count" required type="number" name="room_count" id="room_count" className="form-control"/>
                                <label htmlFor="room_count">Room count</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={city} onChange={handleSetCity} placeholder="City" required type="text" name="city" id="city" className="form-control"/>
                                <label htmlFor="city">City</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleStateChange} value={state} required id="state" name="state" className="form-select">
                                <option value=''>Choose a state</option>
                                {states.map((state) => {
                                    return (
                                        <option value={state.abbreviation} key={state.abbreviation}>
                                            {state.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

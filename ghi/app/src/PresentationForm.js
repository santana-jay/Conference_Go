import React, { useEffect, useState } from 'react'

export default function PresentationForm() {

    const [conferences, setConferences] = useState([])

    const [formData, setFormData] = useState({
        presenter_name: '',
        presenter_email: '',
        company_name: '',
        title: '',
        synopsis: '',
        conference: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setConferences(data.conferences)
        }
    }
    // console.log('conferences:',conferences)
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = `http://localhost:8000/api/conferences/${formData.conference}/presentations/`

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log('submitting form data:', formData)
        const response = await fetch(url, fetchConfig)

        try{
            if(response.ok){
                response.json().then(() => {
                    setFormData({
                        presenter_name: '',
                        presenter_email: '',
                        company_name: '',
                        title: '',
                        synopsis: '',
                        conference: '',
                    })
                })
            }
        }catch(e){
            console.error('Failed to post data:', e)
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name

        console.log(`Changing ${inputName} to ${value}`);

        setFormData({
            ...formData,
            [inputName]: value
        })

    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new presentation</h1>
                    <form onSubmit={handleSubmit} id="create-presentation-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                                <label htmlFor="presenter_name">Presenter name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                                <label htmlFor="presenter_email">Presenter email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"/>
                                <label htmlFor="company_name">Company name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                                <label htmlFor="title">Title</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="synopsis">Synopsis</label>
                            <textarea onChange={handleFormChange} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleFormChange} required name="conference" id="conference" className="form-select">
                                <option value="">Choose a conference</option>
                                {conferences.map( (conference) =>{
                                    let conferenceId = conference.href.split('/').filter(Number).pop()
                                    return (
                                        <option key={conference.href} value={conferenceId}>{conference.name}</option>
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

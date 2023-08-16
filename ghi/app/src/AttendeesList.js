import React from 'react'

export default function AttendeesList(props) {
    const { attendees } = props

    return (

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Conference</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <tr key={attendee.href}>
                                <td>{attendee.name}</td>
                                <td>{attendee.conference}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

    )
}

{filteredAppointments.length > 0
    ? filteredAppointments.map((appointment) => (
        <tr key={appointment.id}>
            <td>{appointment.vin}</td>
            <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
            <td>{appointment.customer}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
            <td>{appointment.reason}</td>
            <td>{appointment.status}</td>
        </tr>
    ))
    : appointments.map((appointment) => (
        <tr key={appointment.id}>
            <td>{appointment.vin}</td>
            <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
            <td>{appointment.reason}</td>
            <td>{appointment.status}</td>
        </tr>
    ))}

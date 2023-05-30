// Get the cookie out of the cookie store
const payloadCookie = cookieStore.get('jwt_access_payload')// FINISH THIS
console.log('payloadcookie:',payloadCookie)
if (payloadCookie && payloadCookie.value) {
  try{
    // The cookie value is a JSON-formatted string, so parse it
    const encodedPayload = JSON.parse(payloadCookie.value);
    console.log('encodedPayload:', encodedPayload)

    // Convert the encoded payload from base64 to normal string
    const decodedPayload = atob(encodedPayload)// FINISH THIS
    console.log('decoded:',decodedPayload)

    // The payload is a JSON-formatted string, so parse it
    const payload = JSON.parse(decodedPayload)// FINISH THIS

    // Print the payload
    console.log("Payload:",payload);

    // Check if "events.add_conference" is in the permissions.
    // If it is, remove 'd-none' from the link
    if(payload.permissions.includes('events.add_conference')){
      document.getElementById('addConferenceLink').classList.remove('d-none')
    }


    // Check if "events.add_location" is in the permissions.
    // If it is, remove 'd-none' from the link
    if(payload.permissions.includes('events.add_location')){
      document.getElementById('addLocationLink').classList.remove('d-none')
    }
  }catch(e){
    console.error('Error parsing payload')
  }
}

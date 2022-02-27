import React from 'react'

const userDetails = ({user}) => {
    if (typeof user?.uid == "undefined"){
        return (
        <div><h3>No user logged in!</h3></div>)}
    else if (typeof user?.uid == "string")
    {return (
    <div>
        <h3>User Logged in!</h3>
        <p>{user?.uid}</p>
        <p>{user?.email}</p>
        <p>Name: {user?.name}</p>
        <p>Age: {user?.age}</p>
    </div>
  )}
}

export default userDetails
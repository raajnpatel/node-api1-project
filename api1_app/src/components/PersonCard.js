import React from 'react';

const PersonCard = ({person, deletePerson}) => {
    return (
        <div>
            <p>ID: {person.id}</p>
            <h2>Name: {person.name}</h2>
            <h3>Bio: {person.bio}</h3>
            <br/>
            <button onClick={() => deletePerson(person.id)}>Delete</button>
            <br/><br/>
        </div>
    )
};

export default PersonCard;
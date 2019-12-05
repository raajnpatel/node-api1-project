import React from 'react';

const PersonCard = ({person, deletePerson, editPerson}) => {
    return (
        <div>
            <p>ID: {person.id}</p>
            <h2>Name: {person.name}</h2>
            <h3>Bio: {person.bio}</h3>
            <br/>
            <button onClick={() => editPerson(person.id)}>Edit</button>
            <button onClick={() => deletePerson(person.id)}>Delete</button>
            <br/><br/>
        </div>
    )
};

export default PersonCard;

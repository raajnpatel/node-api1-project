import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonCard from "./PersonCard";

const PersonList = () => {
    const [personList, setPersonList] = useState([]);
    const [person, setPerson] = useState({name:"", bio:""});
    useEffect(() => {
        axios
            .get(`http://localhost:4444/api/users`)
            .then(res => {
                console.log(res.data);
                setPersonList(res.data);
            })
            .catch(error => console.log(error.response));
    }, []);

    const addPerson = person => {
        axios
            .post('http://localhost:4444/api/users', person)
            .then(res => console.log(res) || setPersonList(res.data))
            .catch(err => console.log(err.response));
    };

    const deletePerson = id => {
        window.location.reload(true);
        axios
            .delete(`http://localhost:4444/api/users/${id}`)
            .then(res => console.log(res) || setPersonList(res.data))
            .catch(err => console.log(err.response));
    };

    const handleChange = e => setPerson({...person, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        addPerson(person);
        window.location.reload(true);
    };

    return(
        <div>
            <div className="addToList">
                <form onSubmit={handleSubmit}>
                    <input
                    name = "name"
                    placeholder="name"
                    value={person.name}
                    onChange={handleChange}
                />
                    <input
                        name = "bio"
                        placeholder="bio"
                        value={person.bio}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Person</button>
                </form>
            </div>

            <h1>The List</h1>
            {personList.map(person => {
                return(
                    <div>
                        <PersonCard
                            key={person.id}
                            person={person}
                            deletePerson={deletePerson}
                        />
                    </div>
                )
            })
            }
        </div>
    )
};

export default PersonList;
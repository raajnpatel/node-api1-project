import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, TextArea} from "semantic-ui-react";

const AddPerson = (addPerson) => {
    const [person, setPerson] = useState({name:"", bio:""});

    const handleChange = e => setPerson({...person, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        addPerson(person);
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
                    <Form>
                      <TextArea
                          name = "bio"
                          placeholder="bio"
                          value={person.bio}
                          onChange={handleChange}
                      />
                    </Form>
                    <button type="submit">Add Person</button>
                </form>
            </div>
        </div>
    )
};

export default AddPerson;

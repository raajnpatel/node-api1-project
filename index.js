const  express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

const port = 4444;
server.listen(port, () => console.log(`\n** API running on port ${port} **\n`));

server.get('/', (req, res) => {
    res.send({api:'up and running'});
});

// **** /api/users ****

server.get(`/api/users`, (req, res) => {
    db.find()
        .then(users =>{
            res
                .status(200)
                .json(users)
        })
        .catch( error => {
                console.log('error on GET', error);
                res
                    .status(500)
                    .json({error:"The users information could not be retrieved."})
            }
        )
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    console.log(req.body);
    if(!name || !bio) {
        res
            .status(400)
            .json({errorMessage:"Please provide name and bio for the user."})
    }
    db.insert({name, bio})
        .then(idObj =>
            db.findById(idObj)
                .then(user => {
                    res
                        .status(201)
                        .json(user)
                })
            .catch(error => {
                console.log('error on POST', error);
                res
                    .status(500)
                    .json({error:"There was an error while saving the user to the database"});
            }))
    });

// **** /api/users ****


// **** /api/users/:id ****

server.get(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then( user => {
            // console.log(user);
            if(user) {
                res
                    .status(200)
                    .json(user)
            } else {
                res
                    .status(404)
                    .json({error:"The user with the specified ID does not exist."})
            }
        })
        .catch( error => {
            console.log('error on GET by ID', error);
                res
                    .status(500)
                    .json({error: "The user information could not be retrieved."})
        })
});

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if(!name && !bio){
        res
            .status(400)
            .json({error:"Please provide name and bio for the user."})
    }
    db.update(id, { name, bio })
        .then(updated => {
            if(updated) {
                db.findById(id)
                    .then(user => res
                        .status(200)
                        .json(user))
                    .catch(error => {
                        console.log(error);
                        res
                            .status(500)
                            .json({error: "The user information could not be modified."})
                    })
            } else {
                res
                    .status(404)
                    .json({message:"The user with the specified ID does not exist."})
            }
        })
});

server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deleted => {
            if(deleted) {
                res
                    .status(204)
                    .end()
            } else {
                res
                    .status(404)
                    .json({message:"The user with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({error:"The user could not be removed"})
            }
        )
});

// **** /api/users/:id ****

const  express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

const port = 4444;
server.listen(port, () => console.log(`\n** API running on port ${port} **\n`));

server.get('/', (req, res) => {
    res.send({api:'up and running'});
});

// GET
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

server.get(`/api/users/:id`, (req, res) => {
    const id = req.params.id;
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
                    .json({error: "The user information could not be retrieved."});
        })
});
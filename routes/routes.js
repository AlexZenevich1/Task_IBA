
   
   const router = app => {
        app.get('/', (request, response) => {
            response.sendfile('index.html');
        });
       // Display all users
        app.get('/users', (request, response) => {
            pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
 
        response.send(result);
    });

});
    // Add a new user
app.post('/users', (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
        if (error) throw error;
 
        response.status(201).send(`User added with ID: ${result.insertId}`);
  
});
});
app.get('/users/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});
};

    

// Export the router
module.exports = router;

const pool = require('../data/config');

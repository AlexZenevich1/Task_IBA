var userSession;

const router = (app) => {
  app.get("/", (request, response) => {
    userSession = request.session;
    if (userSession.username) { 
      response.sendfile("views/index.html");
    } else {
      response.redirect("/authorization");
    }
  });

  app.get("/registration", (request, response) => {
    response.sendfile("views/registration.html");
  });
  app.get("/error", (request, response) => {
    response.sendfile("views/error.html");
  });
  app.get("/delete", (request, response) => {
    userSession = request.session;
    // console.log(userSession.username=='YES')
    if (userSession.username=='YES') { 
      response.sendfile("views/delete.html");
    } else if (userSession.username) { 
        response.redirect("/error");
      }
     else{ 
      response.redirect("/");
    }
  });
  
  app.get("/select", (request, response) => {
    userSession = request.session;
    if (userSession.username) { 
      response.sendfile("views/select.html");
    } else {
      response.redirect("/");
    }
  });
  
  app.get("/update", (request, response) => {
    userSession = request.session;
    // console.log(userSession.username=='YES')
    if (userSession.username=='YES') { 
      response.sendfile("views/update.html");
    } else if (userSession.username) { 
        response.redirect("/error");
      }
     else{ 
      response.redirect("/");
    }
  });
  
  app.get("/insert", (request, response) => {
    userSession = request.session;
    // console.log(userSession.username=='YES')
    if (userSession.username=='YES') { 
      response.sendfile("views/insert.html");
    } else if (userSession.username) { 
        response.redirect("/error");
      }
     else{ 
      response.redirect("/");
    }
  });
  
  app.get("/authorization", (request, response) => {
    response.sendfile("views/authorization.html");
  });
  app.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });
  // Display all users
  app.get("/users", (request, response) => {
    pool.query("SELECT * FROM users", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });
  app.get("/reg_users", (request, response) => {
    pool.query("SELECT * FROM registration", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });
  app.post("/authorization", (request, response) => {
    const gg = [request.body.userName, request.body.password];
    // console.log(request.body.userName);
    // console.log(request);
    pool.query(
      "SELECT adminRoutes FROM registration where userName=? and password=?",
      gg,
      (error, result, fields) => {
        if (error) throw error;
        else if (result.length > 0) {
          userSession = request.session;
          result.forEach( (result) => {
            userSession.username = result.adminRoutes;
          });
          response.redirect("/");
        } else {
          response.send('incorrect data, plz go back');
        }

        // response.send(result);
      }
    );
  });
  app.post("/reg_users", (request, response) => {
    pool.query(
      "INSERT INTO registration SET ?",
      request.body,
      (error, result) => {
        if (error) throw error;

        response.status(201).redirect(`/`);
      }
    );
  });
  // Add a new user
  app.post("/users/insert", (request, response) => {
    pool.query("INSERT INTO users SET ?", request.body, (error, result) => {
      if (error) throw error;

      response.status(201).redirect(`/users`);
    });
  });
 app.post("/users/select", (request, response) => {
      
    if(request.body.name.length>=1 && request.body.email.length>=1){
      const selec=[request.body.name, request.body.email];
  pool.query("Select * from users where name=? and email=?", selec, (error, result) => {
    if (error) throw error;
  
    response.send(result);
  });}
 else if(request.body.name.length>=1 && request.body.email.length<1){
      pool.query("Select * from users where name=?", request.body.name, (error, result) => {
        if (error) throw error;
      
        response.send(result);
      });}
    else  if(request.body.name.length<1 && request.body.email.length>=1){
          pool.query("Select * from users where email=?", request.body.email, (error, result) => {
            if (error) throw error;
          
            response.send(result);
          });}
         else if(request.body.name.length<1 && request.body.email.length<1){
               response.status(201).send(`ERROR`);
              ;}
});  app.post("/users/update", (request, response) => {
    if(request.body.new_name.length>=1 && request.body.new_email.length>=1 && request.body.old_name.length>=1 && request.body.old_email.length>=1){
        const update=[request.body.new_name, request.body.new_email,request.body.old_name,request.body.old_email];
    pool.query("UPDATE users SET name=?, email=? WHERE name=? and email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length<1 && request.body.new_email.length>=1 && request.body.old_name.length>=1 && request.body.old_email.length>=1){
        const update=[ request.body.new_email,request.body.old_name,request.body.old_email];
    pool.query("UPDATE users SET email=? WHERE name=? and email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length>=1 && request.body.new_email.length<1 && request.body.old_name.length>=1 && request.body.old_email.length>=1){
        const update=[request.body.new_name,request.body.old_name,request.body.old_email];
    pool.query("UPDATE users SET name=? WHERE name=? and email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length>=1 && request.body.new_email.length>=1 && request.body.old_name.length<1 && request.body.old_email.length>=1){
        const update=[request.body.new_name, request.body.new_email,request.body.old_email];
    pool.query("UPDATE users SET name=?, email=? WHERE email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length>=1 && request.body.new_email.length>=1 && request.body.old_name.length>=1 && request.body.old_email.length<1){
        const update=[request.body.new_name, request.body.new_email,request.body.old_name];
    pool.query("UPDATE users SET name=?, email=? WHERE name=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length>=1 && request.body.new_email.length>=1 && request.body.old_name.length<1 && request.body.old_email.length<1){
        const update=[request.body.new_name, request.body.new_email];
    pool.query("UPDATE users SET name=?, email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length>=1 && request.body.new_email.length<1 && request.body.old_name.length<1 && request.body.old_email.length<1){
        const update=[request.body.new_name];
    pool.query("UPDATE users SET name=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length<1 && request.body.new_email.length>=1 && request.body.old_name.length<1 && request.body.old_email.length<1){
        const update=[request.body.new_email];
    pool.query("UPDATE users SET email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length<1 && request.body.new_email.length>=1 && request.body.old_name.length>=1 && request.body.old_email.length<1){
        const update=[request.body.new_email, request.body.old_name];
    pool.query("UPDATE users SET email=? where name=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length>=1 && request.body.new_email.length<1 && request.body.old_name.length<1 && request.body.old_email.length>=1){
        const update=[request.body.new_name, request.body.old_email];
    pool.query("UPDATE users SET name=? where email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length<1 && request.body.new_email.length>=1 && request.body.old_name.length<1 && request.body.old_email.length>=1){
        const update=[request.body.new_email, request.body.old_email];
    pool.query("UPDATE users SET email=? where email=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
    if(request.body.new_name.length>=1 && request.body.new_email.length<1 && request.body.old_name.length>=1 && request.body.old_email.length<1){
        const update=[request.body.new_name, request.body.old_name];
    pool.query("UPDATE users SET name=? where name=?", update, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
       if(request.body.new_name.length<1 && request.body.new_email.length<1){
        response.status(201).send(`ERROR`);
        ;}
});
  app.post("/users/delete", (request, response) => {
      
      if(request.body.name.length>=1 && request.body.email.length>=1){
        const delet=[request.body.name, request.body.email];
    pool.query("Delete from users where name=? and email=?", delet, (error, result) => {
      if (error) throw error;
    
      response.status(201).redirect(`/users`);
    });}
   else if(request.body.name.length>=1 && request.body.email.length<1){
        pool.query("Delete from users where name=?", request.body.name, (error, result) => {
          if (error) throw error;
        
          response.status(201).redirect(`/users`);
        });}
      else  if(request.body.name.length<1 && request.body.email.length>=1){
            pool.query("Delete from users where email=?", request.body.email, (error, result) => {
              if (error) throw error;
            
              response.status(201).redirect(`/users`);
            });}
           else if(request.body.name.length<1 && request.body.email.length<1){
                 response.status(201).send(`ERROR`);
                ;}
  });
  app.get("/users/:id", (request, response) => {
    const id = request.params.id;

    pool.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });
};

// Export the router
module.exports = router;

const pool = require("../data/config");

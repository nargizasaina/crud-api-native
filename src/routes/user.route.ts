import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import {v4 as uuidv4, validate} from 'uuid';
import { User, users } from '../models/user';

export const userRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const parsed = parse(req.url || '', true);
  const {pathname} = parsed;

  if (pathname?.startsWith('/api/users/') && req.method === 'GET') {
    const id = pathname.split('/').pop();
    if (!id || !validate(id)) {
      res.statusCode = 400;
      return res.end('User id is invalid');
    }
   
    const user = users.find(user => user.id === id);

    if (user) {
      res.statusCode = 200;
      return res.end(JSON.stringify(user));
    } else {
      res.statusCode = 404;
      return res.end('User not found');
    }
  } else if (pathname === '/api/users' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(users));
  } else if (pathname === '/api/users' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        const { username, age, hobbies } = parsedBody;

        if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
          res.statusCode = 400;
          return res.end("Please fill in all required fields!");
        }

        const invalidHobby = hobbies.length > 0 && hobbies.some(hobby => typeof hobby !== 'string');
        if (invalidHobby) {
          res.statusCode = 400;
          return res.end("All hobbies should be of type string");
        }

        const user:User = {
          id: uuidv4(),
          username, age, hobbies
        };

        users.push(user);
        res.statusCode = 201;
        const responseBody = {
          message: "User created successfully",
          user: {
            id: user.id,
            username: user.username,
            age: user.age,
            hobbies: user.hobbies,
          }
        };
        return res.end(JSON.stringify(responseBody, null, 2));
        
      } catch (error) {
        res.statusCode = 500;
        res.end("Server error");
      }
    })
  } else if (pathname?.startsWith('/api/users/') && req.method === 'PUT') {
    const id = pathname.split('/').pop();
    if (!id || !validate(id)) {
      res.statusCode = 400;
      return res.end('User id is invalid');
    }
   
    const userInd = users.findIndex(user => user.id === id);

    if (userInd === -1) {
      res.statusCode = 404;
      return res.end('User not found'); 
    }
    
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        const { username, age, hobbies } = parsedBody;

        if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
          res.statusCode = 400;
          return res.end("Please fill in all required fields!");
        }

        const invalidHobby = hobbies.length > 0 && hobbies.some(hobby => typeof hobby !== 'string');
        if (invalidHobby) {
          res.statusCode = 400;
          return res.end("All hobbies should be of type string");
        }

        const editedUser:User = {
          ...users[userInd],
          username, age, hobbies
        };

        users[userInd] = editedUser;
        res.statusCode = 200;
        const responseBody = {
          message: "User updated successfully",
          user: {
            id: editedUser.id,
            username: editedUser.username,
            age: editedUser.age,
            hobbies: editedUser.hobbies,
          }
        };
        return res.end(JSON.stringify(responseBody, null, 2));
        
      } catch (error) {
        res.statusCode = 500;
        res.end("Server error");
      }
    })
  } else if (pathname?.startsWith('/api/users/') && req.method === 'DELETE') {
    const id = pathname.split('/').pop();
    if (!id || !validate(id)) {
      res.statusCode = 400;
      return res.end('User id is invalid');
    }
   
    const userInd = users.findIndex(user => user.id === id);

    if (userInd === -1) {
      res.statusCode = 404;
      return res.end('User not found'); 
    }
    
    users.splice(userInd, 1);

    res.statusCode = 204;
    return res.end();
  } else {
    res.statusCode = 404;
    return res.end('Requested URL does not exist'); 
  }
};


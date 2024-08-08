import express from 'express'
import path from 'path'
import { dbConnection as db} from './config/index.js'

const app = express()
const port = +process.env.PORT || 4000
const router = express.Router()

app.use(router, 
    express.static('./static'),
    express.json(),
    express.urlencoded({
    extended: true
}))

router.get('^/$|/challengeMe', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
router.get('/Users', (req, res) => {
    try {
        const strQry = `
        SELECT userName, userSurname, userAge, userEmail
        FROM Users;
        `
        db.query(strQry, (err, results) => {
            if(err) throw new Error(err)
            res.json({
                status: res.statusCode,
                results
            })
        })
    }catch (e) {
        res.json({
            status:404,
            msg: e.message
        })
    }
})
router.get('/users/:id', (req, res) => {
    try {
        const strQry = `
        SELECT userID, userName, userSurname, userAge, userEmail
        FROM Users
        WHERE userID = ${req.params.id}
        `
        db.query(strQry, (err, results) => {
            if(err) throw new Error('Unable to fetch user')
                res.json({
                    status: res.statusCode,
                    results: results[0]
                })
        })
    } catch(e) {
        res.json({
            status:404,
            msg: e.message
        })
    }
})
router.post('/register', (req, res) => {
  const newUser = { id: userId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.patch('/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});
router.delete('/user/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});
router.get('/products', (req, res) => {
    try {
        const strQry = `
        SELECT prodName, prodQuantity, prodPrice, prodURL, userID
        FROM Users;
        `
        db.query(strQry, (err, results) => {
            if(err) throw new Error(err)
            res.json({
                status: res.statusCode,
                results
            })
        })
    }catch (e) {
        res.json({
            status:404,
            msg: e.message
        })
    }
})
router.get('/products/:id', (req, res) => {
    try {
        const strQry = `
        SELECT prodID, prodName, prodQuantity, prodPrice, prodURL, userID
        FROM Users
        WHERE userID = ${req.params.id}
        `
        db.query(strQry, (err, results) => {
            if(err) throw new Error('Unable to fetch products')
                res.json({
                    status: res.statusCode,
                    results: results[0]
                })
        })
    } catch(e) {
        res.json({
            status:404,
            msg: e.message
        })
    }
})
router.post('/addProduct', (req, res) => {
  const addToProducts = { id: prodID++, ...req.body };
  products.push(addToProducts);
  res.status(201).json(addToProducts);
});
router.patch('/products/:id', (req, res) => {
  const products = products.find(p => p.id === parseInt(req.params.id));
  if (products) {
    Object.assign(products, req.body);
    res.json(products);
  } else {
    res.status(404).send('PIssue fetching products');
  }
});
router.delete('/products/:id', (req, res) => {
  const prodID = products.findIndex(p => p.id === parseInt(req.params.id));
  if (prodID > -1) {
    products.splice(prodID, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

router.get('*', (req, res) => {
    res.json({
        status: 404,
        msg: 'Resource not found'
})
})
app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
})
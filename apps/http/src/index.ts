import express from 'express';
import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { CreateUserSchema, SignInSchema } from '@repo/common-frontend/config';
const app = express();

app.post('/signup', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
});

app.post("/signin", (req, res) => {
  const userId=1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.send(token);

});

app.post("/room",middleware,(req,res)=>{
//db call
res.json({
  "roomId": 1
})
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
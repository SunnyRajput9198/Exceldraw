import express from 'express';
import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { CreateUserSchema, SignInSchema } from '@repo/common-frontend/config';
import { prisma } from '@repo/db/client';
const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
   const parsedData = CreateUserSchema.safeParse(req.body);
   console.log("parsedData", parsedData);
    if (!parsedData.success) {
        console.log(parsedData.error);
        console.log(parsedData.error)
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: parsedData.data?.username,
                // TODO: Hash the pw
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
});

app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    // TODO: Compare the hashed pws here
    const user = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        token
    })

});

app.post("/room",middleware,(req,res)=>{
//db call
res.json({
  "roomId": 1
})
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
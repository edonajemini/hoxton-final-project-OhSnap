import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const JWT_SECRET = process.env.JWT_SECRET!;

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

function generateToken(id: number) {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
}



async function getCurrentUser(token: string) {
  const decodedData = jwt.verify(token, JWT_SECRET);
  const userPremium = await prisma.userPremium.findUnique({
    where: {
      // @ts-ignore
      id: Number(decodedData.id),
    },
    include: {
      blog: true,
    },
  });
  return userPremium;
}


app.post("/signup", async (req, res) => {
  try {
    const userPremium = await prisma.userPremium.findUnique({
      where: {email:req.body.email},
    });
    if (userPremium) {
      return res.status(401).send({ message: "User already exists" });
    } else {
      const newUser = await prisma.userPremium.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 10),
          
        },
        include: {
          blog: true,
          reviews:true,
          emoji:true
        },
      });
      const token = generateToken(newUser.id);
      res.send({newUser, token});
    }
  } catch (error) {
    //@ts-ignore
    res.status(451).send({ error: error.message });
  }
});

//log-in user
app.post("/login", async (req, res) => {
 
  const existingUser = await prisma.userPremium.findUnique({
    where: { email: req.body.email },
  });

  if (existingUser && bcrypt.compareSync(req.body.password, existingUser.password)) {
    const token = generateToken(existingUser.id);
    res.send({ existingUser, token });

  } else {
    res.status(401).send({ message: "Invalid credentials." });
  }
});

//Get/validate the current user
app.get("/validate", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({ error: "You are not signed in!" });
    } else {
      const userPremium = await getCurrentUser(token);
      if (userPremium) {
        res.send({ userPremium, token: generateToken(userPremium.id) });
      } else {
        res.status(400).send({ error: "Please try to sign in again!" });
      }
    }
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});

//Get all BLOGS searched by tittle
app.get("/blogs/blog/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const blogs = await prisma.blog.findMany({
      where: { title: { contains: title } },
      include: { reviews: true, userPremium: true },
    });

    res.send(blogs);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});
//Get all BLOGS filtered by category
app.get("/blogs/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const blogs = await prisma.blog.findMany({
      where: { category: category },
      include: { reviews: true },
    });

    res.send(blogs);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});
//saved blogs
app.get("/savedBlogs", async (req, res) => {
  const blogs = await prisma.blog.findMany({
    where: {
      saved: true,
    },
    include: { reviews: true, userPremium: true },
  });
  res.send(blogs);
})

//Get all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { reviews: true },
    });

    res.send(blogs);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});

//Get blog by id
app.get("/blog-detail/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
      include: { reviews: true },
    });

    res.send(blog);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});
//change the blog to saved
app.patch("/blogs/:id", async (req, res) => {
  try {
  const blog = await prisma.blog.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      saved: req.body.saved
    }
  })
  res.send(blog);
} catch (error) {
  // @ts-ignore
  res.status(404).send({ error: error.message });
}
})
//Get users by id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { reviews: true},
    });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found!" });
    }
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});


//Get userpremiums by id
app.get("/usersPremium/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userPremium = await prisma.userPremium.findUnique({
      where: { id: Number(id) },
      include: { reviews: true, blog: true },
    });
    if (userPremium) {
      res.send(userPremium);
    } else {
      res.status(404).send({ error: "UserPremium not found!" });
    }
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});
//Get userpremiums by name
app.get("/userpremium/userpremium/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const userpremium = await prisma.userPremium.findMany({
      where: { name: { contains: name } },
      include: { reviews: true, blog: true },
    });

    res.send(userpremium);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});

//Get all reviews for a blog
app.get("/blogs/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;

    const reviews = await prisma.review.findMany({
      where: { blogId: Number(id) },
      include: { userPremium: true, user: true },
    });

    res.send(reviews);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});

//Get all reviews for the current user
app.get("/user/reviews", async (req, res) => {
  try {
    // @ts-ignore
    const user = await getCurrentUser(req.headers.authorization);
    if (user) {
      const reviews = await prisma.review.findMany({
        where: { userId: user.id },
        include: { userPremium: true, user: true },
      });

      res.send(reviews);
    } else {
      res
        .status(401)
        .send({ error: "You need to be signed in to unlock this feature!" });
    }
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});
//Get all reviews for the current userPremium
app.get("/userPremium/reviews", async (req, res) => {
  try {
    // @ts-ignore
    const userPremium = await getCurrentUser(req.headers.authorization);
    if (userPremium) {
      const reviews = await prisma.review.findMany({
        where: { userPremiumId: userPremium.id },
        include: { user: true, userPremium: true },
      });

      res.send(reviews);
    } else {
      res
        .status(401)
        .send({ error: "You need to be signed in to unlock this feature!" });
    }
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});

// This endpoint will post a new blog 
app.post('/blogs', async (req, res)=>{
  const blog = {
    title :req.body.title,
    intro :req.body.intro,       
    image :req.body.image,
    video :req.body.video,
    blog: req.body.blog,
    userPremiumId: req.body.userPremiumId,
    saved:       false,
    liked:       false,
    createdAt:req.body.createdAt,
    category:req.body.category,
    review: req.body.review? req.body.review:[]

  }
  try{
      const newBlog = await prisma.blog.create({
      data: {
        title :blog.title,
        intro :blog.intro,       
        image :blog.image,
        video :blog.video,
        blog: blog.blog,
        category:blog.category,
        createdAt:blog.createdAt,
        userPremiumId: blog.userPremiumId,
        saved: false,
        liked: false,
      }
      })
      res.send(newBlog)
  } catch(err) {
      // @ts-ignore
      res.status(400).send(err.message)   
  }
})

//get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});
//get all premium users
app.get("/premiumusers", async (req, res) => {
  const userPremium = await prisma.userPremium.findMany();
  res.send(userPremium);
});

//delete blog
app.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await prisma.blog.delete({
      where: { id: Number(req.params.id) },
    });
    res.send(blog);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//post reviews
app.post('/reviews', async (req, res)=>{
  const review = {
      content:req.body.content,
      blogId: req.body.blogId,
      userPremiumId:req.body.userPremiumId
  }
  try{
      const newReview = await prisma.review.create({
      data: {
        content:review.content,
          blogId:review.blogId,
          userPremiumId:review.userPremiumId
      },
      include:{ blog:true}
      })
      res.send(newReview)
  } catch(err) {
      // @ts-ignore
      res.status(400).send(err.message)   
  }
})
//delete reviews
app.delete("/reviews/:id", async (req, res) => {
  try {
    const review = await prisma.review.delete({
      where: { id: Number(req.params.id) },
    });
    res.send(review);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});

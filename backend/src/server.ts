import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const SECRET = process.env.SECRET!;

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

function generateToken(id: number) {
  const token = jwt.sign({ id }, SECRET, { expiresIn: "1h" });
  return token;
}

async function getCurrentUser(token: string) {
  const decodedData = jwt.verify(token, SECRET);
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
    const userPremiums = await prisma.userPremium.findMany({
      where: {
        OR: [
          {
            email: req.body.email,
          },
          {
            name: req.body.name,
          },
        ],
      },
    });
    if (userPremiums.length > 0) {
      return res.status(401).send({ message: "User already exists" });
    } else {
      const userPremium = await prisma.userPremium.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 10)
        },
        include: {
          blog: true,
        },
      });
      const token = generateToken(userPremium.id);
      res.send({userPremium, token});
    }
  } catch (error) {
    //@ts-ignore
    res.status(451).send({ error: error.message });
  }
});

//log-in user
app.post("/login", async (req, res) => {
  const users = await prisma.userPremium.findMany({
    where: {
      OR: [
        {
          email: req.body.email,
        },
        // {
        //   name: req.body.name,
        // },
      ],
    },
    include: {
      blog: true,
    },
  })

  const userPremium = users[0];

  if(userPremium && bcrypt.compareSync(req.body.password, userPremium.password)) {
    const token = generateToken(userPremium.id);
    res.send({ userPremium, token });
  } else {
    res.status(401).send({ message: "Invalid credentials. Email or password is incorrect!" });
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
//change the blog to liked
app.patch("/blogs/liked/:id", async (req, res) => {
  try {
  const blog = await prisma.blog.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      liked: req.body.liked
    }
  })
  res.send(blog);
} catch (error) {
  // @ts-ignore
  res.status(404).send({ error: error.message });
}
})



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
      include: { userPremium: true},
    });

    res.send(reviews);
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
        include: { userPremium: true },
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
//This endpoint will let u edit the name of the user
app.patch("/users/:id/patch", async (req, res) => {
  try {
    // @ts-ignore
    const user = await prisma.userPremium.update({
      where: { id: Number(req.params.id) },
      data: {
        // @ts-ignore
        name: req.body.name
      },
      include: { reviews: true, blog: true, emoji: true },
    });

    res.send(user);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});
//
app.patch("/change-profile-name/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).send({ errors: ["Name id not provided"] });
      return;
    }
    const errors: string[] = [];
    const name = req.body.name;
    if (typeof name !== "string") {
      errors.push("Name not provided or not a string");
    }
    if (errors.length === 0) {
      const user = await prisma.userPremium.update({
        where: { id },
        data: {
          name,
        },
      });
      res.send(user);
    } else {
      res.status(400).send({ errors });
    }
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ errors: [error.message] });
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

//get all reviews
app.get("/reviews", async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.send(reviews);
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

//delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await prisma.userPremium.delete({
      where: { id: Number(req.params.id) },
    });
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
//post reviews
app.post("/review", async (req, res) => {
  const reviews = {
    content: req.body.content,
    blogId: req.body.blogId,
    userPremiumId: req.body.userPremiumId,
  };
  let errors: string[] = [];

  if (typeof req.body.content !== "string") {
    errors.push("Add a proper content!");
  }
  if (typeof req.body.blogId !== "number") {
    errors.push("Add a proper blog Id!");
  }
  if (typeof req.body.userPremiumId !== "number") {
    errors.push("Add a proper user Id");
  }
  if (errors.length === 0) {
    try {
      const newReview = await prisma.review.create({
        data: {
          content: reviews.content,
          blogId: reviews.blogId,
          userPremiumId: reviews.userPremiumId,
        },
      });
      res.send(newReview);
    } catch (err) {
      // @ts-ignore
      res.status(400).send(err.message);
    }
  } else {
    res.status(400).send({ errors: errors });
  }
});
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
//
app.get("/users/:id/blogs", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blog.findFirst({
      where: { userPremiumId: Number(id) },
      include: { reviews: true, userPremium: true},
    });
    res.send(blog);
  } catch (error) {
    // @ts-ignore
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});

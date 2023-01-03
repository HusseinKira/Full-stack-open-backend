const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../model/blog")
const api = supertest(app)
const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})

  const schemedobj = blogs.map((blog) => new Blog(blog))
  const promises = schemedobj.map((blog) => blog.save())
  await Promise.all(promises)
})

test("blogs are returned as json and same length", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
  expect(response.body).toHaveLength(blogs.length)
})

test("unique identifier is id", async () => {
  const response = await Blog.find({})
  response.forEach((blog) => expect(blog.id).toBeDefined())
})

test("post is successful", async () => {
  const blog = {
    title: "blabla",
    author: "hussein",
    url: "wwwesdsa.com",
    likes: 5,
  }

  await api.post("/api/blogs").send(blog).expect(201)

  const res = await Blog.find({})
  const titles = res.map((blog) => blog.title)
  expect(titles).toContain("blabla")
  expect(res.length).toBe(blogs.length + 1)
})

test("likes default 0", async () => {
  const blog = {
    title: "blabla",
    author: "hussein",
    url: "wwwesdsa.com",
  }

  const res = await api.post("/api/blogs")
  .send(blog)
  .expect(201)
  expect(res.body.likes).toBe(0)
})

test('title missing',async()=>{
  const blog = {
    
    author: "hussein",
    url: "wwwesdsa.com",
    likes: 5
  }

   await api.post("/api/blogs")
  .send(blog)
  .expect(400)
  

})

test('url missing',async()=>{
  const blog = {
    title:'kheer isa',
    author: "hussein",
    likes: 5
  }

 await api.post("/api/blogs")
  .send(blog)
  .expect(400)
  

})

test('valid delete',async()=>{
 const blogsindb = await Blog.find({})
 const dblog = blogsindb[0]
 await api
  .delete(`/api/blogs/${dblog.id}`)
  .expect(204)

  const res = await Blog.find({})

  expect(res.length).toBe(blogsindb.length -1)

})

test('invalid delete',async()=>{
  const id= 313131
  await api
  .delete(`/api/blogs/${id}`)
  .expect(400)

})

test('likes update',async()=>{
  const blogsindb = await Blog.find({})
  const ublog = blogsindb[0]
  const obj={likes:'50'}
  await api
  .put(`/api/blogs/${ublog.id}`)
   .send(obj)
   .expect(204)

   const checkl = await Blog.find({})

   expect(checkl[0].likes).toBe(50)

})






afterAll(() => {
  mongoose.connection.close()
})

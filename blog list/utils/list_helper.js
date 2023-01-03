var array = require('lodash/array');
var object = require('lodash/fp/object');

const dummy = (blogs) => {
  return 1
}

const totallikes = (blogs) => {
  const adder = (sum, item) => {
    return sum + item
  }

  const likesarr = blogs.map((blog) => blog.likes)
  return likesarr.reduce(adder, 0)
}

const favouriteblog = (blogs) => {
  const likesarr = blogs.map((blog) => blog.likes)
  const max = Math.max(...likesarr)

  const index = likesarr.indexOf(max)

  const obj = {
    title: blogs[index].title,
    author: blogs[index].author,
    likes: blogs[index].likes
   }

  return obj
}
// 4.7 f part 4a
// const mostblogs = (blogs)=>{
//     const counts = {};
//     const authorsarr = blogs.map((blog) => blog.author)
//    authorsarr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
//    



// }

module.exports = {
  dummy,
  totallikes,
  favouriteblog,
  mostblogs
}

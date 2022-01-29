const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    let max = {
        likes: 0
    }

    blogs.forEach(blog => {
        if (blog.likes > max.likes) {
            max = blog
        }
    })

    return {
        title: max.title,
        author: max.author,
        likes: max.likes
    }

}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}
import { GraphQLServer } from 'graphql-yoga'

// dummy data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@mead.io',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@mead.io'
}, {
    id: '3',
    name: 'Mateus',
    email: 'mateus@mead.io',
    age: 26
}]

const posts = [{
    id: '1',
    title: 'Graphql Rules',
    body: 'hello graph',
    published: true
}, {
    id: '2',
    title: 'I prefer REST',
    body: 'hello rest',
    published: false
}, {
    id: '3',
    title: 'Java and Node are Awesome',
    body: 'nodejs and java are really awesome',
    published: true
}]

// end dummy date

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post: Post!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`


const resolvers = {
    Query: {
        me() {
            return {
                id: '12345',
                name: 'Andrew',
                email: 'andrew@mead.io'
            }
        },
        post() {
            return {
                id: '189934',
                title: 'Graphql 101',
                body: '',
                published: false
            }
        },
        users(parent, args, ctx, info){
            if (!args.query) {
                return users
            }
            
            return users.filter((user) => {
                return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
            })
        },
        posts(parent, {query}, ctx, info) {
            if (!query) {
                return posts
            }
            const searchQuery = query.toLocaleLowerCase()
            return posts.filter((post) => {
                return post.title.toLocaleLowerCase().includes(searchQuery) || post.body.toLocaleLowerCase().includes(searchQuery)
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
const dotenv = require("dotenv");
dotenv.config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");
const cors = require("cors");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
    introspection: true,
    cors: {
      credentials: true,
      origin: [
        "https://apollo-1234.herokuapp.com",
        "https://studio.apollographql.com",
      ],
    },
  });

  const { url, port } = await server.listen({
    port: process.env.PORT || "4000",
  });
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);

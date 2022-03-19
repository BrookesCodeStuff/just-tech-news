const sequelize = require("../config/connection");
const { User, Post, Vote, Comment } = require("../models");

const userSeedData = require("./userSeedData.json");
const postSeedData = require("./postSeedData.json");
const commentSeedData = require("./commentSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postSeedData, {
    individualHooks: true,
    returning: true,
    // Attach a random user ID to each post
  });

  for (const comment of commentSeedData) {
    const newComment = await Comment.create({
      ...comment,
      // Attach a random post ID to each comment
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
      // Attach a random user ID to each comment
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

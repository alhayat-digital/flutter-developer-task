require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const app = require('./app');
const sequelize = require('./config/database');
const { User, Todo } = require('./models');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();

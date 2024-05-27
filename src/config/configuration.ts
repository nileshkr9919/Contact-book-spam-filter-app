export default () => ({
  database: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'contacts_db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
  },
});

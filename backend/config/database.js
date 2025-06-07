module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'agrocolmeteo_dev'),
      user: env('DATABASE_USERNAME', 'agrocolmeteo_user'),
      password: env('DATABASE_PASSWORD', 'agrocolmeteo2025'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    debug: false,
  },
});

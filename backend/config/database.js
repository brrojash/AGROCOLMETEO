module.exports = ({ env }) => {
  const databaseUrl = env('DATABASE_URL');
  
  if (databaseUrl) {
    // Usar DATABASE_URL si está disponible
    return {
      connection: {
        client: 'postgres',
        connection: databaseUrl,
        debug: false,
        acquireConnectionTimeout: 60000,
        pool: {
          min: 2,
          max: 10
        }
      },
    };
  }
  
  // Usar variables individuales con validación
  const host = env('DATABASE_HOST');
  const port = env.int('DATABASE_PORT', 5432);
  const database = env('DATABASE_NAME');
  const username = env('DATABASE_USERNAME');
  const password = env('DATABASE_PASSWORD');
  
  // Validar que tenemos todas las variables necesarias
  if (!host || !database || !username || !password) {
    throw new Error('Missing required database environment variables');
  }
  
  return {
    connection: {
      client: 'postgres',
      connection: {
        host,
        port,
        database,
        user: username,
        password,
        ssl: env.bool('DATABASE_SSL', false),
      },
      debug: false,
      acquireConnectionTimeout: 60000,
      pool: {
        min: 2,
        max: 10
      }
    },
  };
};
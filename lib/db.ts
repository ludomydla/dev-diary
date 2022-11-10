import postgres from 'postgres'
const sql = postgres(process.env.AZ_DATABASE_URI as string) // will use psql environment variables
export default sql
import postgres from 'postgres'

let sql: any;

if (process.env.DATABASE_URL){
    sql = postgres(process.env.DATABASE_URL, {});
} else {
    throw new Error('Missing env');
}

export default sql
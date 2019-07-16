import { Pool } from 'pg';

const connectionString = 'postgres://jatgcnls:YLUN9xrb5gKWLPPBuwjcw2Sx1Y_OCV9P@raja.db.elephantsql.com:5432/jatgcnls';
const pool = new Pool({
    connectionString:connectionString
});

export default pool;
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getData() {
  const client = await pool.connect();
  try {
    console.log('Connecting to the database...');
    const { rows } = await client.query('SELECT * FROM nameselection');
    console.log('Data retrieved:', rows);
    return rows;
  } catch (err) {
    console.error('Database query error:', err);
    return []; // Return an empty array if there’s an error
  } finally {
    client.release();
    console.log('Database connection released.');
  }
}

export async function getServerSideProps() {
  let data = [];
  try {
    data = await getData();
  } catch (err) {
    console.error('Error fetching data:', err);
  }
  return {
    props: {
      data,
    },
  };
}

export default function Page({ data }) {
  return (
    <div>
      {data.length > 0 ? (
        data.map((post, index) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <div>No data available or an error occurred.</div>
      )}
    </div>
  );
}

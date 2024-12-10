// File: app/page.tsx
import { neon } from '@neondatabase/serverless';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const FirstName = formData.get('FirstName');
    // Insert the comment from the form into the Postgres database
    await sql('INSERT INTO FirstName (FirstName) VALUES ($1)', [FirstName]);
  }

  return (
    <form action={create}>
      <input type="text" placeholder="write a FirstName" name="FirstName" />
      <button type="submit">Submit</button>
    </form>
  );
}
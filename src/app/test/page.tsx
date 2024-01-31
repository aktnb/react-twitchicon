'use server';

export default async function Page() {
  return (
    <span>{process.env.TEST_ENV}</span>
  )
}

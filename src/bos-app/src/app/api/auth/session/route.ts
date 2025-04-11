// Minimal session endpoint to avoid errors
export async function GET() {
  return new Response(JSON.stringify({ user: null }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

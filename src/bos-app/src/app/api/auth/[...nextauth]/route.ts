// Minimal NextAuth.js configuration to avoid compatibility issues
export async function GET() {
  return new Response(JSON.stringify({ providers: [] }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST() {
  return new Response(JSON.stringify({ error: 'OAuth providers require valid credentials' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}

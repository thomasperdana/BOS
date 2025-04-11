// Minimal error endpoint to avoid errors
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  
  return new Response(JSON.stringify({ 
    error: error || 'Unknown error',
    message: 'Authentication error occurred. Please check your credentials and try again.'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

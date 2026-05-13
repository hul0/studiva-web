export default async function handler(req, res) {
  try {
    const { type, id } = req.query;

    if (!type || !id) {
      return res.status(400).json({ error: 'Missing type or id' });
    }

    if (type !== 'content' && type !== 'user') {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const workerUrl = process.env.WORKER_URL || 'https://api.studiva.co.in';
    const internalSecret = process.env.INTERNAL_API_SECRET;

    if (!internalSecret) {
      console.error('INTERNAL_API_SECRET is missing');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Construct the endpoint URL based on the worker route
    // GET /public/content/:id
    // GET /public/user/:username
    const endpoint = `${workerUrl}/public/${type}/${id}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${internalSecret}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Failed to fetch from worker: ${response.statusText}` });
    }

    const data = await response.json();

    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    return res.status(200).json(data);
  } catch (error) {
    console.error('SEO Proxy Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default async function handler(req, res) {
  try {
    const { file } = req.query;
    
    if (!file || typeof file !== 'string') {
      return res.status(400).send('Missing sitemap file parameter');
    }

    const response = await fetch(`https://cdn.crine.in/sitemaps/${file}`);
    
    if (!response.ok) {
      return res.status(response.status).send(`Failed to fetch sitemap`);
    }

    const xml = await response.text();

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400'); // Cache on Edge
    return res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap Proxy Error:', error);
    return res.status(500).send('Internal Server Error');
  }
}

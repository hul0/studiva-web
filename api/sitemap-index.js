export default async function handler(req, res) {
  try {
    const response = await fetch('https://cdn.crine.in/sitemaps/sitemap-index.xml');
    
    if (!response.ok) {
      return res.status(response.status).send(`Failed to fetch sitemap index`);
    }

    let xml = await response.text();
    
    // Rewrite the sitemap URLs to use our own domain
    xml = xml.replace(/https:\/\/cdn\.crine\.in\/sitemaps\//g, 'https://studiva.co.in/sitemaps/');

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400'); // Cache on Edge
    return res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap Index Error:', error);
    return res.status(500).send('Internal Server Error');
  }
}

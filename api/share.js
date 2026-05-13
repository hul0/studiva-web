export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const pathname = url.pathname; // e.g., /share/user/hulo

    const segments = pathname.split('/').filter(Boolean);
    // Expected: ['share', 'kind', 'id']
    if (segments.length < 3 || segments[0] !== 'share') {
      // If it doesn't match the expected share pattern, just serve index.html
      return serveIndexHtml(req, res);
    }

    const kind = segments[1];
    const id = segments[2];

    if (kind !== 'content' && kind !== 'user') {
      return serveIndexHtml(req, res);
    }

    const workerUrl = process.env.WORKER_URL || 'https://api.studiva.co.in';
    const internalSecret = process.env.VITE_INTERNAL_API_SECRET || process.env.INTERNAL_API_SECRET;

    if (!internalSecret) {
      console.error('INTERNAL_API_SECRET is missing');
      return serveIndexHtml(req, res);
    }

    // Fetch Metadata from Studiva API
    const endpoint = `${workerUrl}/public/${kind}/${id}`;
    const apiRes = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${internalSecret}`,
        'Content-Type': 'application/json'
      }
    });

    if (!apiRes.ok) {
      console.error(`Failed to fetch metadata for ${kind} ${id}:`, apiRes.statusText);
      return serveIndexHtml(req, res);
    }

    const json = await apiRes.json();
    const data = json?.data;

    if (!data) {
      return serveIndexHtml(req, res);
    }

    let title, description, image;

    if (kind === 'content') {
      title = data.title || 'Shared Content';
      description = data.description || `Study material by ${data.creator_name || data.creator_username || 'a creator'}`;
      image = data.preview_link || '';
    } else {
      title = data.full_name || data.username || 'User';
      description = data.bio || `Check out ${title}'s profile and study materials on Studiva.`;
      image = data.avatar_url || '';
    }

    const pageTitle = kind === 'content'
      ? `${title} | Studiva`
      : `${title} (@${data.username}) · Studiva`;

    // Fetch the compiled index.html
    // Note: In Vercel, the host header points to the current deployment.
    // By fetching the root, we get the generated index.html with hashed assets.
    const htmlRes = await fetch(`https://${req.headers.host}/`);
    if (!htmlRes.ok) {
      return res.status(500).send('Error fetching base HTML');
    }

    let html = await htmlRes.text();

    // Inject Meta Tags into the <head>
    const metaTags = `
      <title>${escapeHtml(pageTitle)}</title>
      <meta name="description" content="${escapeHtml(description)}" />
      <meta property="og:title" content="${escapeHtml(pageTitle)}" />
      <meta property="og:description" content="${escapeHtml(description)}" />
      <meta property="og:type" content="${kind === 'user' ? 'profile' : 'article'}" />
      <meta property="og:url" content="https://${req.headers.host}${pathname}" />
      ${image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : ''}
      <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />
      <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
      <meta name="twitter:description" content="${escapeHtml(description)}" />
      ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ''}
    `;

    // Replace existing <title> and add our tags right after
    html = html.replace(/<title>.*?<\/title>/i, metaTags);

    // Set Cache-Control header so CDN caches this response 
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    return res.status(200).send(html);

  } catch (error) {
    console.error('Share Edge Function Error:', error);
    return serveIndexHtml(req, res);
  }
}

// Fallback: Just fetch and return the base index.html
async function serveIndexHtml(req, res) {
  try {
    const htmlRes = await fetch(`https://${req.headers.host}/`);
    const html = await htmlRes.text();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).send('Internal Server Error serving fallback');
  }
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

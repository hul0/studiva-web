import { supabase } from './_lib/supabase.js';
import { validateAuth, handleCors } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleCors(req, res)) return;
  if (!validateAuth(req, res)) return;

  if (req.method === 'POST') {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: "Already subscribed!" });
      }
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: "Subscribed successfully", data });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

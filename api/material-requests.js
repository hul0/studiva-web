import { supabase } from './_lib/supabase.js';
import { validateAuth, handleCors } from './_lib/auth.js';

export default async function handler(req, res) {
  if (handleCors(req, res)) return;
  if (!validateAuth(req, res)) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('material_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('material_requests')
      .insert([req.body]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ message: "Material request submitted successfully", data });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

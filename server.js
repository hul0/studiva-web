import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Auth Token
const AUTH_TOKEN = process.env.API_SECRET_TOKEN || "hello-my-token";

// Supabase Setup
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Auth Middleware
const validateAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized. Invalid or missing token." });
  }
  next();
};

// Routes
const handleTable = async (tableName, req, res) => {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from(tableName)
      .insert([req.body]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ message: "Success", data });
  }
};

app.all('/api/suggestions', validateAuth, (req, res) => handleTable('feature_suggestions', req, res));
app.all('/api/support', validateAuth, (req, res) => handleTable('support_tickets', req, res));
app.all('/api/campus-reps', validateAuth, (req, res) => handleTable('campus_representative_applications', req, res));
app.all('/api/creators', validateAuth, (req, res) => handleTable('verified_creator_applications', req, res));
app.all('/api/material-requests', validateAuth, (req, res) => handleTable('material_requests', req, res));
app.all('/api/newsletter', validateAuth, (req, res) => handleTable('newsletter_subscribers', req, res));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(port, () => {
  console.log(`Studiva API server running on port ${port}`);
});

import { supabase } from './supabase';

export interface Article {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export const ARTICLE_CATEGORIES = [
  'Actualités patrimoniales',
  'Fiscalité',
  'Retraite',
  'Investissement',
  'Immobilier',
  'Transmission',
  'Protection',
  'Guides pratiques',
  'FAQ',
];

// ---------- PUBLIC ----------

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data as Article[]) || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  if (error) return null;
  return data as Article;
}

// ---------- ADMIN (authenticated) ----------

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data as Article[]) || [];
}

export interface ArticleInput {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  cover_image_url?: string;
  published: boolean;
  meta_title?: string;
  meta_description?: string;
}

export async function createArticle(input: ArticleInput): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from('articles').insert([
    {
      ...input,
      published_at: input.published ? new Date().toISOString() : null,
    },
  ]);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function updateArticle(id: string, input: Partial<ArticleInput>): Promise<{ ok: boolean; error?: string }> {
  const update: Record<string, unknown> = { ...input, updated_at: new Date().toISOString() };
  if (input.published !== undefined) {
    update.published_at = input.published ? new Date().toISOString() : null;
  }
  const { error } = await supabase.from('articles').update(update).eq('id', id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function deleteArticle(id: string): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

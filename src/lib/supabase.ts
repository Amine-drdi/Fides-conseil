import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qzxxazafsbhpylvkbylp.supabase.co';
const supabaseKey = 'sb_publishable_k9lD92kQxby45ShdPFskPA_0g4uQHQd';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface ContactRequest {
  mode: 'rdv' | 'rappel';
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  profil: string;
  objet: string;
  message?: string;
}

export async function submitContactRequest(data: ContactRequest): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('contact_requests').insert([
      {
        mode: data.mode,
        prenom: data.prenom.trim(),
        nom: data.nom.trim(),
        telephone: data.telephone.trim(),
        email: data.email.trim(),
        profil: data.profil,
        objet: data.objet,
        message: data.message?.trim() || null,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error('Contact submission failed:', err);
    return { ok: false, error: 'network' };
  }
}

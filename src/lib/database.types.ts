export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AvaliacaoDetalhada = {
  iniciais: string;
  nota: number;
  texto: string;
  tempo: string;
};

export type Database = {
  public: {
    Tables: {
      pacientes: {
        Row: {
          id: string;
          nome: string | null;
          email: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          nome?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
        };
      };
      page_views: {
        Row: {
          id: string;
          nutricionista_id: string | null;
          pagina: string;
          origem: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nutricionista_id?: string | null;
          pagina: string;
          origem?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nutricionista_id?: string | null;
          pagina?: string;
          origem?: string | null;
          created_at?: string;
        };
      };
      leads_nutricionistas: {
        Row: {
          id: string;
          nome: string;
          email: string;
          whatsapp: string;
          crn: string;
          cidade: string;
          modalidade: string;
          especialidades: string[];
          status: string;
          origem: string;
          created_at: string;
          nutricionista_id: string | null;
          nutricionista_email: string | null;
          modalidade_escolhida: string | null;
          objetivo: string | null;
          mensagem: string | null;
          paciente_id: string | null;
          paciente_email: string | null;
        };
        Insert: {
          id?: string;
          nome: string;
          email: string;
          whatsapp: string;
          crn: string;
          cidade: string;
          modalidade: string;
          especialidades: string[];
          status?: string;
          origem?: string;
          created_at?: string;
          nutricionista_id?: string | null;
          nutricionista_email?: string | null;
          modalidade_escolhida?: string | null;
          objetivo?: string | null;
          mensagem?: string | null;
          paciente_id?: string | null;
          paciente_email?: string | null;
        };
        Update: {
          id?: string;
          nome?: string;
          email?: string;
          whatsapp?: string;
          crn?: string;
          cidade?: string;
          modalidade?: string;
          especialidades?: string[];
          status?: string;
          origem?: string;
          created_at?: string;
          nutricionista_id?: string | null;
          nutricionista_email?: string | null;
          modalidade_escolhida?: string | null;
          objetivo?: string | null;
          mensagem?: string | null;
          paciente_id?: string | null;
          paciente_email?: string | null;
        };
      };
      nutricionistas: {
        Row: {
          id: string;
          nome: string;
          crn: string;
          cidade: string;
          estado: string;
          modalidade: "Online" | "Presencial";
          especialidades: string[];
          nota: number;
          avaliacoes: number;
          preco: number;
          slug: string;
          bio: string | null;
          formacao: string | null;
          universidade: string | null;
          experiencia_anos: number | null;
          atendimentos: number | null;
          idiomas: string[];
          membro_desde: number | null;
          avaliacoes_detalhadas: AvaliacaoDetalhada[];
          whatsapp: string | null;
          status: string;
          destaque: boolean;
          aprovado_em: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          crn: string;
          cidade: string;
          estado: string;
          modalidade: "Online" | "Presencial";
          especialidades: string[];
          nota: number;
          avaliacoes: number;
          preco: number;
          slug: string;
          bio?: string | null;
          formacao?: string | null;
          universidade?: string | null;
          experiencia_anos?: number | null;
          atendimentos?: number | null;
          idiomas: string[];
          membro_desde?: number | null;
          avaliacoes_detalhadas: AvaliacaoDetalhada[];
          whatsapp?: string | null;
          status?: string;
          destaque?: boolean;
          aprovado_em?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          crn?: string;
          cidade?: string;
          estado?: string;
          modalidade?: "Online" | "Presencial";
          especialidades?: string[];
          nota?: number;
          avaliacoes?: number;
          preco?: number;
          slug?: string;
          bio?: string | null;
          formacao?: string | null;
          universidade?: string | null;
          experiencia_anos?: number | null;
          atendimentos?: number | null;
          idiomas?: string[];
          membro_desde?: number | null;
          avaliacoes_detalhadas?: AvaliacaoDetalhada[];
          whatsapp?: string | null;
          status?: string;
          destaque?: boolean;
          aprovado_em?: string | null;
          created_at?: string;
        };
      };
    };
  };
};

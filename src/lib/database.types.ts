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
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads_nutricionistas"]["Row"], "id" | "created_at" | "status"> & {
          id?: string;
          created_at?: string;
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads_nutricionistas"]["Insert"]>;
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
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["nutricionistas"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["nutricionistas"]["Insert"]>;
      };
    };
  };
};

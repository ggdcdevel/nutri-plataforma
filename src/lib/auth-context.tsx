"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type UserRole = "paciente" | "nutricionista" | "admin" | null;

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: UserRole;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchRole(userId: string) {
    try {
      const { data } = await (supabase as any)
        .from("pacientes")
        .select("role")
        .eq("id", userId)
        .single();
      setRole((data?.role as UserRole) ?? "paciente");
    } catch {
      setRole("paciente");
    }
  }

  useEffect(() => {
    // Flag: só redireciona ao /minha-conta se o usuário não estava logado antes.
    // Evita loop infinito — Supabase dispara SIGNED_IN mesmo com sessão já existente.
    let shouldRedirectOnSignIn = false;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchRole(session.user.id);
      } else {
        setRole(null);
      }
      setLoading(false);
      if (!session) {
        shouldRedirectOnSignIn = true;
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === "SIGNED_IN") {
        if (session?.user) fetchRole(session.user.id);
        if (shouldRedirectOnSignIn) {
          shouldRedirectOnSignIn = false;
          setIsModalOpen(false);
          window.location.href = "/minha-conta";
        }
      }

      if (event === "SIGNED_OUT") {
        setRole(null);
        shouldRedirectOnSignIn = true;
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuthModal = useCallback(() => setIsModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsModalOpen(false), []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        role,
        isModalOpen,
        openAuthModal,
        closeAuthModal,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}

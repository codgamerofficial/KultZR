'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  shipping_address: any | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch or create profile record in Supabase profiles table
  const fetchProfile = async (userId: string, userEmail: string) => {
    if (!isSupabaseConfigured) return;
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // Create initial profile if missing
        const newProfile = {
          id: userId,
          email: userEmail,
          full_name: userEmail.split('@')[0],
          phone: '',
          shipping_address: null,
        };
        const { data: inserted } = await supabase.from('profiles').insert(newProfile).select().single();
        if (inserted) data = inserted;
      }

      if (data) {
        setProfile(data);
      }
    } catch (err) {
      console.warn('Profile fetch error:', err);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email || '');
      }
      setLoading(false);
    });

    // Listen to Auth State changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email || '');
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Mock sign in fallback
      const mockUser = { id: 'mock-user-123', email } as User;
      setUser(mockUser);
      setProfile({ id: 'mock-user-123', email, full_name: email.split('@')[0], phone: '+91 98765 43210', shipping_address: null });
      return { error: null };
    }
    const res = await supabase.auth.signInWithPassword({ email, password });
    return { error: res.error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured) {
      const mockUser = { id: 'mock-user-123', email } as User;
      setUser(mockUser);
      setProfile({ id: 'mock-user-123', email, full_name: fullName, phone: '+91 98765 43210', shipping_address: null });
      return { error: null };
    }
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (!res.error && res.data.user) {
      // Provision profile row
      await supabase.from('profiles').insert({
        id: res.data.user.id,
        email: email,
        full_name: fullName,
      });
    }

    return { error: res.error };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!user) return { error: 'Not authenticated' };

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('profiles')
        .update(updated)
        .eq('id', user.id);

      if (!error) {
        setProfile(prev => (prev ? { ...prev, ...updated } : null));
      }
      return { error };
    } else {
      setProfile(prev => (prev ? { ...prev, ...updated } : null));
      return { error: null };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

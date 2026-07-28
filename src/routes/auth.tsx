import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ redirect: z.string().optional() }).parse,
  head: () => ({
    meta: [
      { title: "Sign in · Lee Shoe Factory" },
      { name: "description", content: "Sign in or create your Lee Shoe Factory account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const { redirect } = useSearch({ from: "/auth" });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: (redirect as any) ?? "/account", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: (redirect as any) ?? "/account", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, redirect]);

  async function google() {
    setBusy(true);
    try {
      const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
      if ((r as any).error) toast.error("Google sign-in failed");
    } finally { setBusy(false); }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    try {
      if (mode === "signup") {
        const full_name = String(fd.get("full_name"));
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/auth", data: { full_name } },
        });
        if (error) throw error;
        toast.success("Account created — please check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) { toast.error(err.message); } finally { setBusy(false); }
  }

  return (
    <SiteLayout>
      <div className="container-lux py-16 max-w-md mx-auto">
        <h1 className="font-serif text-4xl text-center">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {mode === "signin" ? "Sign in to manage your orders and wishlist." : "Track orders, save favourites, and get wholesale pricing."}
        </p>
        <button onClick={google} disabled={busy} className="mt-8 w-full border border-input bg-background py-3 text-sm hover:bg-muted flex items-center justify-center gap-2">
          <svg viewBox="0 0 48 48" className="size-4"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.9 2.6 30.3 0 24 0 14.8 0 6.9 5.4 3 13.2l7.9 6.1C12.6 13.5 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.4 5.6-5 7.3l7.8 6.1c4.6-4.2 7-10.5 7-17.9z"/><path fill="#FBBC05" d="M10.9 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C1.1 16.4 0 20.1 0 24s1.1 7.6 3 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.8-6.1c-2.2 1.5-5 2.4-7.7 2.4-6.2 0-11.4-4-13.1-9.7l-7.9 6.1C6.9 42.6 14.8 48 24 48z"/></svg>
          Continue with Google
        </button>
        <div className="flex items-center gap-4 my-6 text-xs uppercase tracking-widest text-muted-foreground">
          <div className="h-px bg-border flex-1" /> or <div className="h-px bg-border flex-1" />
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "signup" && (
            <Input name="full_name" label="Full name" required />
          )}
          <Input name="email" type="email" label="Email" required />
          <Input name="password" type="password" label="Password" required minLength={6} />
          <button disabled={busy} className="w-full bg-primary text-primary-foreground py-3 text-sm hover:bg-primary/90 disabled:opacity-60">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <div className="text-center text-sm mt-6 text-muted-foreground">
          {mode === "signin" ? "New here? " : "Have an account? "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-accent underline underline-offset-2">
            {mode === "signin" ? "Create account" : "Sign in"}
          </button>
        </div>
      </div>
    </SiteLayout>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full border border-input bg-background px-3 py-2.5 focus:outline-none focus:border-accent" />
    </label>
  );
}

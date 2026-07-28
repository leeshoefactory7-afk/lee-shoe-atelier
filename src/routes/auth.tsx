import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

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


        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "signup" && (
            <Input name="full_name" label="Full name" required />
          )}
          <Input name="email" type="email" label="Email" required />
          <PasswordInput name="password" label="Password" required minLength={6} />

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

function PasswordInput({ label, ...rest }: { label: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  const [show, setShow] = useState(false);
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <div className="relative mt-1">
        <input {...rest} type={show ? "text" : "password"} className="w-full border border-input bg-background px-3 py-2.5 pr-10 focus:outline-none focus:border-accent" />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </label>
  );
}

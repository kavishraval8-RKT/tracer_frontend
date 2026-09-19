"use client";

import { useActionState } from "react";
import type { FormState } from "@/lib/forms";
import { approveDeviceCode } from "@/lib/actions/activate";

export function ActivateForm({ initialCode }: { initialCode: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(approveDeviceCode, null);

  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Plugin code</span>
        <input
          name="user_code"
          defaultValue={initialCode}
          maxLength={16}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="ABCD-1234"
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono tracking-widest text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
          required
        />
      </label>

      {state && !state.ok && (
        <p className="text-sm text-rose-600">{state.message}</p>
      )}
      {state?.ok && (
        <p className="text-sm text-emerald-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {pending ? "Linking…" : "Link the plugin"}
      </button>

      <p className="text-xs text-slate-500">
        The plugin will connect automatically within a few seconds after you link it. You can close this tab.
      </p>
    </form>
  );
}

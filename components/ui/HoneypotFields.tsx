"use client";

import { useEffect, useRef } from "react";

/** Invisible anti-spam fields: a honeypot bots tend to fill, and the time the form was shown. Checked in lib/guard.ts. */
export function HoneypotFields() {
  const startedAt = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  return (
    <>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  );
}

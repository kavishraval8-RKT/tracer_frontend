"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-semibold tracking-tight text-slate-900 lg:text-7xl">
            Work with Tracer
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 lg:text-2xl">
            Have a question, need support, or want to discuss enterprise
            solutions? We're here to help.
          </p>

          {/* Direct Contact */}
          <div className="mb-16">
            <p className="mb-2 text-sm text-slate-500">Direct email:</p>
            <a
              href="mailto:hello@tracer.dev"
              className="text-2xl font-medium text-slate-900 transition-colors hover:text-blue-600"
            >
              hello@tracer.dev
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-900">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">General Inquiries</h3>
              <p className="text-sm text-slate-600">Questions about the product, pricing, or features</p>
            </div>
            <div className="text-center">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Technical Support</h3>
              <p className="text-sm text-slate-600">Help with installation, bugs, or integration issues</p>
            </div>
            <div className="text-center">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Enterprise Sales</h3>
              <p className="text-sm text-slate-600">Custom solutions for teams and organizations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

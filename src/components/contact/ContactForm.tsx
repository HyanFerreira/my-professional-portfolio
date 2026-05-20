"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

type Feedback =
  | {
      message: string;
      type: "error" | "success";
    }
  | {
      message: "";
      type: "idle";
    };

type ContactApiResponse = {
  message?: string;
  ok?: boolean;
};

const initialFormState: FormState = {
  email: "",
  message: "",
  name: "",
  subject: "",
};

const fieldClassName =
  "w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState<Feedback>({
    message: "",
    type: "idle",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: "", type: "idle" });

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = (await response
        .json()
        .catch(() => null)) as ContactApiResponse | null;

      if (!(response.ok && payload?.ok)) {
        throw new Error(
          payload?.message || "Nao foi possivel enviar sua mensagem.",
        );
      }

      setForm(initialFormState);
      setFeedback({
        message: payload.message || "Mensagem enviada com sucesso.",
        type: "success",
      });
    } catch (error) {
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel enviar sua mensagem.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-sm font-medium text-text-primary"
            htmlFor="contact-name"
          >
            Nome
          </label>
          <input
            autoComplete="name"
            className={fieldClassName}
            disabled={isSubmitting}
            id="contact-name"
            maxLength={120}
            minLength={2}
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Seu nome"
            required
            type="text"
            value={form.name}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-text-primary"
            htmlFor="contact-email"
          >
            E-mail
          </label>
          <input
            autoComplete="email"
            className={fieldClassName}
            disabled={isSubmitting}
            id="contact-email"
            maxLength={254}
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="voce@email.com"
            required
            type="email"
            value={form.email}
          />
        </div>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-text-primary"
          htmlFor="contact-subject"
        >
          Assunto
        </label>
        <input
          className={fieldClassName}
          disabled={isSubmitting}
          id="contact-subject"
          maxLength={160}
          name="subject"
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="Site, sistema, dashboard..."
          type="text"
          value={form.subject}
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-text-primary"
          htmlFor="contact-message"
        >
          Mensagem
        </label>
        <textarea
          className={cn(fieldClassName, "min-h-36 resize-y")}
          disabled={isSubmitting}
          id="contact-message"
          maxLength={4000}
          minLength={10}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Conte brevemente sobre o projeto"
          required
          value={form.message}
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button
          className="w-full sm:w-auto"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Enviando..." : "Enviar mensagem"}
        </Button>

        {feedback.type !== "idle" ? (
          <p
            aria-live="polite"
            className={cn(
              "text-sm leading-6",
              feedback.type === "success" ? "text-accent" : "text-fuchsia-300",
            )}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

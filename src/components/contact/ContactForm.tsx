"use client";

import { type FormEvent, useRef, useState } from "react";
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

type FieldErrors = Partial<Record<keyof FormState, string>>;

type ContactFormProps = {
  onCancel: () => void;
};

const initialFormState: FormState = {
  email: "",
  message: "",
  name: "",
  subject: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClassName =
  "w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60";

const fieldErrorClassName = "mt-2 text-sm font-medium leading-5 text-red-500";

const fieldLabelClassName =
  "mb-2 block text-sm font-medium text-text-primary transition-colors";

const fieldInvalidClassName =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";

function validateForm(form: FormState) {
  const errors: FieldErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const message = form.message.trim();

  if (!name) {
    errors.name = "Informe seu nome.";
  } else if (name.length < 2) {
    errors.name = "Digite pelo menos 2 caracteres.";
  }

  if (!email) {
    errors.email = "Informe seu e-mail.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!subject) {
    errors.subject = "Informe o assunto.";
  }

  if (!message) {
    errors.message = "Escreva sua mensagem.";
  } else if (message.length < 10) {
    errors.message = "Digite pelo menos 10 caracteres.";
  }

  return errors;
}

export function ContactForm({ onCancel }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<Feedback>({
    message: "",
    type: "idle",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const { [field]: _removedError, ...nextErrors } = currentErrors;
      return nextErrors;
    });
  }

  function focusFirstInvalidField(errors: FieldErrors) {
    if (errors.name) {
      nameInputRef.current?.focus();
      return;
    }

    if (errors.email) {
      emailInputRef.current?.focus();
      return;
    }

    if (errors.subject) {
      subjectInputRef.current?.focus();
      return;
    }

    if (errors.message) {
      messageTextareaRef.current?.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setFeedback({
        message: "Revise os campos destacados.",
        type: "error",
      });
      focusFirstInvalidField(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setFeedback({ message: "", type: "idle" });

    const requestPayload = {
      email: form.email.trim(),
      message: form.message.trim(),
      name: form.name.trim(),
      subject: form.subject.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(requestPayload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const responsePayload = (await response
        .json()
        .catch(() => null)) as ContactApiResponse | null;

      if (!(response.ok && responsePayload?.ok)) {
        throw new Error(
          responsePayload?.message || "Nao foi possivel enviar sua mensagem.",
        );
      }

      setForm(initialFormState);
      setFeedback({
        message: responsePayload.message || "Mensagem enviada com sucesso.",
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
    <form className="space-y-4" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className={cn(
              fieldLabelClassName,
              fieldErrors.name && "text-red-500",
            )}
            htmlFor="contact-name"
          >
            Nome
            <span aria-hidden="true" className="ml-1 text-red-500">
              *
            </span>
          </label>
          <input
            aria-describedby={
              fieldErrors.name ? "contact-name-error" : undefined
            }
            aria-invalid={fieldErrors.name ? "true" : "false"}
            aria-required="true"
            autoComplete="name"
            className={cn(
              fieldClassName,
              fieldErrors.name && fieldInvalidClassName,
            )}
            disabled={isSubmitting}
            id="contact-name"
            maxLength={120}
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Seu nome"
            ref={nameInputRef}
            type="text"
            value={form.name}
          />
          {fieldErrors.name ? (
            <p className={fieldErrorClassName} id="contact-name-error">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className={cn(
              fieldLabelClassName,
              fieldErrors.email && "text-red-500",
            )}
            htmlFor="contact-email"
          >
            E-mail
            <span aria-hidden="true" className="ml-1 text-red-500">
              *
            </span>
          </label>
          <input
            aria-describedby={
              fieldErrors.email ? "contact-email-error" : undefined
            }
            aria-invalid={fieldErrors.email ? "true" : "false"}
            aria-required="true"
            autoComplete="email"
            className={cn(
              fieldClassName,
              fieldErrors.email && fieldInvalidClassName,
            )}
            disabled={isSubmitting}
            id="contact-email"
            maxLength={254}
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="voce@email.com"
            ref={emailInputRef}
            type="email"
            value={form.email}
          />
          {fieldErrors.email ? (
            <p className={fieldErrorClassName} id="contact-email-error">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          className={cn(
            fieldLabelClassName,
            fieldErrors.subject && "text-red-500",
          )}
          htmlFor="contact-subject"
        >
          Assunto
          <span aria-hidden="true" className="ml-1 text-red-500">
            *
          </span>
        </label>
        <input
          aria-describedby={
            fieldErrors.subject ? "contact-subject-error" : undefined
          }
          aria-invalid={fieldErrors.subject ? "true" : "false"}
          aria-required="true"
          className={cn(
            fieldClassName,
            fieldErrors.subject && fieldInvalidClassName,
          )}
          disabled={isSubmitting}
          id="contact-subject"
          maxLength={160}
          name="subject"
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="Site, sistema, dashboard..."
          ref={subjectInputRef}
          type="text"
          value={form.subject}
        />
        {fieldErrors.subject ? (
          <p className={fieldErrorClassName} id="contact-subject-error">
            {fieldErrors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label
          className={cn(
            fieldLabelClassName,
            fieldErrors.message && "text-red-500",
          )}
          htmlFor="contact-message"
        >
          Mensagem
          <span aria-hidden="true" className="ml-1 text-red-500">
            *
          </span>
        </label>
        <textarea
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-required="true"
          className={cn(
            fieldClassName,
            "min-h-36 resize-y",
            fieldErrors.message && fieldInvalidClassName,
          )}
          disabled={isSubmitting}
          id="contact-message"
          maxLength={4000}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Conte brevemente sobre o projeto"
          ref={messageTextareaRef}
          value={form.message}
        />
        {fieldErrors.message ? (
          <p className={fieldErrorClassName} id="contact-message-error">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        {feedback.type !== "idle" ? (
          <p
            aria-live="polite"
            className={cn(
              "text-sm leading-6 sm:flex-1",
              feedback.type === "success" ? "text-accent" : "text-red-500",
            )}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        ) : null}

        <div className="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:items-center">
          <Button
            className="w-full sm:w-auto"
            disabled={isSubmitting}
            onClick={onCancel}
            type="button"
            variant="secondary"
          >
            Cancelar
          </Button>

          <Button
            className="w-full sm:w-auto"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </div>
      </div>
    </form>
  );
}

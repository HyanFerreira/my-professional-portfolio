"use client";

import { type FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Input,
  Label,
  Select,
  type SelectOption,
  Textarea,
} from "@/components/ui/Form";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

type FormState = {
  email: string;
  message: string;
  name: string;
  otherSubject: string;
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
  otherSubject: "",
  subject: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const otherSubjectValue = "Outro";
const maxMessageLength = 500;
const maxOtherSubjectLength = 200;

const subjectOptions: SelectOption[] = [
  "Aplicativo Mobile",
  ...services.map((service) => service.title),
  otherSubjectValue,
].map((subjectOption) => ({
  label: subjectOption,
  value: subjectOption,
}));

const fieldErrorClassName = "mt-2 text-sm font-medium leading-5 text-red-500";

function validateForm(form: FormState) {
  const errors: FieldErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const otherSubject = form.otherSubject.trim();
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
    errors.email = "Informe um e-mail valido.";
  }

  if (!subject) {
    errors.subject = "Informe o assunto.";
  } else if (subject === otherSubjectValue) {
    if (!otherSubject) {
      errors.otherSubject = "Especifique o assunto.";
    } else if (otherSubject.length > maxOtherSubjectLength) {
      errors.otherSubject = `O assunto deve ter no maximo ${maxOtherSubjectLength} caracteres.`;
    }
  }

  if (!message) {
    errors.message = "Escreva sua mensagem.";
  } else if (message.length < 10) {
    errors.message = "Digite pelo menos 10 caracteres.";
  } else if (message.length > maxMessageLength) {
    errors.message = `A mensagem deve ter no maximo ${maxMessageLength} caracteres.`;
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
  const otherSubjectInputRef = useRef<HTMLInputElement>(null);
  const subjectSelectRef = useRef<HTMLButtonElement>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
      ...(field === "subject" && value !== otherSubjectValue
        ? { otherSubject: "" }
        : {}),
    }));

    setFieldErrors((currentErrors) => {
      const shouldClearOtherSubject =
        field === "subject" && currentErrors.otherSubject;

      if (!(currentErrors[field] || shouldClearOtherSubject)) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];

      if (shouldClearOtherSubject) {
        delete nextErrors.otherSubject;
      }

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
      subjectSelectRef.current?.focus();
      return;
    }

    if (errors.otherSubject) {
      otherSubjectInputRef.current?.focus();
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
      subject:
        form.subject === otherSubjectValue
          ? form.otherSubject.trim()
          : form.subject.trim(),
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
          <Label htmlFor="contact-name" required>
            Nome
          </Label>
          <Input
            aria-describedby={
              fieldErrors.name ? "contact-name-error" : undefined
            }
            aria-invalid={fieldErrors.name ? "true" : "false"}
            aria-required="true"
            autoComplete="name"
            disabled={isSubmitting}
            id="contact-name"
            invalid={Boolean(fieldErrors.name)}
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
          <Label htmlFor="contact-email" required>
            E-mail
          </Label>
          <Input
            aria-describedby={
              fieldErrors.email ? "contact-email-error" : undefined
            }
            aria-invalid={fieldErrors.email ? "true" : "false"}
            aria-required="true"
            autoComplete="email"
            disabled={isSubmitting}
            id="contact-email"
            invalid={Boolean(fieldErrors.email)}
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
        <Label htmlFor="contact-subject" required>
          Assunto
        </Label>
        <Select
          aria-describedby={
            fieldErrors.subject ? "contact-subject-error" : undefined
          }
          aria-invalid={fieldErrors.subject ? "true" : "false"}
          aria-required="true"
          disabled={isSubmitting}
          id="contact-subject"
          invalid={Boolean(fieldErrors.subject)}
          name="subject"
          onValueChange={(value) => updateField("subject", value)}
          options={subjectOptions}
          placeholder="Selecione um servico"
          ref={subjectSelectRef}
          value={form.subject}
        />
        {fieldErrors.subject ? (
          <p className={fieldErrorClassName} id="contact-subject-error">
            {fieldErrors.subject}
          </p>
        ) : null}
      </div>

      {form.subject === otherSubjectValue ? (
        <div>
          <Label htmlFor="contact-other-subject" required>
            Especifique o assunto
          </Label>
          <Input
            aria-describedby={
              fieldErrors.otherSubject
                ? "contact-other-subject-error contact-other-subject-count"
                : "contact-other-subject-count"
            }
            aria-invalid={fieldErrors.otherSubject ? "true" : "false"}
            aria-required="true"
            disabled={isSubmitting}
            id="contact-other-subject"
            invalid={Boolean(fieldErrors.otherSubject)}
            maxLength={maxOtherSubjectLength}
            name="otherSubject"
            onChange={(event) =>
              updateField("otherSubject", event.target.value)
            }
            placeholder="Conte qual servico voce procura"
            ref={otherSubjectInputRef}
            type="text"
            value={form.otherSubject}
          />
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            {fieldErrors.otherSubject ? (
              <p
                className={fieldErrorClassName}
                id="contact-other-subject-error"
              >
                {fieldErrors.otherSubject}
              </p>
            ) : null}
            <p
              className="text-xs leading-5 text-text-secondary sm:ml-auto"
              id="contact-other-subject-count"
            >
              {form.otherSubject.length}/{maxOtherSubjectLength}
            </p>
          </div>
        </div>
      ) : null}

      <div>
        <Label htmlFor="contact-message" required>
          Mensagem
        </Label>
        <Textarea
          aria-describedby={
            fieldErrors.message
              ? "contact-message-error contact-message-count"
              : "contact-message-count"
          }
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-required="true"
          className="min-h-36 resize-y"
          disabled={isSubmitting}
          id="contact-message"
          invalid={Boolean(fieldErrors.message)}
          maxLength={maxMessageLength}
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Conte brevemente sobre o projeto"
          ref={messageTextareaRef}
          value={form.message}
        />
        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          {fieldErrors.message ? (
            <p className={fieldErrorClassName} id="contact-message-error">
              {fieldErrors.message}
            </p>
          ) : null}
          <p
            className="text-xs leading-5 text-text-secondary sm:ml-auto"
            id="contact-message-count"
          >
            {form.message.length}/{maxMessageLength}
          </p>
        </div>
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

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Informe seu nome.")
      .max(120, "O nome deve ter no maximo 120 caracteres."),
    email: z
      .string()
      .trim()
      .min(1, "Informe seu e-mail.")
      .email("Informe um e-mail valido.")
      .max(254, "O e-mail deve ter no maximo 254 caracteres."),
    subject: z
      .string()
      .trim()
      .min(1, "Informe o assunto.")
      .max(200, "O assunto deve ter no maximo 200 caracteres."),
    message: z
      .string()
      .trim()
      .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
      .max(500, "A mensagem deve ter no maximo 500 caracteres."),
  })
  .strict();

type ContactPayload = z.infer<typeof contactSchema>;

type ContactResponse =
  | {
      ok: true;
      message: string;
    }
  | {
      errors?: Record<string, string[] | undefined>;
      ok: false;
      message: string;
    };

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#39;",
  "<": "&lt;",
  ">": "&gt;",
};

function escapeHtml(value: string) {
  return value.replace(/[&"'<>]/g, (character) => htmlEscapes[character]);
}

function normalizeHeaderText(value: string) {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createEmailContent(data: ContactPayload) {
  const subject = normalizeHeaderText(
    data.subject || "Novo contato pelo portfolio",
  );
  const submittedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  const escapedName = escapeHtml(data.name);
  const escapedEmail = escapeHtml(data.email);
  const escapedSubject = escapeHtml(subject);
  const escapedMessage = escapeHtml(data.message).replace(/\n/g, "<br />");
  const escapedSubmittedAt = escapeHtml(submittedAt);

  return {
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
        <h1 style="font-size: 22px; margin: 0 0 16px;">Novo contato pelo portfolio</h1>
        <p><strong>Nome:</strong> ${escapedName}</p>
        <p><strong>E-mail:</strong> ${escapedEmail}</p>
        <p><strong>Assunto:</strong> ${escapedSubject}</p>
        <p><strong>Enviado em:</strong> ${escapedSubmittedAt}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="margin: 0 0 8px;"><strong>Mensagem:</strong></p>
        <p style="white-space: normal; margin: 0;">${escapedMessage}</p>
      </div>
    `,
    subject,
    text: [
      "Novo contato pelo portfolio",
      "",
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Assunto: ${subject}`,
      `Enviado em: ${submittedAt}`,
      "",
      "Mensagem:",
      data.message,
    ].join("\n"),
  };
}

function jsonResponse(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

async function methodNotAllowed() {
  return NextResponse.json(
    {
      ok: false,
      message: "Metodo nao permitido.",
    },
    {
      headers: {
        Allow: "POST",
      },
      status: 405,
    },
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "Envie os dados em JSON valido.",
      },
      400,
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return jsonResponse(
      {
        errors: parsed.error.flatten().fieldErrors,
        ok: false,
        message: "Revise os campos informados.",
      },
      400,
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactFrom = process.env.CONTACT_FROM;
  const contactTo = process.env.CONTACT_TO;

  if (!(resendApiKey && contactFrom && contactTo)) {
    console.error("Missing Resend contact environment variables.");

    return jsonResponse(
      {
        ok: false,
        message: "Nao foi possivel enviar a mensagem agora.",
      },
      500,
    );
  }

  const resend = new Resend(resendApiKey);
  const email = createEmailContent(parsed.data);

  try {
    const { error } = await resend.emails.send({
      from: contactFrom,
      html: email.html,
      replyTo: parsed.data.email,
      subject: `Contato portfolio: ${email.subject}`,
      text: email.text,
      to: contactTo,
    });

    if (error) {
      console.error("Resend contact send failed.", error);

      return jsonResponse(
        {
          ok: false,
          message: "Nao foi possivel enviar a mensagem agora.",
        },
        502,
      );
    }

    return jsonResponse(
      {
        ok: true,
        message: "Mensagem enviada com sucesso.",
      },
      200,
    );
  } catch (error) {
    console.error("Unexpected contact send error.", error);

    return jsonResponse(
      {
        ok: false,
        message: "Nao foi possivel enviar a mensagem agora.",
      },
      500,
    );
  }
}

export const GET = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

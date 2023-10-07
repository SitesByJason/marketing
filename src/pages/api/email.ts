import type { NextApiRequest, NextApiResponse } from "next";
const postmark = require("postmark");

const client = new postmark.ServerClient(process.env.POSTMARK_KEY);

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const data = request.body;

    client.sendEmail({
      From: `${data.name} <${data.email}>`,
      To: "jason@sitesbyjason.com",
      Subject: data.subject,
      HtmlBody: data.message,
      TextBody: data.message,
      MessageStream: "outbound",
    });

    response.status(201).json({ message: "Message Sent" });
  } else {
    response.status(200).json({ message: "Nothing Happened" });
  }
}

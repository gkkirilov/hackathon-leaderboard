import { createTransport } from 'nodemailer'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Create transporter
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'gkkirilov@gmail.com', // Your email
      pass: 'pzukjwcmevsgwtgq' // You'll need to set this up in your .env file
    }
  })

  try {
    // Send email
    await transporter.sendMail({
      from: body.from,
      to: body.to,
      subject: body.subject,
      text: body.text
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send email'
    })
  }
}) 
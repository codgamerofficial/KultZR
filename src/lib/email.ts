export interface OrderConfirmationEmailData {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  totalAmount: number;
  items: Array<{ title: string; size: string; customText?: string }>;
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationEmailData): Promise<boolean> {
  console.log(`[Email Service] Sending order confirmation email to ${data.customerEmail} for Order #${data.orderNumber}...`);
  
  const emailHtml = `
    <div style="font-family: sans-serif; background: #0A0A0C; color: #FAFAFA; padding: 40px; border-radius: 16px;">
      <h1 style="color: #D4AF37;">KultZR – Wear Your Story</h1>
      <h2>Thank you for your order, ${data.customerName}!</h2>
      <p>Your bespoke piece (Order #${data.orderNumber}) has entered our zero-waste print atelier.</p>
      <div style="background: #141418; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <p style="color: #D4AF37; font-weight: bold;">Order Summary:</p>
        <p>Total Paid: ₹${data.totalAmount.toLocaleString('en-IN')}</p>
        <ul>
          ${data.items.map(item => `<li>${item.title} (Size: ${item.size})${item.customText ? ` - Custom: "${item.customText}"` : ''}</li>`).join('')}
        </ul>
      </div>
      <p style="color: #A1A1AA; font-size: 12px;">Crafted on-demand with 100% organic cotton and plastic-free packaging.</p>
    </div>
  `;

  // Standard fetch to AWS SES / SMTP provider:
  // await fetch('https://api.emailprovider.com/send', { method: 'POST', body: JSON.stringify({ to: data.customerEmail, html: emailHtml }) });

  return true;
}

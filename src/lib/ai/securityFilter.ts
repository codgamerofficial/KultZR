export class SecurityFilter {
  static sanitizeMerchantContent(rawText: string): string {
    if (!rawText) return '';

    // Remove potential prompt injection patterns in merchant data
    return rawText
      .replace(/ignore (previous|all) instructions/gi, '[filtered_text]')
      .replace(/system prompt/gi, '[filtered_text]')
      .replace(/you are an ai/gi, '[filtered_text]')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .trim();
  }
}

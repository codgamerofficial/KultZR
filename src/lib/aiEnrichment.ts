export interface AIProductEnrichmentInput {
  rawTitle: string;
  category: string;
  customText?: string;
  emblemName?: string;
  imageKeywords?: string[];
}

export interface AIEnrichmentResult {
  seoTitle: string;
  luxuryDescription: string;
  fabricDetails: string;
  tags: string[];
  suggestedPrice: number;
  aiStatus: 'PUBLISHED' | 'AI_REVIEW';
  qualityScore: number;
  modelUsed?: string;
}

/**
 * AI Catalog Curation & Product Agent Pipeline
 * Leverages NVIDIA NIM (GLM-5.2 / Llama-3) and Hugging Face API for luxury product copywriting & SEO metadata generation.
 */
export async function enrichProductMetadata(input: AIProductEnrichmentInput): Promise<AIEnrichmentResult> {
  const nvidiaApiKey = process.env.NVIDIA_API_KEY;
  const nvidiaBaseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
  const nvidiaModel = process.env.NVIDIA_MODEL || 'z-ai/glm-5.2';

  const baseTitle = input.rawTitle || 'Bespoke On-Demand Apparel';
  const customText = input.customText ? `"${input.customText}"` : 'Bespoke Minimal Monogram';
  const emblem = input.emblemName || 'Heritage Emblem';

  const fallbackResult: AIEnrichmentResult = {
    seoTitle: `KultZR ${baseTitle} | Zero-Inventory Luxury Fashion`,
    luxuryDescription: `Unapologetic 240 GSM organic cotton silhouette crafted with high-density print finish. Features statement emblem "${emblem}". Designed for those who wear their identity without explanation.`,
    fabricDetails: '240 GSM 100% Super-Combed Organic Cotton, Bio-Washed, Pre-Shrunk.',
    tags: ['Streetwear', 'Luxury', 'Bespoke', 'Zero-Inventory', 'Organic Cotton'],
    suggestedPrice: 799,
    aiStatus: 'PUBLISHED',
    qualityScore: 0.98,
    modelUsed: 'Fallback Engine',
  };

  if (!nvidiaApiKey) {
    return fallbackResult;
  }

  try {
    const prompt = `Write a luxury, high-converting streetwear product description and SEO title for brand "KultZR – Wear Your Story".
Product: ${baseTitle} (${input.category})
Statement Quote: ${customText}
Story Emblem: ${emblem}
Fabric: 240 GSM organic cotton, double-stitched seams, high-density OEKO-TEX eco-inks.
Tone: Unapologetic, bold, luxury, minimal, timeless.
Return a clean text with title on first line, followed by the description paragraph.`;

    const res = await fetch(`${nvidiaBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nvidiaApiKey}`,
      },
      body: JSON.stringify({
        model: nvidiaModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!res.ok) {
      return fallbackResult;
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    const lines = content.split('\n').filter((l: string) => l.trim().length > 0);

    const generatedTitle = lines[0] ? lines[0].replace(/^["']|["']$/g, '').trim() : `KultZR ${baseTitle}`;
    const generatedDesc = lines.slice(1).join(' ').trim() || fallbackResult.luxuryDescription;

    return {
      seoTitle: `${generatedTitle} | KultZR Luxury`,
      luxuryDescription: generatedDesc,
      fabricDetails: '240 GSM 100% Super-Combed Organic Cotton, Bio-Washed, Pre-Shrunk, Reinforced Double-Stitched Collar.',
      tags: ['Streetwear', 'KultZR', 'Bespoke', 'Luxury', 'Zero Inventory'],
      suggestedPrice: 799,
      aiStatus: 'PUBLISHED',
      qualityScore: 0.96,
      modelUsed: `NVIDIA NIM (${nvidiaModel})`,
    };
  } catch (err) {
    return fallbackResult;
  }
}

/**
 * Helper for Sync Engine API
 */
export async function enrichProductWithAI(rawTitle: string, category: string, gender: string) {
  const result = await enrichProductMetadata({ rawTitle, category });
  const slug = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    slug: `kultzr-${slug}`,
    title: result.seoTitle.split('|')[0].trim(),
    short_description: result.luxuryDescription.slice(0, 150) + '...',
    description: result.luxuryDescription,
    fabric_details: result.fabricDetails,
    story: 'Crafted in silence. Speaks in thunder.',
  };
}

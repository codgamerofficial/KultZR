import { Product } from '../types';

export class SchemaGenerator {
  generateProductSchema(product: Product, baseUrl: string = 'https://dealsathi.in') {
    const offer = product.offers[0];

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      image: [product.imageUrl, ...product.galleryImages],
      description: product.verdictReason,
      sku: product.id,
      mpn: product.model,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/product/${product.id}`,
        priceCurrency: 'INR',
        price: product.currentBestTruePrice,
        priceValidUntil: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: offer?.merchantName || 'DealSathi Verified Store',
        },
      },
      ...(product.reviewIntelligence?.sentimentScore && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: (product.reviewIntelligence.sentimentScore / 20).toFixed(1),
          reviewCount: product.reviewIntelligence.totalAnalyzed.toString(),
        },
      }),
    };
  }

  generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }
}

export const defaultSchemaGenerator = new SchemaGenerator();

import BlogDetailClient from './BlogDetailClient';

export const dynamicParams = false;

export function generateStaticParams() {
  // Provide at least one static path for build consistency
  return [{ slug: 'panduan-lengkap-bali-2026' }];
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return <BlogDetailClient params={params} />;
}

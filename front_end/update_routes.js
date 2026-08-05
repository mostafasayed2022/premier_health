const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app', '[locale]');

// Get all directories in app/[locale]
const routes = fs.readdirSync(appDir).filter(f => fs.statSync(path.join(appDir, f)).isDirectory());

// Skeletons mapping to routes
// e.g. about -> RouteSkeleton, departments -> CardsSkeleton, default -> RouteSkeleton
const skeletonMapping = {
  'departments': 'CardsSkeleton',
  'services': 'CardsSkeleton',
  'gallery': 'CardsSkeleton',
  'doctors': 'CardsSkeleton',
  'branches': 'CardsSkeleton',
  'testimonials': 'CardsSkeleton',
};

// Add loading.tsx and error.tsx to each route
routes.forEach(route => {
  const routeDir = path.join(appDir, route);
  const loadingPath = path.join(routeDir, 'loading.tsx');
  const errorPath = path.join(routeDir, 'error.tsx');
  
  const skeletonName = skeletonMapping[route] || 'RouteSkeleton';
  
  const loadingContent = `import { ${skeletonName} } from "@/components/common/loading/${skeletonName}";

export default function Loading() {
  return <${skeletonName} />;
}
`;

  const errorContent = `'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 bg-slate-50 rounded-2xl border border-red-100 m-8">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong!</h2>
      <p className="text-sm text-slate-500 mb-6 text-center max-w-md">
        We encountered an error loading this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
`;

  if (!fs.existsSync(loadingPath)) {
    fs.writeFileSync(loadingPath, loadingContent);
    console.log(`Created ${loadingPath}`);
  }
  
  if (!fs.existsSync(errorPath)) {
    fs.writeFileSync(errorPath, errorContent);
    console.log(`Created ${errorPath}`);
  }
  
  // Update page.tsx to include generateMetadata
  const pagePath = path.join(routeDir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let pageContent = fs.readFileSync(pagePath, 'utf-8');
    
    // Check if it already has generateMetadata
    if (!pageContent.includes('export const generateMetadata') && !pageContent.includes('export async function generateMetadata')) {
      // Add import and export
      const metaKey = route;
      const importStatement = `import { generatePageMetadata } from "@/lib/seo";\n`;
      const exportStatement = `\nexport const generateMetadata = generatePageMetadata("${metaKey}");\n`;
      
      // Add import at top, after the first few imports if possible
      // or just at the top
      pageContent = importStatement + pageContent;
      
      // Add export before default export
      pageContent = pageContent.replace(/export default/, exportStatement + 'export default');
      
      fs.writeFileSync(pagePath, pageContent);
      console.log(`Updated metadata for ${pagePath}`);
    }
  }
});

console.log("Done adding loading/error/metadata!");

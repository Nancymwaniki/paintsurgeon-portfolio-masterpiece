import portfolioConfig from "@/data/portfolioConfig.json";

interface PortfolioItem {
  img: string;
  title: string;
  category: string;
  desc: string;
}

// Import all images from asset folders
const houseImages = import.meta.glob("@/assets/houses/*.(png|jpg|jpeg)", { eager: true });
const brandingImages = import.meta.glob("@/assets/branding/*.(png|jpg|jpeg)", { eager: true });
const logoImages = import.meta.glob("@/assets/logos/*.(png|jpg|jpeg)", { eager: true });
const illustrationImages = import.meta.glob("@/assets/illustrations/*.(png|jpg|jpeg)", { eager: true });

// Import featured images
const featuredImages = import.meta.glob("@/assets/*.(png|jpg|jpeg)", { eager: true });

const folderMap: Record<string, Record<string, any>> = {
  houses: houseImages,
  branding: brandingImages,
  logos: logoImages,
  illustrations: illustrationImages,
};

function getImageUrl(images: Record<string, any>): string[] {
  return Object.entries(images).map(([, module]: [string, any]) => module.default);
}

function extractFileName(path: string): string {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1];
  return fileName.replace(/\.(png|jpg|jpeg)$/i, "");
}

export function loadPortfolioProjects(): PortfolioItem[] {
  const projects: PortfolioItem[] = [];

  // Add featured projects first
  portfolioConfig.featured.forEach((featured, index) => {
    const imagePath = `/src/assets/${featured.image}`;
    const imageModule = featuredImages[imagePath];
    
    if (imageModule) {
      projects.push({
        img: (imageModule as any).default,
        title: featured.title,
        category: featured.category,
        desc: featured.description,
      });
    }
  });

  // Add projects from each category folder
  Object.entries(portfolioConfig.categories).forEach(([categoryName, config]) => {
    const folderImages = folderMap[config.folder];
    
    if (folderImages) {
      const imageUrls = getImageUrl(folderImages);
      
      imageUrls.forEach((url, index) => {
        const fileName = Object.keys(folderImages)[index];
        const displayName = extractFileName(fileName);
        
        projects.push({
          img: url,
          title: `${config.defaultTitle} ${index + 1}`,
          category: categoryName,
          desc: config.defaultDescription,
        });
      });
    }
  });

  // Shuffle to mix categories
  return shuffleArray(projects);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  const featured = shuffled.splice(0, 4); // Keep first 4 featured items at the start
  
  // Shuffle the rest
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return [...featured, ...shuffled];
}

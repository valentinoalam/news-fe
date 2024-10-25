import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Story */}
        <div className="md:col-span-8">
          <Card className="p-6">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Breaking News: Major Climate Agreement Reached at Global Summit
            </h2>
            <div className="relative aspect-video mb-4">
              <Image
                src="https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb"
                alt="Climate Summit"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              World leaders have reached a historic agreement to combat climate change,
              setting ambitious targets for reducing greenhouse gas emissions by 2030.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>By John Smith</span>
              <span className="mx-2">|</span>
              <span>5 min read</span>
            </div>
          </Card>

          {/* Secondary Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4">
                <div className="relative aspect-video mb-3">
                  <Image
                    src={`https://picsum.photos/200/200?random=${i}`}
                    alt={`Story ${i}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">
                  Technology Advances Promise New Era of Innovation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Latest developments in AI and quantum computing herald unprecedented
                  possibilities for scientific research and daily life.
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-4">
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-serif font-bold mb-4">Most Popular</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-muted-foreground">{i}</span>
                  <p className="text-sm">
                    Breakthrough in Renewable Energy Storage Could Transform Power Grid
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-serif font-bold mb-4">Opinion</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                  <p className="font-semibold mb-1">
                    The Future of Urban Transportation
                  </p>
                  <span className="text-sm text-muted-foreground">
                    By Jane Doe
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
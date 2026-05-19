import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ChatWidget } from "@/components/landing/chat-widget";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, ArrowRight, Clock } from "lucide-react";

const featuredPost = {
  title: "The Future of Digital Investments: Trends to Watch in 2024",
  excerpt:
    "Explore the emerging trends shaping the investment landscape and learn how to position your portfolio for maximum growth in the coming year.",
  category: "Market Insights",
  author: "Sarah Johnson",
  date: "Jan 15, 2024",
  readTime: "8 min read",
  slug: "future-digital-investments-2024",
};

const posts = [
  {
    title: "Understanding ROI: A Beginner&apos;s Guide to Investment Returns",
    excerpt:
      "Learn the fundamentals of return on investment and how to calculate your potential earnings.",
    category: "Education",
    author: "Michael Chen",
    date: "Jan 12, 2024",
    readTime: "5 min read",
    slug: "understanding-roi-beginners-guide",
  },
  {
    title: "5 Strategies for Diversifying Your Investment Portfolio",
    excerpt:
      "Discover proven strategies to spread your risk and maximize returns through smart diversification.",
    category: "Strategy",
    author: "Emma Williams",
    date: "Jan 10, 2024",
    readTime: "6 min read",
    slug: "diversifying-investment-portfolio",
  },
  {
    title: "How to Start Investing with Just $100",
    excerpt:
      "You don&apos;t need a fortune to start building wealth. Learn how to begin your investment journey.",
    category: "Getting Started",
    author: "James Rodriguez",
    date: "Jan 8, 2024",
    readTime: "4 min read",
    slug: "start-investing-with-100",
  },
  {
    title: "The Power of Compound Interest in Long-Term Investing",
    excerpt:
      "Understand how compound interest can exponentially grow your wealth over time.",
    category: "Education",
    author: "Linda Thompson",
    date: "Jan 5, 2024",
    readTime: "7 min read",
    slug: "power-compound-interest",
  },
  {
    title: "Market Volatility: How to Stay Calm During Turbulent Times",
    excerpt:
      "Tips and strategies for maintaining your investment discipline during market fluctuations.",
    category: "Market Insights",
    author: "David Kim",
    date: "Jan 3, 2024",
    readTime: "5 min read",
    slug: "market-volatility-stay-calm",
  },
  {
    title: "Referral Programs: Building Passive Income Through Your Network",
    excerpt:
      "Learn how to leverage referral programs to create an additional stream of passive income.",
    category: "Strategy",
    author: "Sarah Johnson",
    date: "Jan 1, 2024",
    readTime: "4 min read",
    slug: "referral-programs-passive-income",
  },
];

const categories = [
  "All",
  "Market Insights",
  "Education",
  "Strategy",
  "Getting Started",
  "News",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wider">
              Blog & News
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Insights & Investment Tips
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Stay informed with the latest market insights, investment
              strategies, and tips to help you make smarter financial decisions.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-12 h-12 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Badge className="mb-4">{featuredPost.category}</Badge>
                    <p className="text-muted-foreground">Featured Article</p>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    Featured
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="gap-2 w-fit">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="bg-card border-border hover:border-primary/30 transition-colors group"
              >
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="gap-2">
              Load More Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
                Get the latest investment insights, market updates, and
                exclusive tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shrink-0"
                >
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
}

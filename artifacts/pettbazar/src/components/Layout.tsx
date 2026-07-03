import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Linkedin, Share2, Check } from "lucide-react";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/IMG-20250707-WA0036_1779037618106.jpg";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const [location] = useLocation();

  const handleShare = async () => {
    const shareData = {
      title: "PettBazar",
      text: "One place for every step of your pet journey — check out PettBazar!",
      url: "https://pettbazar.in",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share — do nothing
      }
    } else {
      await navigator.clipboard.writeText("https://pettbazar.in");
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2500);
    }
  };

  const handleNavClick = (href: string) => {
    setIsDrawerOpen(false);
    if (href.startsWith("#")) {
      if (location !== "/") {
        // If not on home page, navigate to home then scroll
        window.location.href = "/" + href;
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label="Open menu"
              data-testid="button-menu-open"
            >
              <Menu size={24} />
            </button>
          </div>
          
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
              <img src={logoImg} alt="PettBazar" className="h-9 w-9 rounded-xl object-cover" />
              <span className="text-2xl font-bold text-primary tracking-tight">PettBazar</span>
            </Link>
          </div>
          
          <div className="flex-1 flex justify-end">
            {/* Empty right side to balance header */}
          </div>
        </div>
      </header>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-sm bg-background h-full shadow-xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="px-6 py-6 flex items-center justify-between border-b border-border/40">
              <Link href="/" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2">
                <img src={logoImg} alt="PettBazar" className="h-8 w-8 rounded-xl object-cover" />
                <span className="text-2xl font-bold text-primary tracking-tight">PettBazar</span>
              </Link>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                aria-label="Close menu"
                data-testid="button-menu-close"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 px-6 py-8 flex flex-col gap-6">
              <Link 
                href="/about" 
                onClick={() => setIsDrawerOpen(false)}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                data-testid="nav-about"
              >
                About Us
              </Link>
              <button 
                onClick={() => handleNavClick("#contact")}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors text-left"
                data-testid="nav-contact"
              >
                Contact
              </button>
              <Link 
                href="/privacy" 
                onClick={() => setIsDrawerOpen(false)}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                data-testid="nav-privacy"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                onClick={() => setIsDrawerOpen(false)}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                data-testid="nav-terms"
              >
                Terms & Conditions
              </Link>

              {/* Divider */}
              <div className="border-t border-border/40 pt-2" />

              {/* Share button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-3 text-xl font-semibold text-foreground hover:text-primary transition-colors text-left"
                data-testid="nav-share"
              >
                {shareStatus === "copied" ? (
                  <>
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-600">
                      <Check size={18} />
                    </span>
                    <span className="text-green-600">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                      <Share2 size={18} />
                    </span>
                    Share PettBazar
                  </>
                )}
              </button>
            </nav>
            
            <div className="p-6 border-t border-border/40 flex flex-col gap-3">
              <Button 
                className="w-full text-lg py-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                onClick={() => window.open('https://tally.so/r/GxDY6j', '_blank')}
                data-testid="button-drawer-cta"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <Link href="/" className="text-2xl font-bold text-primary tracking-tight inline-block" data-testid="link-footer-logo">
                PettBazar
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                One place for every step of your pet journey.
              </p>
            </div>
            
            {/* Column 2: Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors inline-block" data-testid="footer-about">
                    About Us
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick("#contact")}
                    className="text-muted-foreground hover:text-primary transition-colors inline-block"
                    data-testid="footer-contact"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Column 3: Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => handleNavClick("#faq")}
                    className="text-muted-foreground hover:text-primary transition-colors inline-block"
                    data-testid="footer-faq"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors inline-block" data-testid="footer-privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors inline-block" data-testid="footer-terms">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Our Journey */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">Our Journey</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/pettbazar?igsh=MWg3b3J3ZHZyeGcyaw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="Instagram"
                  data-testid="social-instagram"
                >
                  <SiInstagram size={18} />
                </a>
                <a 
                  href="https://www.facebook.com/share/1Cmf8tshYG/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="Facebook"
                  data-testid="social-facebook"
                >
                  <SiFacebook size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/yaswanthreddykolagatla?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="LinkedIn"
                  data-testid="social-linkedin"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Copyright &copy; {new Date().getFullYear()} PettBazar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/WaitlistForm";
import { PhoneMockup } from "@/components/PhoneMockup";
import { 
  Building2, 
  Smartphone, 
  Zap, 
  LayoutDashboard, 
  MessageSquareText, 
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_PHONE = "(555) 867-5309";

export default function LandingPage() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Doorsly</span>
          </div>
          <Button variant="ghost" className="text-sm font-medium hover:bg-slate-100 rounded-full px-6" onClick={scrollToWaitlist}>
            Early Access
          </Button>
        </div>
      </header>

      <main className="pt-24">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] -z-10" />
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] opacity-20 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-primary rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                  Now in Early Preview
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Try Doorsly in 60 Seconds <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">— Just Text.</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                  A new breed of property management software designed specifically for small and medium landlords.
                </p>

                <div className="bg-white border shadow-sm rounded-2xl p-6 lg:p-8 max-w-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Instant Demo Account</p>
                  <p className="text-2xl font-bold text-foreground mb-4">Text <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md">DEMO</span> to</p>
                  <div className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-800 mb-4 font-mono">
                    {DEMO_PHONE}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    No signup or credit card required.
                  </p>
                </div>
              </motion.div>

              <div className="relative lg:h-[600px] flex items-center justify-center lg:justify-end">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-slate-50 relative border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">What Happens When You Text?</h2>
              <p className="text-lg text-muted-foreground">Experience the platform immediately without jumping through hoops.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Account",
                  description: "We automatically create a secure demo environment tied to your phone number. Zero friction."
                },
                {
                  icon: LayoutDashboard,
                  title: "Sample Portfolio",
                  description: "Log in to find sample properties, tenants, and maintenance requests already populated."
                },
                {
                  icon: MessageSquareText,
                  title: "Meet Dora",
                  description: "Talk to Dora, the AI assistant built into Doorsly, via SMS to see how she handles requests."
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT IS DOORSLY / THE PROBLEM */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">What Doorsly Is</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Doorsly is serious property management software. It provides a central source of truth for your entire portfolio—leases, maintenance, communications, and finances.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dora is the accelerator. She's the interface that makes interacting with your data as easy as sending a text message, bridging the gap between powerful software and everyday convenience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <FileSpreadsheet className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Why It Exists</h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    "Stop losing track of maintenance requests in text threads.",
                    "Replace fragmented Excel spreadsheets with a unified system.",
                    "Keep tenant communication professional and recorded.",
                    "Spend less time on admin, more time growing your portfolio."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-blue-400 mr-4 shrink-0" />
                      <span className="text-slate-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHO IS IT FOR */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Who Should Try This?</h2>
              <p className="text-lg text-muted-foreground">We're building for a specific type of landlord.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-green-100 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-green-500" />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  A Great Fit If...
                </h3>
                <ul className="space-y-4">
                  <li className="text-muted-foreground">You manage 5 to 50 doors.</li>
                  <li className="text-muted-foreground">You currently use spreadsheets, emails, and personal texts.</li>
                  <li className="text-muted-foreground">You want a modern, simple interface without enterprise bloat.</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
                 <div className="absolute top-0 inset-x-0 h-1 bg-slate-300" />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <XCircle className="w-5 h-5 text-slate-400 mr-2" />
                  Not For You Yet If...
                </h3>
                <ul className="space-y-4">
                  <li className="text-muted-foreground">You manage 500+ commercial units.</li>
                  <li className="text-muted-foreground">You require complex multi-tiered accounting software.</li>
                  <li className="text-muted-foreground">You have a large staff with complex permissions needs.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WAITLIST CTA */}
        <section id="waitlist" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary -z-20" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay -z-10" />
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">This Is an Early Preview</h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Doorsly is currently in active development. If you don't want to try the demo today but want to be notified when we officially launch, join the waitlist.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background py-12 border-t border-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-6">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <span className="font-bold text-lg text-muted-foreground tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Doorsly</span>
          </div>
          
          <div className="inline-flex flex-col sm:flex-row items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
            <span className="text-sm font-medium text-slate-600 mb-2 sm:mb-0 sm:mr-4">Ready to try it right now?</span>
            <div className="flex items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <Smartphone className="w-4 h-4 text-primary mr-2" />
              <span className="font-mono font-bold text-slate-800">Text DEMO to {DEMO_PHONE}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Doorsly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

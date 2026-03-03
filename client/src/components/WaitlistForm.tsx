import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useJoinWaitlist } from "@/hooks/use-waitlist";
import { insertWaitlistSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const joinWaitlist = useJoinWaitlist();

  const form = useForm<z.infer<typeof insertWaitlistSchema>>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof insertWaitlistSchema>) => {
    try {
      await joinWaitlist.mutateAsync(data);
      setIsSubmitted(true);
      form.reset();
    } catch (e) {
      // Error is handled by the hook's toast
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              You're on the list
            </h3>
            <p className="text-muted-foreground text-sm">
              We'll send you an update as soon as we're ready for you.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative flex items-center">
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            className="h-14 pl-5 pr-32 rounded-full border-muted-foreground/20 bg-white/50 backdrop-blur-sm focus-visible:ring-primary shadow-sm"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={joinWaitlist.isPending}
                          className="absolute right-1.5 h-11 rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all"
                        >
                          {joinWaitlist.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              Join Waitlist
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                      <FormMessage className="ml-4" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

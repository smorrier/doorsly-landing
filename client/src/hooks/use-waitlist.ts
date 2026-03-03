import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type WaitlistInput = z.infer<typeof api.waitlist.create.input>;

export function useJoinWaitlist() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: WaitlistInput) => {
      // Validate input before sending using the shared schema
      const validated = api.waitlist.create.input.parse(data);
      
      const res = await fetch(api.waitlist.create.path, {
        method: api.waitlist.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.waitlist.create.responses[400].parse(await res.json());
          throw new Error(error.message || "Invalid input");
        }
        throw new Error("Failed to join waitlist. Please try again.");
      }

      return api.waitlist.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "We'll be in touch as soon as a spot opens up.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { z } from "zod";
import { CyberButton } from "./CyberButton";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function NewsletterForm() {
  const { mutate, isPending } = useCreateSubscriber();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card/50 border border-primary/20 backdrop-blur-sm clip-path-slant">
      <div className="flex items-center gap-3 mb-6 text-primary">
        <Mail className="w-6 h-6" />
        <h3 className="text-xl font-bold uppercase">Join the Flock</h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="ENTER YOUR EMAIL" 
                    {...field} 
                    className="bg-black/50 border-primary/30 text-white placeholder:text-gray-500 h-12 font-mono"
                  />
                </FormControl>
                <FormMessage className="text-destructive font-mono text-xs" />
              </FormItem>
            )}
          />
          <CyberButton 
            type="submit" 
            className="w-full" 
            disabled={isPending}
            glow
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "SUBSCRIBE FOR UPDATES"}
          </CyberButton>
        </form>
      </Form>
    </div>
  );
}

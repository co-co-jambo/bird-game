import { trpc } from "@/lib/trpc";
import { useToast } from "./use-toast";

export function useCreateSubscriber() {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  return trpc.subscribers.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Welcome to the Flock!",
        description: "You've successfully subscribed to updates.",
        variant: "default",
        className: "border-primary text-primary-foreground bg-primary",
      });
      utils.subscribers.invalidate();
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

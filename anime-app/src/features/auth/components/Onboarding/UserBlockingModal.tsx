"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { OnboardingForm } from "@/features/auth/components/Onboarding/OnboardingForm.ui";

export function UserBlockingModal() {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false} className="w-[90%] max-w-md">
        <DialogHeader className="items-start text-left">
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>
            Please enter your username and job title to access the Anime
            Information Page.
          </DialogDescription>
        </DialogHeader>
        <OnboardingForm />
      </DialogContent>
    </Dialog>
  );
}



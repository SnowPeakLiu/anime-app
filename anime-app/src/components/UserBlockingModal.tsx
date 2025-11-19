"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { OnboardingForm } from "@/features/auth/components/OnboardingForm.ui";

export function UserBlockingModal() {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
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



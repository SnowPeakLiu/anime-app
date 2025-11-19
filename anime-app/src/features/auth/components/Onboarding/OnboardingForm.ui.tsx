'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveUserInfo } from "@/app/actions";

export function OnboardingForm() {
  return (
    <form
      action={saveUserInfo}
      className="w-full max-w-sm space-y-4 rounded-xl border bg-background p-6 shadow-lg"
    >
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          autoComplete="name"
          placeholder="Enter your name"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          autoComplete="organization-title"
          placeholder="Enter your job title"
        />
      </div>
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}


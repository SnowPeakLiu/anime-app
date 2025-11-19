'use client';

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveUserInfo } from "@/app/actions";

export function OnboardingForm() {
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const isDisabled =
    username.trim().length === 0 || jobTitle.trim().length === 0;

  return (
    <form action={saveUserInfo} className="mt-4 w-full space-y-4">
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          autoComplete="name"
          placeholder="Enter your name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          autoComplete="organization-title"
          placeholder="Enter your job title"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isDisabled}>
        Continue
      </Button>
    </form>
  );
}


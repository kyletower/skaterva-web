'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PreorderForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="Pickup name" aria-label="Pickup name" />
        <Input placeholder="Email for receipt" aria-label="Email for receipt" />
      </div>
      <Button className="w-full" size="lg" type="submit">
        Continue to Preorder
      </Button>
    </form>
  );
}

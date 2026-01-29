'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { addProductAction } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Adding Product...' : 'Add Product'}
    </Button>
  );
}

type AddProductFormProps = {
  categories: string[];
};

export default function AddProductForm({ categories }: AddProductFormProps) {
  const [state, formAction] = useFormState(addProductAction, {
    errors: {},
    success: false,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: 'Product added successfully.',
      });
      formRef.current?.reset();
    } else if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" placeholder="e.g. Azure Glide Runners" />
          {state.errors?.name && (
            <p className="text-sm text-destructive">{state.errors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={categories[0]}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="e.g. Lightweight and comfortable running shoes..."
        />
        {state.errors?.description && (
          <p className="text-sm text-destructive">
            {state.errors.description[0]}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" step="0.01" placeholder="e.g. 79.99" />
          {state.errors?.price && (
            <p className="text-sm text-destructive">{state.errors.price[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input id="rating" name="rating" type="number" step="0.1" max="5" min="1" placeholder="e.g. 4.5" />
          {state.errors?.rating && (
            <p className="text-sm text-destructive">{state.errors.rating[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="usersPurchased">Users Purchased</Label>
          <Input id="usersPurchased" name="usersPurchased" type="number" step="1" min="0" placeholder="e.g. 150" />
           {state.errors?.usersPurchased && (
            <p className="text-sm text-destructive">{state.errors.usersPurchased[0]}</p>
          )}
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

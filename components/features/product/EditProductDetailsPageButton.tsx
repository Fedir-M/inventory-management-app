import { Button } from '@/components/ui/button';
import { PencilRuler } from 'lucide-react';

interface IEditProductDetailsPageButtonProps {
  className?: string;
}

export default function EditProductDetailsPageButton({
  className,
}: IEditProductDetailsPageButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`group border border-brand-border gap-2 text-brand-border bg-transparent
        
        hover:text-brand-primary hover:border-brand-primary hover:bg-brand-light ${className}
        transition-all duration-250 cursor-pointer`}
    >
      Edit Product
      <PencilRuler
        size={16}
        className="text-orange-500 group-hover:text-brand-primary transition-colors"
      />
    </Button>
  );
}

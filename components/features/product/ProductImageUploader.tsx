'use client';

import React, { useState, useRef, useTransition } from 'react';
import { Edit, SquareDashedText, UploadCloud, X } from 'lucide-react';
import { UploadProductImage } from '@/app/actions/uploadProductImage';
import Image from 'next/image';

interface IProductImageUploaderProps {
  productId: string;
  initialImage: string | null;
  productName: string;
}

export function ProductImageUploader({
  productId,
  initialImage,
  productName,
}: IProductImageUploaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState<string | null>(initialImage);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ======================================================================
  //*                               Handlers
  // ======================================================================
  // --- Add a picture(as a file) via FormData to our server/db---
  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    // Optimistic UI for our picture
    const localPreviewUrl = URL.createObjectURL(file);
    setImage(localPreviewUrl);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productId', productId);
        await UploadProductImage(formData);
      } catch (error) {
        console.error(error);
        setImage(initialImage);
      }
    });
  };

  // --- Delete a picture ---
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents clicks on the parent container from triggering

    if (isPending) return;

    setImage(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('remove', 'true');
        await UploadProductImage(formData);
      } catch (error) {
        console.error(error);
        setImage(image);
      }
    });
  };

  // Calculating a dynamic background and border using JS, 'cos of a Tailwind's bug
  const getBoxStyles = () => {
    if (isDragActive) {
      return {
        borderColor: 'oklch(59.021% 0.23603 286.273)',
        backgroundColor: '#eff6ff',
        transform: 'scale(1.01)',
      };
    }
    if (isHovered) {
      return {
        // with hover
        borderColor: 'oklch(59.021% 0.23603 286.273)',
        backgroundColor: '#f1f5f9',
        transform: 'scale(1.005)',
      };
    }
    return {
      borderColor: 'oklch(87.168% 0.00944 258.479)',
      backgroundColor: '#f9fafb',
      transform: 'scale(1)',
    };
  };

  return (
    // ======================================================================
    //*                               MarkUp
    // ======================================================================
    <div
      onClick={() => !isPending && fileInputRef.current?.click()}
      // (Файл занесли над областью)
      onDragOver={(e) => {
        e.preventDefault();
        if (!isPending) setIsDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragActive(false);
        if (isPending || !e.dataTransfer.files?.[0]) return;
        handleFile(e.dataTransfer.files[0]);
      }}
      // Listen to the regular mouse hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderWidth: '4px',
        borderStyle: 'dashed',
        ...getBoxStyles(),
      }}
      className="relative w-full aspect-square flex flex-col items-center justify-center rounded-lg transition-all duration-200 cursor-pointer select-none overflow-hidden"
    >
      {/* Layer basement. Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        accept="image/*"
        style={{ display: 'none' }}
        disabled={isPending}
      />

      {/* --- Layer 1. Picture --- */}
      {image && (
        <div className="absolute inset-1 rounded-md overflow-hidden z-0 pointer-events-none">
          <Image
            src={image}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-cover"
            unoptimized={image.startsWith('blob:')}
          />
        </div>
      )}

      {/* Layer 1.2. Delete button (Shown only if there is a picture and the file is not dragged.) */}
      {image && !isDragActive && (
        <button
          type="button"
          onClick={handleRemoveImage}
          disabled={isPending}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all z-30 shadow-md border border-white/10 active:scale-95"
          style={{
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <X size={18} />
        </button>
      )}

      {/* --- Layer 2. DEFAULT text (Shows when empty and not dragged) --- */}
      {!image && !isDragActive && (
        <div
          className="flex flex-col items-center justify-center gap-2 pointer-events-none transition-colors"
          style={{
            color: isHovered ? 'oklch(59.021% 0.23603 286.273)' : '#9ca3af',
          }}
        >
          <SquareDashedText size={40} />
          <span className="text-sm font-medium">Drop or Click</span>
        </div>
      )}

      {/* --- Layer 3. Picture. Hover overlay --- */}
      {image && !isDragActive && (
        <div
          className="absolute inset-1 rounded-md flex flex-col items-center justify-center gap-2 bg-black/40 text-white transition-opacity duration-200 pointer-events-none z-10"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <Edit size={28} />
          <span className="text-sm font-medium">Update Image</span>
        </div>
      )}

      {/* --- Layer 4. PASS-THROUGH overlay for Drag&Drop --- */}
      {isDragActive && (
        <div className="absolute inset-1 bg-brand-border/60 rounded-md flex flex-col items-center justify-center gap-2 pointer-events-none z-20 backdrop-blur-[2px] transition-opacity duration-150">
          <UploadCloud
            size={42}
            className="animate-bounce !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          />
          <span className="text-md font-semibold !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            Drop it here!
          </span>
        </div>
      )}
    </div>
  );
}

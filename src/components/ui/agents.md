# Padrões de Componentes UI

## Estrutura de Arquivos

- Componentes genéricos ficam em `src/components/ui/`
- Utilitários ficam em `src/lib/utils.ts`

## Utilitários

### cn()

Utilize `cn` para combinar classes CSS:

```tsx
import { cn } from "@/lib/utils";

cn("px-4 py-2", isActive && "bg-blue-500");
```

## tailwind-variants

Use `tv` para criar variantes de componentes. **Não use** `cn` ou `twMerge` para mesclar classes com o `tv` - o `tv` já faz isso automaticamente.

```tsx
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "classes-base",
  variants: {
    variant: {
      default: "classes-variant-default",
      secondary: "classes-variant-secondary",
    },
    size: {
      sm: "classes-size-sm",
      lg: "classes-size-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
```

## Props

Extenda as propriedades nativas do elemento HTML:

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

## Exports

Sempre use **named exports**, nunca default exports:

```tsx
export { Button, buttonVariants };
```

## Estrutura de Componente

```tsx
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const componentVariants = tv({
  base: "classes-base",
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: { ... },
});

export interface ComponentProps
  extends React.ElementHTMLAttributes<HTMLElementElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElementElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={componentVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

export { Component, componentVariants };
```

## Tailwind CSS v4

Configure cores customizadas em `src/app/globals.css` usando `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-accent-green: #10B981;
}
```

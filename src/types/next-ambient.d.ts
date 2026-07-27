declare module "next/link" {
  type LinkProps = {
    href: string;
    className?: string;
    children?: any;
  };

  export default function Link(props: LinkProps): any;
}

declare module "next/navigation" {
  export function notFound(): never;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};

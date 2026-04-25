/**
 * Liens réseaux sociaux — Header & Footer.
 * Surcharger via NEXT_PUBLIC_* en production si besoin.
 */

export interface SocialLink {
  href: string;
  label: string;
  isExternal: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/",
    label: "Instagram",
    isExternal: true,
  },
  {
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/",
    label: "LinkedIn",
    isExternal: true,
  },
  {
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/",
    label: "Facebook",
    isExternal: true,
  },
  {
    href: process.env.NEXT_PUBLIC_CONTACT_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` : "mailto:contact@botoologia.com",
    label: "Email",
    isExternal: false,
  },
];

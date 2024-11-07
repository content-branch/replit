import { createContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
export const EnvironmentContext = createContext<{
  Link:
  | React.FunctionComponent<{
    href: string;
    children: React.ReactNode;
    isExternal?: boolean;
    prefix?: string;
  }>
  | typeof Link;
  Image:
  | React.FunctionComponent<{
    src: string | StaticImageData;
    width?: number;
    height?: number;
    alt: string;
  }>
  | typeof Image;
  SEO:
  | React.FC<{
    title?: string;
    description?: string;
    keywords?: string[];
    noindex?: boolean;
    nofollow?: boolean;
  }>
  | typeof Head;
}>({ Link: () => null, Image: () => null, SEO: () => null });

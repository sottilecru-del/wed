
import React from 'react';

export interface FeatureSection {
  id: string;
  title: string;
  description: string;
  tagline: string;
  image: string;
  accentColor: string;
  content: React.ReactNode;
}
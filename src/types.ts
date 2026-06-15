export interface StatMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: string;
  category: 'Scale' | 'Impact' | 'Leadership';
}

export interface CareerMilestone {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  details: string[];
  metrics: { label: string; value: string }[];
  category: 'Executive' | 'Management' | 'Earlier';
  brandColor?: string;
  logoInitial?: string;
}

export interface CompetencyCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: string[];
}

export interface LeadershipPhilosophy {
  id: string;
  quote: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  timestamp: string;
}

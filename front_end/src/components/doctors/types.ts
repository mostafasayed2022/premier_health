export interface DoctorData {
  id: string | number;
  name: string;
  name_ar: string;
  slug: string;
  specialty: string;
  specialty_ar: string;
  position: string;
  position_ar: string;
  rating: number;
  experience: number;
  languages: string[];
  photo: string;
  patients: number;
  bio: string;
  bio_ar: string;
  education: string[];
  specializations: string[];
}

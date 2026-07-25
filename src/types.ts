export type MainTab = 'client' | 'driver' | 'admin';

export type ClientScreen = 
  | 'splash'
  | 'home'
  | 'school-routes'
  | 'school-booking'
  | 'school-chat'
  | 'school-gps'
  | 'fixed-details'
  | 'fixed-cars'
  | 'fixed-chat'
  | 'fixed-gps';

export interface SchoolRoute {
  id: string;
  title: string;
  governorate: string;
  schoolName: string;
  seatsLeft: number;
  totalSeats: number;
  departureTime: string;
  vehicleType: string;
  captainName: string;
  captainPhone: string;
  pricePerMonth: number;
}

export interface VehicleOption {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeColor: string;
  description: string;
  icon: string;
  defaultPrice: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'driver' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isAudio?: boolean;
}

export interface DriverApplication {
  id: string;
  fullName: string;
  phone: string;
  governorate: string;
  vehicleModel: string;
  nationalIdUploaded: boolean;
  nationalIdFileName?: string;
  licenseUploaded: boolean;
  licenseFileName?: string;
  instaPayReference?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface SchoolBookingData {
  routeTitle: string;
  studentName: string;
  pickupAddress: string;
  schoolAndGrade: string;
}

export interface FixedRideData {
  from: string;
  to: string;
  dailyTime: string;
  selectedCarCategory?: string;
  agreedPrice?: number;
}

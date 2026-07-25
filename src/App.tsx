import React, { useState } from 'react';
import {
  MainTab,
  ClientScreen,
  SchoolRoute,
  VehicleOption,
  ChatMessage,
  DriverApplication,
  SchoolBookingData,
  FixedRideData,
} from './types';
import {
  INITIAL_SCHOOL_ROUTES,
  VEHICLE_OPTIONS,
  INITIAL_DRIVERS,
} from './data/mockData';

import { HeaderNav } from './components/HeaderNav';
import { Toast } from './components/Toast';

import { ClientSplashScreen } from './components/Client/ClientSplashScreen';
import { ClientHome } from './components/Client/ClientHome';
import { SchoolRoutes } from './components/Client/SchoolRoutes';
import { SchoolBooking } from './components/Client/SchoolBooking';
import { SchoolChat } from './components/Client/SchoolChat';
import { SchoolGpsMap } from './components/Client/SchoolGpsMap';
import { FixedRideDetails } from './components/Client/FixedRideDetails';
import { FixedRideCars } from './components/Client/FixedRideCars';
import { NegotiationModal } from './components/Client/NegotiationModal';
import { FixedRideChat } from './components/Client/FixedRideChat';
import { FixedRideGpsMap } from './components/Client/FixedRideGpsMap';

import { DriverRegistration } from './components/Driver/DriverRegistration';
import { DriverInstaPay } from './components/Driver/DriverInstaPay';

import { AdminDashboard } from './components/Admin/AdminDashboard';

export default function App() {
  // Main Navigation Tabs
  const [activeTab, setActiveTab] = useState<MainTab>('client');

  // Client Screens
  const [clientScreen, setClientScreen] = useState<ClientScreen>('splash');

  // Shared Application Data
  const [schoolRoutes, setSchoolRoutes] = useState<SchoolRoute[]>(INITIAL_SCHOOL_ROUTES);
  const [selectedSchoolRoute, setSelectedSchoolRoute] = useState<SchoolRoute>(
    INITIAL_SCHOOL_ROUTES[0]
  );
  const [schoolBooking, setSchoolBooking] = useState<SchoolBookingData | null>(null);

  // Fixed Ride Data
  const [fixedRide, setFixedRide] = useState<FixedRideData | null>(null);

  // Negotiation Modal
  const [selectedVehicleForNegotiation, setSelectedVehicleForNegotiation] =
    useState<VehicleOption | null>(null);
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false);

  // Chat Histories
  const [schoolChatMessages, setSchoolChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'driver',
      senderName: 'الكابتن محمد السيد',
      text: 'صباح الخير يا فندم. تم استلام بيانات الطالب وعنوان الاستلام، ومستعدين بكرة في المعاد.',
      timestamp: '08:30 ص',
    },
  ]);

  const [fixedChatMessages, setFixedChatMessages] = useState<ChatMessage[]>([
    {
      id: 'fm1',
      sender: 'driver',
      senderName: 'الكابتن أحمد',
      text: 'صباح الفل يا فندم! تم الاتفاق على السعر النهائي وبدء المشوار الثابت، ومستعد في المعاد بكرة بإذن الله.',
      timestamp: '09:00 ص',
    },
  ]);

  // Driver Applications List
  const [drivers, setDrivers] = useState<DriverApplication[]>(INITIAL_DRIVERS);
  const [driverScreen, setDriverScreen] = useState<'register' | 'instapay'>('register');

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // -------------------------------------------------------------
  // Client Handlers
  // -------------------------------------------------------------
  const handleSelectSchoolRoute = (route: SchoolRoute) => {
    setSelectedSchoolRoute(route);
    setClientScreen('school-booking');
  };

  const handleSubmitSchoolBooking = (booking: SchoolBookingData) => {
    setSchoolBooking(booking);
    showToast('تم الحجز بنجاح والانتقال لجروب الخط وتتبع الـ GPS الحقيقي ✔');
    setTimeout(() => {
      setClientScreen('school-chat');
    }, 800);
  };

  const handleSendSchoolChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      senderName: 'أنت',
      text,
      timestamp: new Date().toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSchoolChatMessages((prev) => [...prev, userMsg]);

    // Simulated Driver Response
    setTimeout(() => {
      const driverMsg: ChatMessage = {
        id: `drv-${Date.now()}`,
        sender: 'driver',
        senderName: selectedSchoolRoute.captainName,
        text: 'تمام يا فندم، وصلني كلامك ومستنيك في المعاد المحدد بكل أمان وطمأنينة.',
        timestamp: new Date().toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setSchoolChatMessages((prev) => [...prev, driverMsg]);
    }, 1200);
  };

  // Fixed Ride Handlers
  const handleSubmitFixedDetails = (from: string, to: string, dailyTime: string) => {
    setFixedRide({
      from,
      to,
      dailyTime,
    });
    setClientScreen('fixed-cars');
  };

  const handleSelectVehicleForNegotiation = (vehicle: VehicleOption) => {
    setSelectedVehicleForNegotiation(vehicle);
    setIsNegotiationOpen(true);
  };

  const handleAcceptNegotiationPrice = (vehicleName: string, price: number) => {
    setIsNegotiationOpen(false);
    setFixedRide((prev) => ({
      from: prev?.from || 'الشارع الرئيسي',
      to: prev?.to || 'مقر العمل',
      dailyTime: prev?.dailyTime || '08:00',
      selectedCarCategory: vehicleName,
      agreedPrice: price,
    }));

    showToast(`تم قبول السعر (${price} جنيه) والانتقال لمحادثة الكابتن ✔`);
    setTimeout(() => {
      setClientScreen('fixed-chat');
    }, 800);
  };

  const handleProposeNewPrice = (vehicleName: string, newPrice: number) => {
    setIsNegotiationOpen(false);
    setFixedRide((prev) => ({
      from: prev?.from || 'الشارع الرئيسي',
      to: prev?.to || 'مقر العمل',
      dailyTime: prev?.dailyTime || '08:00',
      selectedCarCategory: vehicleName,
      agreedPrice: newPrice,
    }));

    showToast(`تم إرسال عرضك الجديد (${newPrice} جنيه) للكابتن للموافقة ✔`);
    setTimeout(() => {
      setClientScreen('fixed-chat');
    }, 800);
  };

  const handleSendFixedChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `fusr-${Date.now()}`,
      sender: 'user',
      senderName: 'أنت',
      text,
      timestamp: new Date().toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setFixedChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = 'تمام يا فندم، علم ومتفقين إن شاء الله.';
      const lowerText = text.toLowerCase();

      if (
        lowerText.includes('متأخر') ||
        lowerText.includes('بسرعة') ||
        lowerText.includes('الساعة')
      ) {
        replyText =
          'ولا تقلق خالص يا فندم، هكون قدام البيت في المعاد بالضبط وفي الميعاد المحدد تماماً.';
      } else if (
        lowerText.includes('فين') ||
        lowerText.includes('وصلت') ||
        lowerText.includes('الطريق')
      ) {
        replyText =
          'أنا في الطريق وجاي على نقطة التحرك حالا، ومتابع الـ GPS معاك.';
      } else if (lowerText.includes('شكرا') || lowerText.includes('تسلم')) {
        replyText = 'العفو يا فندم تحت أمرك، دي خدمة تريحك دايماً.';
      }

      const driverMsg: ChatMessage = {
        id: `fdrv-${Date.now()}`,
        sender: 'driver',
        senderName: 'الكابتن أحمد',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setFixedChatMessages((prev) => [...prev, driverMsg]);
    }, 1200);
  };

  // -------------------------------------------------------------
  // Driver Onboarding Handlers
  // -------------------------------------------------------------
  const handleGoToInstaPay = (driverInfo: {
    fullName: string;
    phone: string;
    governorate: string;
    vehicleModel: string;
    nationalIdFile: string;
    licenseFile: string;
  }) => {
    const newApp: DriverApplication = {
      id: `drv-${Date.now()}`,
      fullName: driverInfo.fullName,
      phone: driverInfo.phone,
      governorate: driverInfo.governorate,
      vehicleModel: driverInfo.vehicleModel,
      nationalIdUploaded: true,
      nationalIdFileName: driverInfo.nationalIdFile,
      licenseUploaded: true,
      licenseFileName: driverInfo.licenseFile,
      status: 'pending',
      submittedAt: 'الآن',
    };

    setDrivers((prev) => [newApp, ...prev]);
    showToast('جاري حفظ المستندات والانتقال لدفع رسوم التفعيل...');
    setTimeout(() => {
      setDriverScreen('instapay');
    }, 1000);
  };

  const handleSubmitInstaPayPayment = (refNumber: string) => {
    setDrivers((prev) =>
      prev.map((d, index) =>
        index === 0 ? { ...d, instaPayReference: refNumber } : d
      )
    );
    showToast('تم إرسال إيصال الدفع للأدمن بنجاح وفي انتظار التفعيل ✔');
  };

  // -------------------------------------------------------------
  // Admin Handlers
  // -------------------------------------------------------------
  const handleApproveDriver = (id: string) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'approved' } : d))
    );
    showToast('تمت الموافقة وتفعيل الكابتن بنجاح ✔');
  };

  const handleRejectDriver = (id: string) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'rejected' } : d))
    );
    showToast('تم رفض طلب السائق');
  };

  const handleAddSchoolRoute = (newRoute: Omit<SchoolRoute, 'id'>) => {
    const created: SchoolRoute = {
      ...newRoute,
      id: `route-${Date.now()}`,
    };
    setSchoolRoutes((prev) => [created, ...prev]);
    showToast('تمت إضافة خط المدرسة الجديد بنجاح ✔');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0dcd0] flex justify-center items-start sm:py-6">
      <div className="w-full max-w-md bg-[#050505] min-h-screen sm:min-h-[90vh] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-white/10">
        {/* Top Header Navigation Tabs */}
        <HeaderNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Screen Area */}
        <main className="flex-1 overflow-y-auto bg-[#050505] pb-6">
          {/* TAB 1: CLIENT APPLICATION */}
          {activeTab === 'client' && (
            <>
              {clientScreen === 'splash' && (
                <ClientSplashScreen
                  onStartClient={() => setClientScreen('home')}
                  onStartDriver={() => setActiveTab('driver')}
                />
              )}

              {clientScreen === 'home' && (
                <ClientHome
                  onSelectSchoolService={() => setClientScreen('school-routes')}
                  onSelectFixedRideService={() => setClientScreen('fixed-details')}
                />
              )}

              {clientScreen === 'school-routes' && (
                <SchoolRoutes
                  routes={schoolRoutes}
                  onBack={() => setClientScreen('home')}
                  onSelectRoute={handleSelectSchoolRoute}
                />
              )}

              {clientScreen === 'school-booking' && (
                <SchoolBooking
                  route={selectedSchoolRoute}
                  onBack={() => setClientScreen('school-routes')}
                  onSubmitBooking={handleSubmitSchoolBooking}
                />
              )}

              {clientScreen === 'school-chat' && (
                <SchoolChat
                  route={selectedSchoolRoute}
                  booking={schoolBooking}
                  messages={schoolChatMessages}
                  onSendMessage={handleSendSchoolChatMessage}
                  onOpenGpsMap={() => setClientScreen('school-gps')}
                  onBack={() => setClientScreen('school-routes')}
                />
              )}

              {clientScreen === 'school-gps' && (
                <SchoolGpsMap
                  route={selectedSchoolRoute}
                  booking={schoolBooking}
                  onBack={() => setClientScreen('school-chat')}
                  onShowToast={showToast}
                />
              )}

              {clientScreen === 'fixed-details' && (
                <FixedRideDetails
                  onBack={() => setClientScreen('home')}
                  onSubmitDetails={handleSubmitFixedDetails}
                />
              )}

              {clientScreen === 'fixed-cars' && (
                <FixedRideCars
                  vehicles={VEHICLE_OPTIONS}
                  onBack={() => setClientScreen('fixed-details')}
                  onSelectVehicle={handleSelectVehicleForNegotiation}
                />
              )}

              {clientScreen === 'fixed-chat' && (
                <FixedRideChat
                  rideData={fixedRide}
                  messages={fixedChatMessages}
                  onSendMessage={handleSendFixedChatMessage}
                  onOpenGpsMap={() => setClientScreen('fixed-gps')}
                  onBack={() => setClientScreen('fixed-cars')}
                />
              )}

              {clientScreen === 'fixed-gps' && (
                <FixedRideGpsMap
                  rideData={fixedRide}
                  onBack={() => setClientScreen('fixed-chat')}
                  onShowToast={showToast}
                />
              )}
            </>
          )}

          {/* TAB 2: DRIVER ONBOARDING */}
          {activeTab === 'driver' && (
            <>
              {driverScreen === 'register' ? (
                <DriverRegistration onGoToInstaPay={handleGoToInstaPay} />
              ) : (
                <DriverInstaPay
                  onBack={() => setDriverScreen('register')}
                  onSubmitPayment={handleSubmitInstaPayPayment}
                />
              )}
            </>
          )}

          {/* TAB 3: ADMIN CONTROL PANEL */}
          {activeTab === 'admin' && (
            <AdminDashboard
              drivers={drivers}
              routes={schoolRoutes}
              onApproveDriver={handleApproveDriver}
              onRejectDriver={handleRejectDriver}
              onAddSchoolRoute={handleAddSchoolRoute}
            />
          )}
        </main>

        {/* Price Offer Negotiation Modal */}
        <NegotiationModal
          vehicle={selectedVehicleForNegotiation}
          isOpen={isNegotiationOpen}
          onClose={() => setIsNegotiationOpen(false)}
          onAcceptPrice={handleAcceptNegotiationPrice}
          onProposeNewPrice={handleProposeNewPrice}
        />

        {/* Global Toast Notification */}
        <Toast message={toastMessage} />
      </div>
    </div>
  );
}

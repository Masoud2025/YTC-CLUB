'use client';
// components/JobMarketplace.tsx
import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import './IransansFont.css';

// Define types for form data
interface JobFormData {
  jobTitle: string;
  jobDescription: string;
  requirements: string;
  salary: string;
  contactInfo: string;
}

// Define props for the wizard component
interface JobPostingWizardProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  closeModal: () => void;
}

// Wizard form steps component
const JobPostingWizard: React.FC<JobPostingWizardProps> = ({
  currentStep,
  setCurrentStep,
  closeModal,
}) => {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    jobDescription: '',
    requirements: '',
    salary: '',
    contactInfo: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('آگهی شما با موفقیت ثبت شد!');
    closeModal();
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          ثبت آگهی استخدام
        </h3>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-white p-2 -m-2"
        >
          <FaTimes size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-between mb-6 sm:mb-8">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                step === currentStep
                  ? 'bg-[#0165FC] text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {step}
            </div>
            <span className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-300 text-center px-1">
              {step === 1
                ? 'اطلاعات شغل'
                : step === 2
                ? 'جزئیات'
                : 'تایید نهایی'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-white mb-2 text-sm sm:text-base">
                عنوان شغل
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-[#353737] rounded-lg text-white text-sm sm:text-base"
                placeholder="مثال: ادیتور ویدیو"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-sm sm:text-base">
                توضیحات شغل
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-[#353737] rounded-lg text-white h-24 sm:h-32 text-sm sm:text-base resize-none"
                placeholder="توضیحات کامل درباره موقعیت شغلی"
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-white mb-2 text-sm sm:text-base">
                مهارت‌ها و نیازمندی‌ها
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-[#353737] rounded-lg text-white h-24 sm:h-32 text-sm sm:text-base resize-none"
                placeholder="مهارت‌ها و تجربیات مورد نیاز"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-sm sm:text-base">
                حقوق پیشنهادی
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-[#353737] rounded-lg text-white text-sm sm:text-base"
                placeholder="مثال: توافقی یا از X تا Y تومان"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-white mb-2 text-sm sm:text-base">
                اطلاعات تماس
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-[#353737] rounded-lg text-white text-sm sm:text-base"
                placeholder="ایمیل یا شماره تماس"
                required
              />
            </div>
            <div className="bg-[#353737] p-3 sm:p-4 rounded-lg">
              <h4 className="text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">
                پیش نمایش آگهی
              </h4>
              <div className="text-gray-300 space-y-2 text-xs sm:text-sm">
                <p>
                  <strong>عنوان:</strong> {formData.jobTitle || 'نامشخص'}
                </p>
                <p>
                  <strong>توضیحات:</strong>{' '}
                  {formData.jobDescription || 'نامشخص'}
                </p>
                <p>
                  <strong>نیازمندی‌ها:</strong>{' '}
                  {formData.requirements || 'نامشخص'}
                </p>
                <p>
                  <strong>حقوق:</strong> {formData.salary || 'نامشخص'}
                </p>
                <p>
                  <strong>تماس:</strong> {formData.contactInfo || 'نامشخص'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm sm:text-base order-2 sm:order-1"
            >
              مرحله قبل
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#0165FC] text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base order-1 sm:order-2"
            >
              مرحله بعد
            </button>
          ) : (
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base order-1 sm:order-2"
            >
              ثبت آگهی
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const JobMarketplace: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1); // Reset to first step when opening
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToJobFinder = () => {
    router.push('/job_finder');
  };

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 font-[vazir]"
      dir="rtl"
    >
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-white leading-tight">
          بازار کار یوتیوب کلاب
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-4xl mx-auto px-2 leading-relaxed">
          فرصت‌های شغلی مرتبط با تولید محتوا و یوتیوب را در اینجا پیدا کنید یا
          آگهی استخدام خود را ثبت کنید
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Job Seeker Button */}
        <div
          onClick={goToJobFinder}
          className="w-full h-[120px] xs:h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px] xl:h-[280px] bg-[#242525] rounded-xl flex overflow-hidden hover:bg-[#0165FC] transition-all duration-300 cursor-pointer group"
        >
          {/* Left side - Text - Dynamic width based on screen size */}
          <div className="w-5/6 xs:w-4/5 sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="IranSans text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-white leading-tight">
              کارجو هستم
            </h3>
            <p className="text-white text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 xs:mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-relaxed">
              به دنبال فرصت‌های شغلی در حوزه تولید محتوا و یوتیوب
            </p>
            <div className="flex items-center text-white text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl group-hover:scale-105 transition-transform">
              <FaSearch className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base lg:text-lg" />
              <span>مشاهده فرصت‌های شغلی</span>
            </div>
          </div>

          {/* Right side - Image - Shows complete image without cropping */}
          <div className="w-1/6 xs:w-1/5 sm:w-1/4 md:w-1/3 lg:w-2/5 xl:w-1/2 relative flex items-center justify-center p-1 sm:p-2 md:p-3">
            <Image
              src="/karjohastam.png"
              alt="Job Seeker"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 475px) 17vw, (max-width: 640px) 20vw, (max-width: 768px) 25vw, (max-width: 1024px) 33vw, (max-width: 1280px) 40vw, 50vw"
            />
          </div>
        </div>

        {/* Employer Button */}
        <div
          onClick={openModal}
          className="w-full h-[120px] xs:h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px] xl:h-[280px] bg-[#242525] rounded-xl flex overflow-hidden hover:bg-[#0165FC] transition-all duration-300 cursor-pointer group"
        >
          {/* Left side - Text - Dynamic width based on screen size */}
          <div className="w-5/6 xs:w-4/5 sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="IranSans text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-white leading-tight">
              کارفرما هستم
            </h3>
            <p className="text-white text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 xs:mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-relaxed">
              ثبت آگهی استخدام و جذب متخصصان حوزه تولید محتوا
            </p>
            <div className="flex items-center text-white text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl group-hover:scale-105 transition-transform">
              <FaEdit className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base lg:text-lg" />
              <span>ثبت آگهی استخدام</span>
            </div>
          </div>

          {/* Right side - Image - Shows complete image without cropping */}
          <div className="w-1/6 xs:w-1/5 sm:w-1/4 md:w-1/3 lg:w-2/5 xl:w-1/2 relative flex items-center justify-center p-1 sm:p-2 md:p-3">
            <Image
              src="/employe.png"
              alt="Employer"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 475px) 17vw, (max-width: 640px) 20vw, (max-width: 768px) 25vw, (max-width: 1024px) 33vw, (max-width: 1280px) 40vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Modal with job posting wizard */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black bg-opacity-70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#242525] rounded-xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <JobPostingWizard
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                closeModal={closeModal}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default JobMarketplace;

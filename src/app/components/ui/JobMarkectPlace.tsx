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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">ثبت آگهی استخدام</h3>
        <button onClick={closeModal} className="text-gray-400 hover:text-white">
          <FaTimes size={24} />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? 'bg-[#0165FC] text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {step}
            </div>
            <span className="text-sm mt-2 text-gray-300">
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
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">عنوان شغل</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-3 bg-[#353737] rounded-lg text-white"
                placeholder="مثال: ادیتور ویدیو"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">توضیحات شغل</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                className="w-full p-3 bg-[#353737] rounded-lg text-white h-32"
                placeholder="توضیحات کامل درباره موقعیت شغلی"
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">
                مهارت‌ها و نیازمندی‌ها
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full p-3 bg-[#353737] rounded-lg text-white h-32"
                placeholder="مهارت‌ها و تجربیات مورد نیاز"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">حقوق پیشنهادی</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 bg-[#353737] rounded-lg text-white"
                placeholder="مثال: توافقی یا از X تا Y تومان"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">اطلاعات تماس</label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full p-3 bg-[#353737] rounded-lg text-white"
                placeholder="ایمیل یا شماره تماس"
                required
              />
            </div>
            <div className="bg-[#353737] p-4 rounded-lg">
              <h4 className="text-white font-bold mb-2">پیش نمایش آگهی</h4>
              <div className="text-gray-300">
                <p>
                  <strong>عنوان:</strong> {formData.jobTitle}
                </p>
                <p>
                  <strong>توضیحات:</strong> {formData.jobDescription}
                </p>
                <p>
                  <strong>نیازمندی‌ها:</strong> {formData.requirements}
                </p>
                <p>
                  <strong>حقوق:</strong> {formData.salary}
                </p>
                <p>
                  <strong>تماس:</strong> {formData.contactInfo}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              مرحله قبل
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-[#0165FC] text-white rounded-lg hover:bg-blue-700"
            >
              مرحله بعد
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
    <section className="py-24 px-6 font-[vazir]" dir="rtl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 text-white">
          بازار کار یوتیوب کلاب
        </h2>
        <p className="text-lg text-white max-w-3xl mx-auto">
          فرصت‌های شغلی مرتبط با تولید محتوا و یوتیوب را در اینجا پیدا کنید یا
          آگهی استخدام خود را ثبت کنید
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-10">
        {/* Job Seeker Button */}
        <div
          onClick={goToJobFinder}
          className="w-full md:w-[633px] h-[274px] bg-[#242525] rounded-xl flex overflow-hidden hover:bg-[#0165FC] transition-colors cursor-pointer"
        >
          {/* Left side - Text */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h3 className="IranSans text-2xl font-bold mb-3 text-white">
              کارجو هستم
            </h3>
            <p className="text-white mb-6">
              به دنبال فرصت‌های شغلی در حوزه تولید محتوا و یوتیوب
            </p>
            <div className="flex items-center text-white">
              <FaSearch className="ml-2" />
              <span>مشاهده فرصت‌های شغلی</span>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-1/2 relative">
            <Image
              src="/karjohastam.png"
              alt="Job Seeker"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Employer Button */}
        <div
          onClick={openModal}
          className="w-full md:w-[633px] h-[274px] bg-[#242525] rounded-xl flex overflow-hidden hover:bg-[#0165FC] transition-colors cursor-pointer"
        >
          {/* Left side - Text */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h3 className="IranSans text-2xl font-bold mb-3 text-white">
              کارفرما هستم
            </h3>
            <p className="text-white mb-6">
              ثبت آگهی استخدام و جذب متخصصان حوزه تولید محتوا
            </p>
            <div className="flex items-center text-white">
              <FaEdit className="ml-2" />
              <span>ثبت آگهی استخدام</span>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-1/2 relative">
            <Image
              src="/employe.png"
              alt="Employer"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Modal with job posting wizard */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#242525] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
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

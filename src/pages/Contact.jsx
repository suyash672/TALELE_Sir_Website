import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle, Phone, MapPin, Building2, Briefcase } from 'lucide-react';
import Button from '../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status when user starts typing
    if (submitStatus) setSubmitStatus(null);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setSubmitStatus('error');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setSubmitStatus('error');
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus('error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ fullName: '', email: '', message: '' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          {/* <div className="mb-8 lg:mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or want to connect? Send a message and I'll get back to you as soon as possible.
            </p>
          </div> */}

          {/* Two Card Layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Card - Professor Information */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-linear-to-br from-teal-50/50 via-white to-cyan-50/30 p-6 lg:p-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Contact Information
                </h2>
                <p className="text-gray-600">
                  Reach out directly using the information below
                </p>
              </div>

              <div className="p-6 lg:p-8 space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-900">
                    <User className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold text-lg">Dr. Kiran TALELE</p>
                    </div>
                  </div>
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-gray-700">
                    <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Dean of Students, Alumni & External Relations</p>
                    </div>
                  </div>
                </div>

                {/* Institute */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-gray-700">
                    <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Bharatiya Vidya Bhavans' Sardar Patel Institute of Technology</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Andheri, Mumbai</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <a
                      href="mailto:kiran.TALELE@spit.ac.in"
                      className="text-teal-600 hover:text-teal-700 transition-colors font-medium hover:underline"
                    >
                      kiran.talele@spit.ac.in
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium">+91 (Contact for phone number)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card - Message Form */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-linear-to-br from-teal-50/50 via-white to-cyan-50/30 p-6 lg:p-8 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Send a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below to send an email
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-gray-900 placeholder-gray-400"
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-sm font-medium">Your message has been sent successfully.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <p className="text-sm font-medium">Something went wrong. Please try again later.</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full px-8 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;


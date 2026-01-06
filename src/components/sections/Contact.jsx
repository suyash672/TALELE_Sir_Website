import React from 'react';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <footer className="bg-gradient-to-b from-teal-50 to-white border-t border-teal-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Professor Info */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-teal-900">Dr. Kiran TALELE</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Dean of Students, Alumni & External Relations
                <br />
                Bharatiya Vidya Bhavans' Sardar Patel Institute of Technology
                <br />
                Andheri, Mumbai
              </p>
            </div>

            {/* Right Column - Contact */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-teal-900">Contact</h3>
              <a
                href="mailto:kiran.TALELE@spit.ac.in"
                className="flex items-center gap-3 text-teal-600 hover:text-teal-700 transition-colors group cursor-pointer"
              >
                <div className="p-2 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium text-base">kiran.talele@spit.ac.in</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-teal-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-base text-gray-600">
              <p>© {new Date().getFullYear()} Dr. Kiran TALELE. All rights reserved.</p>
              <div className="text-center md:text-right">
                <p>
                  Developed by <span className="font-semibold text-teal-700">Vansh Parate</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;


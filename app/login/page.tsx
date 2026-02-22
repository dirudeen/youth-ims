import { LoginForm } from "@/components/forms/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg p-2">
              <Image
                width={600}
                height={600}
                src="/images/moys-logo.jpg"
                alt="Ministry of Youth and Sports Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-800">Youth IMS</h1>
              <p className="text-xl text-gray-600">
                Information Management System
              </p>
              <div className="w-16 h-1 bg-linear-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
            </div>
          </div>
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-700">
              Department of Youth and Sports
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Empowering youth through comprehensive data management and
              strategic development initiatives across The Gambia.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Secure • Reliable • Efficient</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-red-800 leading-relaxed">
              Supported by: Actionaid International The Gambia
            </p>
            <p className="text-red-800 leading-relaxed">
              Financed through: The Youth Promotion Initiative (YPI), a
              Peacebuilding Fund (PBF) Project
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}

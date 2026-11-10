import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  School, Lock, Mail, ArrowRight, ShieldCheck, 
  Sparkles, GraduationCap, CheckCircle2, User 
} from 'lucide-react';

interface LoginViewProps {
  onSuccess?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSuccess }) => {
  const { users, login, switchUser } = useAuth();

  const [emailInput, setEmailInput] = useState('Hoc.teacher@gmail.com');
  const [passwordInput, setPasswordInput] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const targetUser = users.find(
      u => u.email.toLowerCase() === emailInput.trim().toLowerCase() ||
           u.code.toLowerCase() === emailInput.trim().toLowerCase()
    );

    if (targetUser) {
      switchUser(targetUser.id);
      onSuccess?.();
    } else {
      setErrorMsg('Không tìm thấy tài khoản với email hoặc mã định danh này.');
    }
  };

  const handleQuickTeacherLogin = () => {
    const teacher = users.find(u => u.email.toLowerCase() === 'hoc.teacher@gmail.com') ||
                    users.find(u => u.role === 'teacher');
    if (teacher) {
      switchUser(teacher.id);
      onSuccess?.();
    }
  };

  const handleQuickStudentLogin = () => {
    const student = users.find(u => u.role === 'student');
    if (student) {
      switchUser(student.id);
      onSuccess?.();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-4">
            <School className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-800 tracking-tight">
            E-LEARNING <span className="text-emerald-600">SCHOOL</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Hệ Thống Quản Lý Học Tập Trực Tuyến Tiểu Học
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-heading font-bold text-lg text-slate-800">
              Đăng nhập hệ thống
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dành cho Giáo viên, Cán bộ quản lý và Học sinh
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email hoặc Mã định danh
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Hoc.teacher@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Đăng nhập</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Authentic Quick Sign-in Shortcuts */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Tài khoản xác thực chính thức:
            </span>

            <button
              type="button"
              onClick={handleQuickTeacherLogin}
              className="w-full p-2.5 bg-emerald-50 hover:bg-emerald-100/80 rounded-xl border border-emerald-200 text-left flex items-center space-x-3 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                GV
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-emerald-950">
                  Thầy Nguyễn Văn Học (Giáo viên)
                </div>
                <div className="text-[11px] text-emerald-700 truncate font-mono">
                  Hoc.teacher@gmail.com
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={handleQuickStudentLogin}
              className="w-full p-2.5 bg-blue-50 hover:bg-blue-100/80 rounded-xl border border-blue-200 text-left flex items-center space-x-3 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                HS
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-blue-950">
                  Em Nguyễn An Nhiên (Học sinh Lớp 3A)
                </div>
                <div className="text-[11px] text-blue-700 truncate font-mono">
                  hocsinh@th-tieuhoc.edu.vn
                </div>
              </div>
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">
          Trường Tiểu học Lê Văn Tám • Hệ thống Học tập Trực tuyến Chuẩn GDPT 2018
        </p>
      </div>
    </div>
  );
};

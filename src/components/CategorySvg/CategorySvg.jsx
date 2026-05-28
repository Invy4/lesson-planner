import React from 'react';

export default function CategorySvg({ category, className = "" }) {
  if (category === 'Science') {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#F0F9FF" />
        <path d="M42 30H58V36L68 56C72 64 66 70 58 70H42C34 70 28 64 32 56L42 36V30Z" stroke="#0369A1" strokeWidth="4" strokeLinejoin="round" fill="#BAE6FD" />
        <line x1="39" y1="30" x2="61" y2="30" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="58" r="6" fill="#0369A1" />
        <circle cx="42" cy="62" r="4" fill="#0369A1" />
        <circle cx="58" cy="62" r="3" fill="#0369A1" />
        <circle cx="46" cy="42" r="3" fill="#0284C7" opacity="0.6" />
        <circle cx="54" cy="46" r="4" fill="#0284C7" opacity="0.6" />
        <path d="M70 25L75 30M75 25L70 30" stroke="#E2B007" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 38L30 42M30 38L26 42" stroke="#E2B007" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (category === 'Art') {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#FDF2F8" />
        <path d="M30 60C30 43.4315 43.4315 30 60 30C68.2843 30 75.7843 33.3579 81.2132 38.7868C86.6421 44.2157 90 51.7157 90 60C90 76.5685 76.5685 90 60 90C43.4315 90 30 76.5685 30 60Z" stroke="#BE185D" strokeWidth="4" fill="#FBCFE8" />
        <circle cx="48" cy="48" r="6" fill="#DC2626" />
        <circle cx="65" cy="42" r="6" fill="#E2B007" />
        <circle cx="75" cy="56" r="6" fill="#0284C7" />
        <circle cx="68" cy="72" r="6" fill="#059669" />
        <circle cx="50" cy="72" r="6" fill="#6D28D9" />
        <path d="M22 68L50 40L60 50L32 78" stroke="#BE185D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#FAF9F6" />
        <path d="M22 68C20 70 16 78 16 80C18 80 26 76 28 74" stroke="#BE185D" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (category === 'Music') {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#FFFBEB" />
        <circle cx="34" cy="66" r="10" stroke="#B45309" strokeWidth="4" fill="#FEF3C7" />
        <path d="M44 66V26H78V60" stroke="#B45309" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="68" cy="60" r="10" stroke="#B45309" strokeWidth="4" fill="#FEF3C7" />
        <line x1="44" y1="38" x2="78" y2="38" stroke="#B45309" strokeWidth="4" />
        <path d="M16 28Q22 24 28 28T40 28" stroke="#E2B007" strokeWidth="3" strokeLinecap="round" />
        <path d="M68 20Q74 16 80 20T92 20" stroke="#E2B007" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (category === 'Reading') {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#F5F3FF" />
        <path d="M18 74V26C18 22 22 18 26 18H50V78H26C22 78 18 74 18 74Z" stroke="#6D28D9" strokeWidth="4" fill="#DDD6FE" strokeLinejoin="round" />
        <path d="M82 74V26C82 22 78 18 74 18H50V78H74C78 78 82 74 82 74Z" stroke="#6D28D9" strokeWidth="4" fill="#DDD6FE" strokeLinejoin="round" />
        <path d="M18 74C18 74 24 70 30 70H50V78H30C24 78 18 74 18 74Z" stroke="#6D28D9" strokeWidth="4" fill="white" strokeLinejoin="round" />
        <path d="M82 74C82 74 76 70 70 70H50V78H70C76 78 82 74 82 74Z" stroke="#6D28D9" strokeWidth="4" fill="white" strokeLinejoin="round" />
        <line x1="28" y1="32" x2="42" y2="32" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="44" x2="42" y2="44" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
        <line x1="28" y1="56" x2="42" y2="56" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="32" x2="72" y2="32" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="44" x2="72" y2="44" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="56" x2="72" y2="56" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  // Default 'Play'
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#F0FDF4" />
      <rect x="22" y="44" width="22" height="34" rx="4" stroke="#15803D" strokeWidth="4" fill="#BBF7D0" />
      <rect x="44" y="22" width="22" height="56" rx="4" stroke="#15803D" strokeWidth="4" fill="#86EFAC" />
      <rect x="66" y="52" width="22" height="26" rx="4" stroke="#15803D" strokeWidth="4" fill="#4ADE80" />
      <circle cx="77" cy="30" r="10" stroke="#E2B007" strokeWidth="4" fill="#FEF3C7" />
      <path d="M16 86H84" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

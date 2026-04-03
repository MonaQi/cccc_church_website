
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import englishLogo from './assets/english_logo.jpg';
import chineseLogo from './assets/chinese_logo.jpg';
import activitiesImg from './assets/Activities.jpg';
import massScheduleImg from './assets/mass_schedule.jpg';
import profileImg from './assets/profile.jpg';

import {
  Menu,
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  Globe,
  Users,
  BookOpen,
  Heart,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Language = 'en' | 'zh';

interface Translation {
  nav: {
    home: string;
    mass: string;
    about: string;
    activities: string;
    gallery: string;
    contact: string;
    newsletter: string;
  };
  hero: {
    title: string;
    subtitle: string;
    welcome: string;
    ctaMass: string;
    ctaContact: string;
  };
  mass: {
    title: string;
    time: string;
    location: string;
    viewMap: string;
    posterTitle: string;
    posterPlaceholder: string;
  };
  about: {
    title: string;
    overview: string;
    journey: string;
    pastoral: string;
    contactPerson: string;
    welcomeMsg: string;
  };
  activities: {
    title: string;
    alpha: { name: string; desc: string };
    bible: { name: string; desc: string };
    catechism: { name: string; desc: string };
    legion: { name: string; desc: string };
    youth: { name: string; desc: string; status: string };
  };
  gallery: {
    title: string;
    comingSoon: string;
  };
  contact: {
    title: string;
    welcome: string;
    formName: string;
    formEmail: string;
    formLang: string;
    formMsg: string;
    formSubmit: string;
    languages: string;
  };
  newsletter: {
    title: string;
    placeholder: string;
  };
  footer: {
    rights: string;
  };
}

// --- Content ---
const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      mass: 'Mass Time',
      about: 'About Us',
      activities: 'Activities',
      gallery: 'Gallery',
      contact: 'Contact',
      newsletter: 'Newsletter',
    },
    hero: {
      title: 'Christchurch Catholic Chinese Community',
      subtitle: '基督城华人天主教团体',
      welcome: 'A warm, welcoming home for Chinese Catholics in Christchurch.',
      ctaMass: 'View Mass Time',
      ctaContact: 'Contact Us',
    },
    mass: {
      title: 'Chinese Mass Time',
      time: 'First Sunday of every month, 2:30 PM',
      location: 'St Bernadette’s Catholic Church',
      viewMap: 'View Map',
      posterTitle: 'Announcements',
      posterPlaceholder: 'Upcoming event posters will be displayed here.',
    },
    about: {
      title: 'About Us',
      overview: 'Christchurch Catholic Chinese Community (CCCC) belongs to the Roman Catholic Diocese of Christchurch and supports the Diocese in its pastoral mission among Chinese Catholics. The community mainly serves Chinese-speaking Catholics from Mainland China, Taiwan, Hong Kong, Macau, Singapore, Malaysia, Indonesia, and other places, providing faith formation, spiritual activities, and a platform for cultural exchange rooted in Chinese tradition.',
      journey: 'In 2014, Fr Clement Covacho noticed that many Chinese Catholic immigrants experienced language difficulties when attending English Masses. To respond to their pastoral needs, he sought permission from the then Bishop of Christchurch, Barry Jones, to celebrate a Chinese Christmas Mass. Through the efforts of Fr Clement and the support of parishioners, the community gradually took shape.',
      pastoral: 'At present, the community celebrates one Chinese Mass each month and organizes various faith formation activities, including the Chinese Alpha Course, Bible sharing, catechetical teaching, and the Legion of Mary.',
      contactPerson: 'Contact Person: Angeline Wong (0211918001)',
      welcomeMsg: 'We warmly welcome all Chinese Catholics and anyone interested in the Catholic faith to join us in prayer, fellowship, and spiritual growth.',
    },
    activities: {
      title: 'Activities & Events',
      alpha: { name: 'Chinese Alpha Course', desc: 'Explore the basics of the Christian faith in a friendly, open environment.' },
      bible: { name: 'Bible Sharing', desc: 'Deepen your understanding of the Word of God through communal reflection.' },
      catechism: { name: 'Catechetical Teaching', desc: 'Structured learning about the Catholic faith and traditions.' },
      legion: { name: 'Legion of Mary', desc: 'A lay apostolic association serving the Church through prayer and service.' },
      youth: { name: 'Youth Community', desc: 'A space for the younger generation to grow in faith together.', status: 'To be developed' },
    },
    gallery: {
      title: 'Gallery',
      comingSoon: 'Coming Soon',
    },
    contact: {
      title: 'Contact Us',
      welcome: 'We would love to hear from you. Whether you are a newcomer or interested in learning about the Catholic faith, please reach out.',
      formName: 'Name',
      formEmail: 'Email / Phone',
      formLang: 'Language Preference',
      formMsg: 'Message',
      formSubmit: 'Send Message',
      languages: 'Language Support: Mandarin, Cantonese, English',
    },
    newsletter: {
      title: 'Father’s Talk / Newsletter',
      placeholder: 'Father Su’s reflections and community updates will be shared here.',
    },
    footer: {
      rights: 'All Rights Reserved.',
    },
  },
  zh: {
    nav: {
      home: '首页',
      mass: '弥撒时间',
      about: '关于我们',
      activities: '团体活动',
      gallery: '相册',
      contact: '联系我们',
      newsletter: '神父寄语',
    },
    hero: {
      title: '基督城华人天主教团体',
      subtitle: 'Christchurch Catholic Chinese Community',
      welcome: '欢迎来到基督城华人天主教团体的大家庭。',
      ctaMass: '查看弥撒时间',
      ctaContact: '联系我们',
    },
    mass: {
      title: '华语弥撒时间',
      time: '每月第一个主日，下午 2:30',
      location: 'St Bernadette’s Catholic Church',
      viewMap: '查看地图',
      posterTitle: '活动公告',
      posterPlaceholder: '未来的活动海报将在此展示。',
    },
    about: {
      title: '关于我们',
      overview: '基督城华人天主教团体 (CCCC) 隶属于天主教基督城教区，支持教区在华人教友中的牧灵使命。团体主要服务来自中国大陆、台湾、香港、澳门、新加坡、马来西亚、印度尼西亚等地的华语教友，提供信仰培育、灵性活动以及植根于中华传统的文化交流平台。',
      journey: '2014年，Clement Covacho 神父注意到许多华人教友在参加英语弥撒时遇到语言困难。为了响应他们的牧灵需求，他向当时的基督城主教 Barry Jones 申请举行华语圣诞弥撒。在神父和教友的共同努力下，团体逐渐成形。',
      pastoral: '目前，团体每月举行一次华语弥撒，并组织各种信仰培育活动，包括华语启发布道会、圣经分享、教理讲授和圣母军等。',
      contactPerson: '联系人：Angeline Wong (0211918001)',
      welcomeMsg: '我们热烈欢迎所有华人教友以及任何对天主教信仰感兴趣的人加入我们的祈祷、团契和灵性成长。',
    },
    activities: {
      title: '活动与团体',
      alpha: { name: '华语启发布道会', desc: '在友好、开放的环境中探索基督信仰的基础。' },
      bible: { name: '圣经分享', desc: '通过共同反思，加深对天主圣言的理解。' },
      catechism: { name: '教理讲授', desc: '系统学习天主教信仰与传统。' },
      legion: { name: '圣母军', desc: '通过祈祷和服务为教会服务的教友使徒团体。' },
      youth: { name: '青年团体', desc: '为年轻一代提供的共同成长空间。', status: '开发中' },
    },
    gallery: {
      title: '精彩瞬间',
      comingSoon: '敬请期待',
    },
    contact: {
      title: '联系我们',
      welcome: '我们很乐意听到您的声音。无论您是新教友还是想了解天主教信仰，请随时联系我们。',
      formName: '姓名',
      formEmail: '邮箱 / 电话',
      formLang: '语言偏好',
      formMsg: '留言',
      formSubmit: '发送信息',
      languages: '语言支持：普通话、粤语、英语',
    },
    newsletter: {
      title: '神父寄语 / 通讯',
      placeholder: '苏神父的反思和社区更新将在此分享。',
    },
    footer: {
      rights: '版权所有。',
    },
  },
};

// --- Components ---

const Logo = ({
  src,
  alt,
  className = "w-12 h-12",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className={className}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain"
    />
  </div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-16">
    {subtitle && <p className="text-[10px] font-bold text-burgundy uppercase tracking-[0.3em] mb-4">{subtitle}</p>}
    <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">{children}</h2>
    <div className="w-12 h-[1px] bg-beige mx-auto" />
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'mass', label: t.nav.mass },
    { id: 'about', label: t.nav.about },
    { id: 'activities', label: t.nav.activities },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'newsletter', label: t.nav.newsletter },
    { id: 'contact', label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-light-stone selection:text-navy">

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollTo('home')}>

            <Logo
              src={lang === 'en' ? englishLogo : chineseLogo}
              alt="CCCC Logo"
              className="w-50 h-50 transition-transform group-hover:scale-105"
            />
            <div className="hidden md:block">
              <h1 className="text-xs font-bold text-navy leading-tight uppercase tracking-[0.2em]">CCCC</h1>
              <p className="text-[9px] text-grey font-medium uppercase tracking-wider">Christchurch Catholic Chinese Community</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60 hover:text-burgundy transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-light-stone text-[10px] font-bold uppercase tracking-widest hover:bg-light-stone transition-all"
            >
              <Globe className="w-3 h-3 text-navy" />
              {lang === 'en' ? '中文' : 'English'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="p-2 text-navy/60">
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-navy">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-2xl font-serif text-navy hover:text-burgundy transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={toggleLang}
                className="mt-4 text-sm font-bold uppercase tracking-widest text-burgundy"
              >
                {lang === 'en' ? '切换至中文' : 'Switch to English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-soft-white">
        <div className="absolute inset-0 z-0">
          <img
            src={profileImg}
            alt="Christchurch Catholic Chinese Community"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-soft-white/20 via-transparent to-white" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-8 max-w-5xl"
        >

          <h1 className="text-4xl md:text-7xl font-serif text-navy mb-6 leading-[1.1] tracking-tight">
            {t.hero.title}
          </h1>
          <h2 className="text-lg md:text-xl font-serif text-grey mb-12 font-light italic tracking-[0.1em]">
            {t.hero.subtitle}
          </h2>
          <div className="w-12 h-[1px] bg-beige mx-auto mb-12" />
          <p className="text-base md:text-lg text-navy/70 mb-16 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            {t.hero.welcome}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button
              onClick={() => scrollTo('mass')}
              className="w-full sm:w-auto px-12 py-5 bg-navy text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-navy/90 transition-all shadow-sm flex items-center justify-center gap-3"
            >
              <Clock className="w-3 h-3" />
              {t.hero.ctaMass}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="w-full sm:w-auto px-12 py-5 bg-transparent text-navy border border-navy/10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-light-stone transition-all flex items-center justify-center gap-3"
            >
              <Mail className="w-3 h-3" />
              {t.hero.ctaContact}
            </button>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight className="w-5 h-5 text-navy rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* --- Mass Time Section --- */}
      <section id="mass" className="py-32 px-8 max-w-7xl mx-auto">
        <SectionTitle subtitle="Holy Eucharist">{t.mass.title}</SectionTitle>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="bg-soft-white p-12 md:p-16 rounded-[2rem] flex flex-col justify-between border border-light-stone/50"
          >
            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 text-burgundy" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-navy mb-3 uppercase tracking-[0.2em]">{lang === 'en' ? 'Mass Schedule' : '弥撒安排'}</h3>
                  <p className="text-xl text-navy/80 font-serif">{t.mass.time}</p>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-burgundy" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-navy mb-3 uppercase tracking-[0.2em]">{lang === 'en' ? 'Location' : '地点'}</h3>
                  <p className="text-xl text-navy/80 font-serif">{t.mass.location}</p>
                  <p className="text-sm text-grey mt-2 font-light">76 Main South Road, Upper Riccarton, Christchurch</p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://maps.google.com/?q=St+Bernadette’s+Catholic+Church+Christchurch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-burgundy hover:text-navy transition-colors"
                >
                  {t.mass.viewMap} <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl overflow-hidden shadow-sm border border-light-stone flex items-center justify-center p-4">
              <img
                src={massScheduleImg}
                alt="Mass Schedule"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>


            <div className="mt-16 aspect-video bg-white rounded-2xl overflow-hidden relative shadow-sm border border-light-stone">
              <iframe
                title="Map"
                className="w-full h-full border-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.427674488426!2d172.564758376831!3d-43.53513476283594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d318a6666666667%3A0x8888888888888888!2sSt%20Bernadette's%20Catholic%20Church!5e0!3m2!1sen!2snz!4v1710000000000!5m2!1sen!2snz"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="bg-navy text-white p-12 md:p-16 rounded-[2rem] shadow-lg h-full">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-champagne">
                {t.mass.posterTitle}
              </h3>

              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={activitiesImg}
                  alt="Announcements"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section id="about" className="py-32 bg-soft-white">
        <div className="max-w-7xl mx-auto px-8">
          <SectionTitle subtitle="Our Journey">{t.about.title}</SectionTitle>

          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12 text-base md:text-lg text-grey leading-relaxed font-light">
              <p className="text-navy font-serif text-2xl italic leading-snug">
                {t.about.overview}
              </p>
              <p>{t.about.journey}</p>
              <p>{t.about.pastoral}</p>

              <div className="bg-white p-12 rounded-[2rem] border border-light-stone shadow-sm mt-16">
                <div className="flex items-center gap-4 mb-8">
                  <Heart className="w-5 h-5 text-burgundy" />
                  <h4 className="text-xs font-bold text-navy uppercase tracking-[0.2em]">
                    {lang === 'en' ? 'Welcome' : '欢迎'}
                  </h4>
                </div>
                <p className="italic mb-10 text-navy/70 font-serif text-xl">{t.about.welcomeMsg}</p>
                <div className="flex flex-col sm:flex-row gap-10 text-[10px] font-bold text-navy uppercase tracking-widest">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-burgundy/40" />
                    {t.about.contactPerson}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-1000">
                <img
                  src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=1000"
                  alt="Faith Community"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-[2rem] shadow-xl hidden md:block max-w-xs border border-light-stone">
                <p className="text-[9px] font-bold text-burgundy mb-4 uppercase tracking-[0.3em]">Community Life</p>
                <p className="text-xl font-serif italic leading-relaxed text-navy">"Where two or three are gathered in my name, I am there among them."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Activities Section --- */}
      <section id="activities" className="py-32 px-8 max-w-7xl mx-auto">
        <SectionTitle subtitle="Growing Together">{t.activities.title}</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { ...t.activities.alpha, icon: Globe },
            { ...t.activities.bible, icon: BookOpen },
            { ...t.activities.catechism, icon: Heart },
            { ...t.activities.legion, icon: Users },
            { ...t.activities.youth, icon: Calendar, isYouth: true },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[2.5rem] border border-light-stone flex flex-col h-full transition-all hover:shadow-xl hover:border-transparent"
            >
              <div className="w-12 h-12 bg-soft-white rounded-full flex items-center justify-center mb-10 border border-light-stone">
                <activity.icon className="w-5 h-5 text-navy/40" />
              </div>
              <h3 className="text-xs font-bold text-navy mb-6 uppercase tracking-[0.2em]">{activity.name}</h3>
              <p className="text-grey mb-10 flex-grow font-light leading-relaxed text-sm">{activity.desc}</p>
              {activity.isYouth && (
                <span className="inline-block px-5 py-2 bg-light-stone text-navy/40 text-[9px] font-bold rounded-full uppercase tracking-[0.2em]">
                  {activity.status}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section id="gallery" className="py-32 bg-soft-white">
        <div className="max-w-7xl mx-auto px-8">
          <SectionTitle subtitle="Moments">{t.gallery.title}</SectionTitle>

          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-[2rem] border border-light-stone overflow-hidden transition-all hover:shadow-md">
              <img
                src={profileImg}
                alt="Gallery"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Newsletter Section --- */}
      <section id="newsletter" className="py-32 px-8 max-w-4xl mx-auto text-center">
        <SectionTitle subtitle="Reflections">{t.newsletter.title}</SectionTitle>
        <div className="bg-white p-16 md:p-24 rounded-[4rem] border border-light-stone shadow-sm">
          <MessageSquare className="w-10 h-10 text-beige mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-navy/50 italic font-serif leading-relaxed">
            {t.newsletter.placeholder}
          </p>
          <div className="mt-16 flex justify-center gap-6">
            <div className="w-1.5 h-1.5 rounded-full bg-light-stone" />
            <div className="w-1.5 h-1.5 rounded-full bg-burgundy/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-light-stone" />
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-32 bg-light-stone/30">
        <div className="max-w-7xl mx-auto px-8">
          <SectionTitle subtitle="Get in Touch">{t.contact.title}</SectionTitle>

          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5 space-y-16">
              <p className="text-lg text-grey leading-relaxed font-light">
                {t.contact.welcome}
              </p>

              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Users className="w-5 h-5 text-navy/40" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-grey/50 uppercase tracking-[0.2em] mb-2">Contact Person</p>
                    <p className="font-bold text-navy tracking-wide text-sm">Angeline Wong</p>
                    <p className="text-grey text-xs mt-1">021 191 8001</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Globe className="w-5 h-5 text-burgundy/40" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-grey/50 uppercase tracking-[0.2em] mb-2">Languages</p>
                    <p className="text-navy font-bold text-sm tracking-wide">Mandarin, Cantonese, English</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="w-5 h-5 text-navy/40" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-grey/50 uppercase tracking-[0.2em] mb-2">Church Address</p>
                    <p className="text-navy font-bold text-sm tracking-wide">76 Main South Road, Christchurch</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form className="bg-white p-12 md:p-16 rounded-[3rem] shadow-xl space-y-10 border border-light-stone/50">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">{t.contact.formName}</label>
                    <input type="text" className="w-full px-0 py-3 bg-transparent border-b border-light-stone focus:border-navy outline-none transition-all placeholder:text-light-stone text-sm" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">{t.contact.formEmail}</label>
                    <input type="text" className="w-full px-0 py-3 bg-transparent border-b border-light-stone focus:border-navy outline-none transition-all placeholder:text-light-stone text-sm" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">{t.contact.formLang}</label>
                  <select className="w-full px-0 py-3 bg-transparent border-b border-light-stone focus:border-navy outline-none transition-all appearance-none text-sm">
                    <option>Mandarin / 普通话</option>
                    <option>Cantonese / 粤语</option>
                    <option>English / 英语</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-widest ml-1">{t.contact.formMsg}</label>
                  <textarea rows={4} className="w-full px-0 py-3 bg-transparent border-b border-light-stone focus:border-navy outline-none transition-all placeholder:text-light-stone text-sm"></textarea>
                </div>
                <button type="button" className="w-full py-6 bg-navy text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-navy/90 transition-all shadow-md">
                  {t.contact.formSubmit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white pt-32 pb-16 px-8 border-t border-light-stone">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-20 mb-24">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <Logo
                  src={lang === 'en' ? englishLogo : chineseLogo}
                  alt="CCCC Logo"
                  className="w-full h-full object-contain"
                />
                <div>
                  <h2 className="text-lg font-bold text-navy leading-tight tracking-tight uppercase">CCCC</h2>
                  <p className="text-[9px] text-grey uppercase tracking-widest">Christchurch Catholic Chinese Community</p>
                </div>
              </div>
              <p className="text-grey text-xs leading-relaxed font-light tracking-wide">
                基督城华人天主教团体<br />
                St Bernadette’s Catholic Church<br />
                Christchurch, New Zealand
              </p>
            </div>

            <div className="space-y-10">
              <h3 className="font-bold text-navy uppercase tracking-[0.3em] text-[10px]">Quick Links</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                {navLinks.map(link => (
                  <button key={link.id} onClick={() => scrollTo(link.id)} className="text-[10px] text-grey hover:text-burgundy transition-colors text-left font-bold uppercase tracking-widest">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h3 className="font-bold text-navy uppercase tracking-[0.3em] text-[10px]">Follow Us</h3>
              <div className="flex gap-6">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 bg-soft-white border border-light-stone rounded-full flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy/30">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <p className="text-[9px] font-bold text-grey/40 uppercase tracking-[0.3em] mb-3">Contact</p>
                <p className="text-xs font-bold text-navy tracking-widest">Angeline Wong: 021 191 8001</p>
              </div>
            </div>
          </div>

          <div className="pt-16 border-t border-light-stone flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] text-grey/50 font-bold uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} Christchurch Catholic Chinese Community. {t.footer.rights}</p>
            <div className="flex gap-12">
              <button className="hover:text-navy transition-colors">Privacy Policy</button>
              <button className="hover:text-navy transition-colors">Terms of Use</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


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
import holyhourImg from './assets/news_photos/holyhour.jpeg';

import {
  Menu,
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Globe,
  Users,
  BookOpen,
  Heart,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Library from './pages/Library';
import Gallery from './pages/Gallery';

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
      newsletter: 'News / Notifications',
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
      time: 'First Sunday of every month, 3:30 PM',
      location: 'Holy Family Parish - St. Teresa of Lisieux Church',
      viewMap: 'View Map',
      posterTitle: 'Announcements',
      posterPlaceholder: 'Upcoming event posters will be displayed here.',
    },
    about: {
      title: 'About Us',
      overview: 'Christchurch Catholic Chinese Community (CCCC) belongs to the Roman Catholic Diocese of Christchurch and supports the Diocese in its pastoral mission among Chinese Catholics. The community mainly serves Chinese-speaking Catholics from Mainland China, Taiwan, Hong Kong, Macau, Singapore, Malaysia, Indonesia, and other places, providing faith formation, spiritual activities, and a platform for cultural exchange rooted in Chinese tradition.',
      journey: 'In 2014, Fr Clement Covacho noticed that many Chinese Catholic immigrants experienced language difficulties when attending English Masses. To respond to their pastoral needs, he sought permission from the then Bishop of Christchurch, Barry Jones, to celebrate a Chinese Christmas Mass. Through the efforts of Fr Clement and the support of parishioners, the community gradually took shape.',
      pastoral: 'At present, the community celebrates one Chinese Mass each month at St. Teresa of Lisieux Church and organizes various faith formation activities, including the Chinese Alpha Course, Bible sharing, catechetical teaching, and the Legion of Mary.',
      contactPerson: 'Contact Person: Angeline Wong (0211918001)',
      welcomeMsg: 'We warmly welcome all Chinese Catholics and anyone interested in the Catholic faith to join us in prayer, fellowship, and spiritual growth in Christchurch.',
    },
    activities: {
      title: 'Activities & Events',
      alpha: {
        name: 'Chinese Alpha Course',
        desc: `Welcome to those who are curious about faith, new to the environment,
or looking to know God better.

The course is conducted in a relaxed way: dining together, watching short videos, and free discussion.
Whether you are an old believer, a new believer, or have no religious background,
you can ask questions and explore life and faith in a familiar Chinese environment.`
      },
      bible: {
        name: 'Bible Sharing',
        desc: `In our relaxed sharing and discussion,
let us listen to and reflect on God's word together,
grow in the Holy Word, and receive strength and peace.

We sincerely invite you to join our online sharing:
Every Saturday at 8:45 PM`
      },
      catechism: {
        name: 'Catechetical Teaching',
        desc: `✨ Know Christ, Experience Christ, Live Christ ✨

Longing to know God better?
Want to accompany each other on the faith journey?
Hope to live out Christ more in life?

📖 Welcome to join the Youcat group meeting
📅 Once a month | Fourth Sunday afternoon
⏰ 3:30 PM`
      },
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
      title: 'News / Notifications',
      placeholder: 'Community news and important notifications will be shared here.',
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
      newsletter: '消息 / 通知',
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
      time: '每月第一个主日，下午 3:30',
      location: 'Holy Family Parish - St. Teresa of Lisieux Church',
      viewMap: '查看地图',
      posterTitle: '活动公告',
      posterPlaceholder: '未来的活动海报将在此展示。',
    },
    about: {
      title: '关于我们',
      overview: '基督城华人天主教团体 (CCCC) 隶属于天主教基督城教区，支持教区在华人教友中的牧灵使命。团体主要服务来自中国大陆、台湾、香港、澳门、新加坡、马来西亚、印度尼西亚等地的华语教友，提供信仰培育、灵性活动以及植根于中华传统的文化交流平台。',
      journey: '2014年，Clement Covacho 神父注意到许多华人教友在参加英语弥撒时遇到语言困难。为了响应他们的牧灵需求，他向当时的基督城主教 Barry Jones 申请举行华语圣诞弥撒。在神父和教友的共同努力下，团体逐渐成形。',
      pastoral: 'At present, the community celebrates one Chinese Mass each month and organizes various faith formation activities, including the Chinese Alpha Course, Bible sharing, catechetical teaching, and the Legion of Mary.',
      contactPerson: '联系人：Angeline Wong (0211918001)',
      welcomeMsg: '我们热烈欢迎所有华人教友以及任何对天主教信仰感兴趣的人加入我们的祈祷、团契和灵性成长。',
    },
    activities: {
      title: '活动与团体',
      alpha: {
        name: '华人启发（Alpha）课程',
        desc: `欢迎对信仰好奇、刚来到新环境、
更想认识天主的朋友参加。

课程以轻松方式进行：一起用餐、观看短片、自由讨论。
无论您是老教友、新教友，或尚无任何宗教背景，
都能在熟悉的中文环境中，提出问题、探索生命与信仰。`
      },
      bible: {
        name: '圣经分享与学习',
        desc: `让我们在轻松的分享与讨论中，
一起聆听、思考天主的话语，
在圣言中成长，领受力量与平安。

诚挚邀请您加入我们的线上分享：
每周六晚 8:45PM`
      },
      catechism: {
        name: '天主教教理研读（轻松版）',
        desc: `✨ 认识基督，经历基督，活出基督 ✨

渴望更认识天主？
想在信仰旅途中彼此陪伴？
希望在生活中更活出基督？

📖 欢迎加入 Youcat 小组聚会
📅 每月一次｜第四个主日下午
 3:30 PM`
      },
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
      title: '消息 / 通知',
      placeholder: '团体消息和重要通知将在此分享。',
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
      className="w-full h-full object-contain mix-blend-multiply"
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

// --- News Data ---
type NewsTag = 'Important' | 'Event' | 'News';
interface NewsItem {
  id: string;
  tag: NewsTag;
  tagZh: string;
  titleEn: string;
  titleZh: string;
  date: string;
  contentEn: string;
  contentZh: string;
  image?: string;
}

const newsItems: NewsItem[] = [
  {
    id: 'venue-change-may2026',
    tag: 'Important',
    tagZh: '重要',
    titleEn: 'Chinese Mass Venue Change',
    titleZh: '中文彌撒場地更換',
    date: '3 May 2026',
    contentEn: `Dear brothers and sisters in Christ,

From May onwards, our Chinese Mass will be moved to St Teresa's Catholic Church, located at 1/8 Puriri Street, Riccarton.

The Mass will start at 4:00 PM on 3rd May.
The Rosary will be recited at 3:30 PM, and there will be a tea gathering after the Mass.

All parishioners are welcome to bring their family and friends to join us.

Regards,
Christchurch Catholic Chinese Community`,
    contentZh: ` 各位主内兄弟姊妹，
从五月份开始，我们的中文弥撒将会移师到 St Teresa's Catholic Church 举行。
地址：1/8 Puriri Street, Riccarton。
五月三日下午四时弥撒开始。
下午三时三十分将会恭念玫瑰经，弥撒后有茶聚。
欢迎各教友带同亲友参加。`,
  },
  {
    id: 'corpus-christi-jun2026',
    tag: 'Important',
    tagZh: '重要',
    titleEn: 'Eucharistic Procession & Holy Hour | Mass Schedule (June 7, 2026)',
    titleZh: '基督聖體聖血節通知｜聖體遊行及彌撒安排（6月7日）',
    date: '7 June',
    image: holyhourImg,
    contentEn: `Sunday, 7 June is the Feast of Corpus Christi.
There will be no Chinese Mass on this day.

The Diocese will hold a Eucharistic Procession and Holy Hour at 2:30pm at Our Lady of Victories Church (OLV), led by Bishop Michael. All are warmly invited to participate.

📍 Location: Our Lady of Victories Church
106 Main South Road, Sockburn
Time: Sunday, 7 June 2026, 2:30pm – 4:00pm

As a result, the Chinese Catholic community Mass is cancelled for that day.
Please attend Mass at another time at your nearest parish.

You are warmly welcome to join the Eucharistic Procession at 2:30pm at OLV.`,
    contentZh: `6月7日（主日）為基督聖體聖血節，當日沒有中文彌撒。

教區將於當天下午 2:30pm，在 Our Lady of Victories Church（OLV） 舉行聖體遊行及聖體敬禮（Eucharistic Procession & Holy Hour），由教區主教 Bishop Michael 主禮，誠邀大家踴躍參與。

📍 地點：Our Lady of Victories Church
106 Main South Road, Sockburn
🕝 時間：2026年6月7日（星期日）2:30pm – 4:00pm

因此，當天華人團體中文彌撒取消。
請大家自行安排，選擇其他時間前往就近教堂參與彌撒。

歡迎大家於當日下午 2:30pm 一同前往 OLV，參與聖體遊行與敬禮。`,
  },
];

const tagColors: Record<NewsTag, string> = {
  Important: 'bg-burgundy/10 text-burgundy',
  Event: 'bg-navy/10 text-navy',
  News: 'bg-beige/60 text-navy/70',
};

const NewsAccordion = ({ items, lang }: { items: NewsItem[]; lang: 'en' | 'zh' }) => {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      {sorted.map((item) => {
        const isOpen = openId === item.id;
        const tag = lang === 'en' ? item.tag : item.tagZh;
        const title = lang === 'en' ? item.titleEn : item.titleZh;
        const content = lang === 'en' ? item.contentEn : item.contentZh;

        return (
          <motion.div
            key={item.id}
            layout
            className={`rounded-3xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-navy/20 shadow-xl' : 'border-light-stone shadow-sm hover:shadow-md hover:border-navy/10'
              } bg-white`}
          >
            {/* Header */}
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
                <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shrink-0 ${tagColors[item.tag]}`}>
                  {tag}
                </span>
                <span className="font-bold text-navy text-sm md:text-base leading-snug">{title}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[10px] text-grey/60 font-light hidden sm:block">{item.date}</span>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronRight className="w-4 h-4 text-navy/40" />
                </motion.div>
              </div>
            </button>

            {/* Date on mobile */}
            {!isOpen && (
              <p className="text-[10px] text-grey/50 font-light px-6 pb-4 -mt-3 sm:hidden">{item.date}</p>
            )}

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 md:px-8 pb-8 border-t border-light-stone/60">
                    <p className="text-[10px] text-grey/50 font-light mt-5 mb-4">{item.date}</p>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={lang === 'en' ? item.titleEn : item.titleZh}
                        className="w-full h-auto object-contain rounded-2xl mb-6 border border-light-stone bg-soft-white"
                      />
                    )}
                    <p className="text-navy/70 text-sm leading-loose whitespace-pre-line font-light">
                      {content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

const PosterCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center group">
      <div className="w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-auto object-contain rounded-2xl border border-white/10 shadow-lg"
            alt={`Poster ${currentIndex + 1}`}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy/50 text-white backdrop-blur-md opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-navy border border-white/20"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-navy/50 text-white backdrop-blur-md opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-navy border border-white/20"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-6 justify-center">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'bg-champagne w-8' : 'bg-white/20 hover:bg-white/40'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTabId, setActiveTabId] = useState('library');
  const [currentPage, setCurrentPage] = useState<'home' | 'library' | 'gallery'>('home');
  const [isPosterOpen, setIsPosterOpen] = useState(false);

  const t = translations[lang];

  const activitiesList = [
    {
      id: 'library',
      name: lang === 'en' ? 'Community Library' : '网页数字图书馆',
      desc: lang === 'en'
        ? 'We are setting up the Christchurch Catholic Chinese Community Library. We welcome donations of Chinese Catholic books to enrich our resources.'
        : '我们正在建立基督城天主教华人团体图书馆，欢迎大家踊跃捐赠中文天主教图书、学习手册及刊物，丰富图书资源，也方便日后借阅。',
      icon: BookOpen,
      action: () => { setCurrentPage('library'); window.scrollTo(0, 0); },
      actionText: lang === 'en' ? 'Enter Library' : '进入图书馆'
    },
    { ...t.activities.alpha, id: 'alpha', icon: Globe, actionText: lang === 'en' ? 'Contact to Join' : '联系加入' },
    { ...t.activities.bible, id: 'bible', icon: BookOpen, actionText: lang === 'en' ? 'Contact to Join' : '联系加入' },
    { ...t.activities.catechism, id: 'catechism', icon: Heart, actionText: lang === 'en' ? 'Contact to Join' : '联系加入' },
    { ...t.activities.legion, id: 'legion', icon: Users, actionText: lang === 'en' ? 'Contact to Join' : '联系加入' },
    { ...t.activities.youth, id: 'youth', icon: Calendar, isYouth: true, actionText: lang === 'en' ? 'Contact to Join' : '联系加入' },
  ];

  const activeActivity = activitiesList.find(a => a.id === activeTabId) || activitiesList[0];

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
    setIsMenuOpen(false);

    const doScroll = () => {
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
    };

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(doScroll, 100);
    } else {
      doScroll();
    }
  };

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-light-stone selection:text-navy">

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollTo('home')}>

            <img src={lang === 'en' ? englishLogo : chineseLogo} alt={lang === 'en' ? "Christchurch Catholic Chinese Community Logo" : "基督城华人天主教团体标志"} className="h-12 sm:h-16 md:h-20 lg:h-24 drop-shadow-sm transition-transform hover:scale-105" />
            <div className="hidden md:block">
              <div className="text-xs font-bold text-navy leading-tight uppercase tracking-[0.2em]">CCCC</div>
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
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-light-stone text-[10px] font-bold uppercase tracking-widest hover:bg-soft-white transition-all bg-white"
            >
              <Globe className="w-3 h-3 text-navy" />
              {lang === 'en' ? '中文' : 'English'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="w-9 h-9 rounded-full border border-light-stone hover:bg-soft-white transition-colors flex items-center justify-center shadow-sm bg-white"
            >
              <span className="text-[10px] font-bold text-burgundy tracking-widest pl-0.5">
                {lang === 'en' ? '中' : 'EN'}
              </span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-9 h-9 flex items-center justify-center text-navy border border-light-stone rounded-full shadow-sm bg-white hover:bg-soft-white transition-colors">
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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

      {currentPage === 'home' ? (
        <main>
          {/* --- Hero Section --- */}
          <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-soft-white pt-32 md:pt-40 lg:pt-48 pb-12">
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

          {/* --- Sunday Mass Section --- */}
          <section id="mass" className="py-32 px-8 max-w-3xl mx-auto">
            <SectionTitle subtitle="Worship">{t.mass.title}</SectionTitle>

            <div
              onClick={() => setIsPosterOpen(true)}
              className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border border-light-stone/50 mt-16 text-center group transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-transparent cursor-pointer relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <h3 className="text-sm font-bold text-navy mb-4 uppercase tracking-[0.2em]">{lang === 'en' ? 'Mass Schedule' : '弥撒安排'}</h3>
                <p className="text-xl md:text-2xl text-navy font-serif leading-snug mb-12">{t.mass.time}</p>

                <div className="w-16 h-[1px] bg-light-stone mx-auto mb-12 group-hover:bg-navy/20 transition-colors" />

                <h3 className="text-sm font-bold text-navy mb-4 uppercase tracking-[0.2em]">{lang === 'en' ? 'Location' : '地点'}</h3>
                <p className="text-xl md:text-2xl text-navy font-serif leading-snug mb-4">{t.mass.location}</p>
                <p className="text-sm text-grey font-light leading-relaxed mb-12 max-w-sm mx-auto">
                  8 Puriri Street, Riccarton, Christchurch
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setIsPosterOpen(true)}
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 bg-navy text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-burgundy transition-all shadow-md"
                  >
                    {lang === 'en' ? 'Details' : '详情信息'} <ImageIcon className="w-3 h-3" />
                  </button>
                  <a
                    href="https://maps.google.com/?q=Holy+Family+Parish+St+Teresa+of+Lisieux+Church,+8+Puriri+Street,+Riccarton,+Christchurch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 bg-white border border-light-stone rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-navy hover:bg-soft-white transition-all shadow-sm"
                  >
                    {t.mass.viewMap} <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Mass Schedule Poster Modal */}
          <AnimatePresence>
            {isPosterOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPosterOpen(false)}
                className="fixed inset-0 z-[200] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
              >
                <button
                  onClick={() => setIsPosterOpen(false)}
                  className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                >
                  <X className="w-6 h-6" />
                </button>
                <motion.img
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  src={massScheduleImg}
                  alt="Mass Schedule Poster"
                  className="max-w-full max-h-full rounded-[2rem] shadow-2xl object-contain bg-white"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- About Us Section --- */}
          <section id="about" className="py-32 bg-soft-white">
            <div className="max-w-7xl mx-auto px-8">
              <SectionTitle subtitle="Our Journey">{t.about.title}</SectionTitle>

              <div className="max-w-4xl mx-auto space-y-12 text-xs md:text-sm text-grey leading-relaxed font-light">
                <p className="text-navy font-serif text-lg md:text-xl italic leading-relaxed text-center">
                  {t.about.overview}
                </p>
                <div className="space-y-8 pt-10 border-t border-light-stone">
                  <p>{t.about.journey}</p>
                  <p>{t.about.pastoral}</p>
                </div>
              </div>
            </div>
          </section>

          {/* --- Activities Section --- */}
          <section id="activities" className="py-32 px-8 max-w-7xl mx-auto">
            <SectionTitle subtitle="Growing Together">{t.activities.title}</SectionTitle>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-16">

              {/* Left Column: Tab List */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {activitiesList.map((activity) => {
                  const isActive = activeTabId === activity.id;
                  return (
                    <button
                      key={activity.id}
                      onClick={() => setActiveTabId(activity.id)}
                      className={`flex items-center gap-5 p-5 rounded-3xl transition-all duration-300 text-left border ${isActive ? 'bg-navy text-white border-navy shadow-lg scale-[1.02]' : 'bg-transparent text-navy hover:bg-white border-transparent hover:border-light-stone hover:shadow-sm'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm ${isActive ? 'bg-white/20' : 'bg-soft-white border border-light-stone'}`}>
                        <activity.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-burgundy'}`} />
                      </div>
                      <span className="font-bold text-xs uppercase tracking-[0.1em] leading-snug">{activity.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Content Display */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeActivity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-10 md:p-14 lg:p-16 rounded-[3rem] md:rounded-[4rem] border border-light-stone shadow-xl relative overflow-hidden min-h-[500px] flex flex-col"
                  >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-soft-white rounded-bl-[400px] -z-0 opacity-50" />

                    <div className="relative z-10 flex-grow">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
                        <div className="w-16 h-16 bg-navy text-white rounded-3xl flex items-center justify-center shadow-lg transform -rotate-3 shrink-0">
                          <activeActivity.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-serif text-navy leading-tight">{activeActivity.name}</h3>
                          {activeActivity.isYouth && activeActivity.status && (
                            <span className="inline-block px-4 py-1.5 bg-burgundy/10 text-burgundy text-[9px] font-bold rounded-full uppercase tracking-[0.2em] mt-4">
                              {activeActivity.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-16 h-[2px] bg-light-stone mb-12" />

                      <div className="text-navy/70 leading-loose font-light md:text-lg whitespace-pre-wrap max-w-2xl text-justify">
                        {activeActivity.desc}
                      </div>
                    </div>

                    <div className="relative z-10 mt-16 pt-8 border-t border-light-stone/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <p className="text-sm text-grey font-serif italic max-w-[200px] md:max-w-xs leading-relaxed">
                        {activeActivity.id === 'library'
                          ? (lang === 'en' ? 'Explore our digital collection' : '随时随地借阅我们的海量图书')
                          : (lang === 'en' ? 'We welcome everyone to grow together in faith' : '我们热烈欢迎大家一起在爱与信仰中成长')
                        }
                      </p>
                      {activeActivity.id === 'library' ? (
                        <button
                          onClick={activeActivity.action}
                          className="px-10 py-5 bg-burgundy text-white rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-navy transition-all hover:-translate-y-1 flex items-center justify-center gap-3 w-full sm:w-auto"
                        >
                          {activeActivity.actionText} <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => scrollTo('contact')}
                          className="px-10 py-5 bg-navy text-white rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-burgundy transition-all hover:-translate-y-1 flex items-center justify-center gap-3 w-full sm:w-auto"
                        >
                          {activeActivity.actionText} <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </section>

          {/* --- Gallery Section --- */}
          <section id="gallery" className="py-32 bg-soft-white px-8">
            <div className="max-w-5xl mx-auto text-center">
              <SectionTitle subtitle="Moments">{t.gallery.title}</SectionTitle>
              <div
                onClick={() => {
                  setCurrentPage('gallery');
                  window.scrollTo(0, 0);
                }}
                className="bg-white rounded-[3rem] p-12 md:p-24 shadow-sm border border-light-stone cursor-pointer group hover:shadow-2xl hover:border-transparent transition-all relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-30 transition-opacity duration-1000"
                  style={{ backgroundImage: `url(${profileImg})` }}
                />
                <ImageIcon className="w-12 h-12 text-navy/20 mx-auto mb-8 group-hover:text-burgundy transition-colors duration-500 group-hover:scale-110" />
                <h3 className="text-2xl md:text-3xl font-serif text-navy mb-6">
                  {lang === 'en' ? 'Explore our moments' : '探索我们的精彩瞬间'}
                </h3>
                <p className="text-grey font-light max-w-xl mx-auto mb-12 relative z-10 leading-relaxed text-sm md:text-base">
                  {lang === 'en'
                    ? 'A visual journey through the life of the Christchurch Catholic Chinese Community. Click to enter our independent gallery and flip through our exclusive curated memories.'
                    : '图说基督城华人天主教团体的生活点滴。点击此处进入全屏独立画廊，翻阅属于我们的独家回忆。'}
                </p>
                <button className="relative z-10 px-8 py-4 bg-navy text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-md group-hover:bg-burgundy transition-colors">
                  {lang === 'en' ? 'Open Gallery' : '打开相册图集'}
                </button>
              </div>
            </div>
          </section>

          {/* --- News / Notifications Section --- */}
          <section id="newsletter" className="py-32 px-8 max-w-3xl mx-auto">
            <SectionTitle subtitle={lang === 'en' ? 'Announcements' : '公告'}>{t.newsletter.title}</SectionTitle>
            <NewsAccordion items={newsItems} lang={lang} />
          </section>

          {/* --- Contact Section --- */}
          <section id="contact" className="py-32 bg-light-stone/30">
            <div className="max-w-4xl mx-auto px-8">
              <SectionTitle subtitle="Get in Touch">{t.contact.title}</SectionTitle>

              <div className="text-center mb-16">
                <p className="text-lg md:text-xl text-grey leading-relaxed font-light">
                  {t.contact.welcome}
                </p>
              </div>

              <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border border-light-stone/50">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-soft-white border border-light-stone rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <Users className="w-5 h-5 text-navy/40" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-grey/50 uppercase tracking-[0.2em] mb-2">Contact Person</p>
                      <p className="font-bold text-navy tracking-wide text-sm">Angeline Wong</p>
                      <p className="text-grey text-xs mt-1">021 191 8001</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-soft-white border border-light-stone rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <Globe className="w-5 h-5 text-burgundy/40" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-grey/50 uppercase tracking-[0.2em] mb-2">Languages</p>
                      <p className="text-navy font-bold text-sm tracking-wide">Mandarin, Cantonese, English</p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </section>

        </main>
      ) : currentPage === 'library' ? (
        <Library lang={lang} onBack={() => {
          setCurrentPage('home');
          window.scrollTo(0, 0);
        }} />
      ) : currentPage === 'gallery' ? (
        <Gallery lang={lang} onBack={() => {
          setCurrentPage('home');
          window.scrollTo(0, 0);
        }} />
      ) : null}

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
                Holy Family Parish - St. Teresa of Lisieux Church<br />
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
                <a href="https://www.facebook.com/share/g/1DrFKJJ4DA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-soft-white border border-light-stone rounded-full flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy/40">
                  <Facebook className="w-5 h-5" />
                </a>
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

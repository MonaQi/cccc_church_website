import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Heart, Phone, ArrowLeft, BookMarked, Layers, Search, Star } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  cover: string;
  available: boolean;
  desc: string;
}

// Automatically import all images from the library folder
const bookModules = import.meta.glob('../assets/library/*.{jpg,JPG,png,PNG,jpeg,JPEG}', { eager: true, query: '?url', import: 'default' });

const getLibraryBooks = (lang: 'en' | 'zh'): Book[] => Object.entries(bookModules).map(([path, url], index) => {
  const filename = path.split('/').pop() || '';
  const title = filename.replace(/\.[^/.]+$/, "");
  
  let category = lang === 'en' ? 'Albums & Publications' : '图册 / 刊物';
  let cleanTitle = title;
  
  if (title.includes('更新_')) {
    category = lang === 'en' ? 'Renewal Series' : '更新系列刊物';
    cleanTitle = title.replace('更新_', '').replace(/_/g, ' ');
  } else if (title.includes('渔夫集')) {
    category = lang === 'en' ? 'Fisherman Collection' : '渔夫集刊物';
    cleanTitle = title.replace(/_/g, ' ');
  } else if (title.includes('小册子')) {
    category = lang === 'en' ? 'Booklets' : '各类小册子';
  } else {
    category = lang === 'en' ? 'Classics & Spiritual' : '经典读物与灵修';
    cleanTitle = title.replace(/_/g, ' ');
  }
  
  if (title.includes('封底')) {
    return null;
  }
  
  return {
    id: index + 1,
    title: cleanTitle, // User explicitly said book names do not need translation
    author: lang === 'en' ? 'Community Collection' : '团体藏书',
    category: category,
    cover: url as string,
    available: true,
    desc: lang === 'en' 
      ? 'Part of the CCCC Library. Contact the admin to borrow.' 
      : '本书属于团体藏书，如需借阅请通过页面联系管理员。'
  };
}).filter(Boolean) as Book[];

export default function Library({ onBack, lang }: { onBack: () => void, lang: 'en' | 'zh' }) {
  const libraryBooks = getLibraryBooks(lang);

  return (
    <main className="min-h-screen bg-soft-white font-sans selection:bg-navy selection:text-white">
      <div className="pt-40 md:pt-48 pb-12">
        <div className="max-w-7xl mx-auto px-8">
        
        {/* Navigation back */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60 hover:text-navy transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> {lang === 'en' ? 'Back to Home' : '返回首页'}
        </button>

        {/* Hero Banner */}
        <div className="relative w-full h-[40vh] min-h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-24">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
            alt="Library" 
            className="w-full h-full object-cover grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 shadow-xl">
               <BookOpen className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">
               {lang === 'en' ? 'CCCC Community Library' : '基督城天主教华人团体图书馆'}
             </h1>
             <div className="w-12 h-[1px] bg-white/30 mx-auto mb-6" />
             <p className="text-white/80 font-bold uppercase text-xs md:text-sm tracking-[0.2em]">
               {lang === 'en' ? 'Est. August 2025' : '成立时间：2025年8月'}
             </p>
          </div>
        </div>

        {/* Introduction & Rules */}
        <div className="grid lg:grid-cols-12 gap-16 mb-32 items-center">
          <div className="lg:col-span-7 space-y-8 text-grey leading-relaxed font-light text-lg">
             <p className="text-2xl font-serif text-navy italic leading-snug">
               {lang === 'en' 
                 ? 'We welcome all parishioners to actively donate Chinese Catholic books, study manuals, and publications to enrich our collection.' 
                 : '欢迎各位教友积极踊跃捐赠中文天主教图书、学习手册以及刊物等，丰富我们的图书品类。'}
             </p>
             <p>
               {lang === 'en'
                 ? 'When you or your family travel around the world, if you come across excellent Chinese spiritual books, consider purchasing and donating them to our community library to pass on the warmth of faith.'
                 : '当您和家人在中国大陆、香港、澳门、台湾、新加坡、马来西亚，或世界各地旅行时，如果遇到好的中文图书，除了自己购买收藏，也可以考虑为团体图书馆购买捐赠，让这份温暖在团体中传递。'}
             </p>
          </div>
          
          <div className="lg:col-span-5">
             <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-light-stone shadow-xl relative overflow-hidden group hover:border-burgundy/20 transition-colors">
                <div className="absolute -right-10 -top-10 text-burgundy/5 group-hover:scale-110 transition-transform duration-700">
                   <Heart className="w-48 h-48" />
                </div>
                <h3 className="text-xs font-bold text-navy uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-burgundy" /> {lang === 'en' ? 'Donation & Borrowing' : '捐书与借阅联系'}
                </h3>
                <p className="font-serif italic text-xl text-navy/80 mb-10 z-10 relative">
                  {lang === 'en' 
                    ? 'Whether you want to share a good book or borrow a classic to read, feel free to contact us anytime.'
                    : '无论您是想要分享好书，还是遇到想要阅读的经典，都欢迎随时联系我们。'
                  }
                </p>
                <div className="flex items-center gap-6 bg-soft-white p-5 rounded-2xl border border-light-stone z-10 relative shadow-sm">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                     <span className="font-bold text-navy">A</span>
                   </div>
                   <div>
                     <p className="text-[9px] font-bold text-grey uppercase tracking-[0.2em] mb-1">
                       {lang === 'en' ? 'Contact Librarian' : '联系图书管理员'}
                     </p>
                     <p className="font-bold text-navy tracking-wide">Austin: 022 656 2705</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Book Gallery Area */}
        <div className="mb-16 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-light-stone/50 pb-8 gap-6">
           <h2 className="text-2xl md:text-3xl font-serif text-navy flex items-center gap-4">
             <Layers className="w-6 h-6 text-burgundy" /> {lang === 'en' ? 'Book Collections' : '图书资源展示'}
           </h2>
           <div className="flex items-center gap-3 text-grey bg-white px-5 py-3 rounded-full border border-light-stone shadow-sm w-full md:w-64 focus-within:border-navy transition-colors">
             <Search className="w-4 h-4" />
             <input type="text" placeholder={lang === 'en' ? 'Search books...' : '搜索书名...'} className="bg-transparent border-none outline-none text-xs w-full placeholder:text-light-stone" />
           </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-32">
           {libraryBooks.map(book => (
             <motion.div 
               key={book.id}
               whileHover={{ y: -8 }}
               className="bg-white rounded-[2rem] border border-light-stone overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between cursor-pointer"
             >
                <div className="aspect-[3/4] overflow-hidden bg-soft-white relative p-6 border-b border-light-stone/30">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-700"
                  />
                  {!book.available ? (
                    <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10 shadow-sm">
                       {lang === 'en' ? 'Borrowed' : '已借出'}
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-navy text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10 shadow-sm border border-light-stone">
                       {lang === 'en' ? 'Available' : '可借阅'}
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-grow flex flex-col justify-between">
                   <div>
                     <p className="text-[9px] font-bold text-burgundy uppercase tracking-widest mb-3 flex items-center gap-2">
                       <BookMarked className="w-3 h-3" /> {book.category}
                     </p>
                     <h3 className="font-bold text-navy text-lg mb-2 leading-tight">{book.title}</h3>
                     <p className="text-[10px] text-grey font-bold uppercase tracking-wide mb-4 line-clamp-1">{book.author}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
        </div>
      </div>
    </main>
  );
}

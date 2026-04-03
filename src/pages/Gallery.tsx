import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, Image as ImageIcon } from 'lucide-react';

// Automatically import all images from the album folder
const photoModules = import.meta.glob('../assets/album/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: true, query: '?url', import: 'default' });

const photos = Object.entries(photoModules).map(([path, url], index) => {
  return {
    id: index,
    url: url as string
  };
});

export default function Gallery({ onBack, lang }: { onBack: () => void, lang: 'en' | 'zh' }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-soft-white font-sans selection:bg-navy selection:text-white">
      <div className="pt-40 md:pt-48 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60 hover:text-navy transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" /> {lang === 'en' ? 'Back to Home' : '返回首页'}
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <ImageIcon className="w-8 h-8 text-burgundy" />
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight">{lang === 'en' ? 'Gallery' : '精彩瞬间'}</h1>
          </div>
          <p className="text-grey font-light italic text-lg md:text-xl max-w-xl">
             {lang === 'en' 
               ? 'A collection of beautiful moments, events, and memories shared by our community.' 
               : '记录我们在信仰旅途中的点滴瞬间与美好回忆。'
             }
          </p>
        </div>

        {/* Masonry Grid via CSS columns */}
        {photos.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {photos.map((photo) => (
              <motion.div 
                key={photo.id}
                whileHover={{ y: -5 }}
                className="break-inside-avoid rounded-[2.5rem] overflow-hidden cursor-zoom-in relative group shadow-sm hover:shadow-xl transition-all border border-light-stone"
                onClick={() => setSelectedImage(photo.url)}
              >
                <img 
                  src={photo.url} 
                  alt="Gallery photo" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center text-grey">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>{lang === 'en' ? 'No photos available' : '相册正在建设中'}</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              src={selectedImage} 
              alt="Expanded view" 
              className="max-w-full max-h-full rounded-[2rem] shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </main>
  );
}

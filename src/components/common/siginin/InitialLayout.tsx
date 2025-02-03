import {LogoIcon} from '../Icon';
import {motion} from 'framer-motion';

interface InitialLayoutProps {
  children: React.ReactNode;
  size: string;
}

export default function InitialLayout({children, size}: InitialLayoutProps) {
  return (
    <div className="relative flex w-full min-h-screen">
      <motion.img
        src="/img/InitialIMG.png"
        alt="초기 이미지"
        className={`h-auto object-cover ${size == 'wide' ? 'w-[800px]' : 'w-[700px]'}`}
        initial={{opacity: 0, x: -100}}
        animate={{opacity: 1, x: 0}}
        transition={{type: 'tween', duration: 0.5, ease: 'easeInOut'}}
      />
      <motion.div
        className="flex-1 absolute top-10 left-10 p-2 flex flex-col items-start text-white font-bold gap-1"
        initial={{opacity: 0, x: -100}}
        animate={{opacity: 1, x: 0}}
        transition={{type: 'tween', duration: 0.5, ease: 'easeInOut'}}
      >
        <div className="flex gap-1 items-center">
          <LogoIcon />
          <h1 className="text-md whitespace-nowrap">TIKITAKA</h1>
        </div>
        <p className="text-sm whitespace-nowrap">Ticket Management System</p>
      </motion.div>

      {/* 우측 */}
      {children}
    </div>
  );
}

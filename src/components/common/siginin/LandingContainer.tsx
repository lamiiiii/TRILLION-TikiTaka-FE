import {Link} from 'react-router-dom';
import {LogoIcon} from '../Icon';
import {motion} from 'framer-motion';

export default function LandingContainer() {
  return (
    <div className="relative flex w-full min-h-screen">
      <motion.img
        src="/img/InitialIMG.png"
        alt="초기 이미지"
        className="w-[800px] h-auto object-cover"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
      />
      <motion.div
        className="flex-1 absolute top-10 left-10 p-2 flex flex-col items-start text-white font-bold gap-1"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
      >
        <div className="flex gap-1 items-center">
          <LogoIcon />
          <h1 className="text-md whitespace-nowrap">TIKITAKA</h1>
        </div>
        <p className="text-sm whitespace-nowrap">Ticket Management System</p>
      </motion.div>

      {/* 우측 */}
      <motion.div
        className="absolute right-0 top-0 flex flex-col min-h-screen justify-center items-start gap-16 pl-28"
        style={{width: 'calc(100% - 800px)'}}
        initial={{opacity: 0, x: 100}}
        animate={{opacity: 1, x: 0}}
        transition={{type: 'tween', duration: 0.5, ease: 'easeOut'}}
      >
        <p className="text-black text-4xl font-bold">WELCOME</p>
        <div className="flex flex-col gap-6 w-72">
          <Link to="/signin" className="main-button-lg text-left">
            회원 로그인
          </Link>
          <Link to="/signup" className="main-button-lg text-left">
            계정 등록 신청
          </Link>
          <Link to="/resetpwd" className="main-button-lg text-left">
            비밀번호 재설정
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

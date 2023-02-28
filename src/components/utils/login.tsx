import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import ProfileImage from "./profile-image";

const Login = () => {
  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="flex h-screen flex-col items-center justify-center gap-8 py-16 text-gray-800"
    >
      <ProfileImage size={10} image={""} hasRing={false} />
      <h2 className="text-3xl font-extrabold">Welcome!</h2>
      <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold no-underline transition hover:bg-black/20"
        onClick={() => {
          void signIn();
        }}
      >
        Sign In
      </button>
    </motion.div>
  );
};

export default Login;

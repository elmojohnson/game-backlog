import { Ghost } from "lucide-react";
import { motion } from "motion/react";

export default function NoData({ message }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-[50px] flex items-center justify-center"
    >
      <div className="flex gap-2 items-center">
        <Ghost />
        <h5 className="font-semibold">{message}</h5>
      </div>
    </motion.div>
  );
}

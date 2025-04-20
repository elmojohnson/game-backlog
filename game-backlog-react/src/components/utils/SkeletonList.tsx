import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { motion } from "motion/react";

export default function SkeletonList({ maxRow }: { maxRow: number }) {
  const [grid, setGrid] = useState("grid lg:grid-cols-2 grid-cols-1 gap-4");

  useEffect(() => {
    if (maxRow === 3) {
      setGrid("grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4");
    } else if (maxRow === 2) {
      setGrid("grid lg:grid-cols-2 grid-cols-1 gap-4");
    }
  }, [grid]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={grid + " py-4 transition"}
    >
      {[...Array(12)].map((_, i) => {
        return <Card key={i} className="animate-pulse h-[120px]"></Card>;
      })}
    </motion.div>
  );
}

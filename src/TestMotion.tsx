import { motion } from "framer-motion";

export default function TestMotion() {
  return (
    <motion.div
      style={{
        opacity: 0.5,
        background: "red",
      }}
    >
      Test
    </motion.div>
  );
}
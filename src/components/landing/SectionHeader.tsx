import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const SectionHeader = ({
  label,
  title,
  description,
  icon: Icon,
  className = "",
  labelClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-16 ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-primary/70 mb-4 ${labelClassName}`}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </motion.span>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;

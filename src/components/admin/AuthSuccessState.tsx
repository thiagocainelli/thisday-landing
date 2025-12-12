import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTH_PAGE_CLASSES } from "@/utils/authPageUtils";

interface AuthSuccessStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonVariant?: "default" | "outline" | "hero" | "ghost";
}

const AuthSuccessState = ({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonHref,
  buttonVariant = "hero",
}: AuthSuccessStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-4"
    >
      <div className={AUTH_PAGE_CLASSES.successIconWrapper}>
        <Icon className={AUTH_PAGE_CLASSES.successIcon} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant={buttonVariant} asChild className="w-full">
        <Link to={buttonHref}>{buttonText}</Link>
      </Button>
    </motion.div>
  );
};

export default AuthSuccessState;


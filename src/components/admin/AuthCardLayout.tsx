import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_PAGE_CLASSES } from "@/utils/authPageUtils";

interface AuthCardLayoutProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}

const AuthCardLayout = ({
  icon: Icon,
  title,
  description,
  children,
}: AuthCardLayoutProps) => {
  return (
    <div className={AUTH_PAGE_CLASSES.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={AUTH_PAGE_CLASSES.cardWrapper}
      >
        <Card className={AUTH_PAGE_CLASSES.card}>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className={AUTH_PAGE_CLASSES.iconWrapper}>
                <Icon className={AUTH_PAGE_CLASSES.icon} />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthCardLayout;

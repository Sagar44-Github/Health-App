import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  onBack: () => void;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  rightContent?: React.ReactNode;
}

export const PageHeader = ({ onBack, icon: Icon, title, subtitle, rightContent }: PageHeaderProps) => {
  return (
    <div className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground font-medium -mt-1">{subtitle}</p>
              </div>
            </div>
          </div>
          {rightContent && (
            <div className="flex items-center space-x-2">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
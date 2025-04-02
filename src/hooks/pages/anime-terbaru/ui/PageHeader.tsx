import { PageHeaderProps } from "@/hooks/pages/types/AnimeTerbaru";

export default function PageHeader({ title }: PageHeaderProps) {
    return (
        <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {title}
            </h1>
            <div className="absolute -bottom-2 left-0 w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-slideIn"></div>
        </div>
    )
}
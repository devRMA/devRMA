import Link from "next/link";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    return (
        <Link href="/" className={className}>
            <span className="font-bold text-xl text-primary">
                dev<span className="text-foreground">RMA</span>
            </span>
        </Link>
    );
}

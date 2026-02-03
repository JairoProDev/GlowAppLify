import { Construction } from "lucide-react";

export default function ComingSoon({ title }: { title: string }) {
    return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-4">
                <Construction className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground">This feature is currently under development.</p>
            </div>
        </div>
    );
}

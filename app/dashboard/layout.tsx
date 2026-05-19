import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ChatSupport } from "../ChatSupport/ChatSupport";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="lg:ml-64">
        {children}
  
        <ChatSupport />
      </main>
         
    </div>
  );
}

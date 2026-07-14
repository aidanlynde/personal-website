import CRMLayout from '@/app/components/crm/CRMLayout'

// This layout wraps all CRM pages. Auth is enforced by middleware.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <CRMLayout>{children}</CRMLayout>
}

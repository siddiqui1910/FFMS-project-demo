import CrudPage from '@/components/CrudPage';

export default function AttendancePage() {
  return (
    <CrudPage
      title="Attendance"
      singular="Record"
      endpoint="/attendance/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'worker_name', label: 'Worker' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
      ]}
      fields={[
        { name: 'worker', label: 'Worker ID', type: 'number', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Present', 'Absent', 'Leave'], default: 'Present' },
      ]}
    />
  );
}
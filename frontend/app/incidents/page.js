import CrudPage from '@/components/CrudPage';

export default function IncidentsPage() {
  return (
    <CrudPage
      title="Security Incidents"
      singular="Incident"
      endpoint="/incidents/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'pond_name', label: 'Pond' },
        { key: 'date', label: 'Date' },
        { key: 'type', label: 'Type' },
        { key: 'description', label: 'Description' },
      ]}
      fields={[
        { name: 'pond', label: 'Pond ID', type: 'number', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'type', label: 'Type', type: 'select', options: ['Theft', 'Bird Attack', 'Other'], default: 'Bird Attack' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
}
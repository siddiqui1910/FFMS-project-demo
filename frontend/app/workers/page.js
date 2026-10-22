import CrudPage from '@/components/CrudPage';

export default function WorkersPage() {
  return (
    <CrudPage
      title="Workers"
      singular="Worker"
      endpoint="/workers/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'phone', label: 'Phone' },
        { key: 'wage_rate', label: 'Wage (Rs.)' },
      ]}
      fields={[
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'role', label: 'Role', type: 'text', default: 'Laborer' },
        { name: 'phone', label: 'Phone Number', type: 'text' },
        { name: 'wage_rate', label: 'Monthly Wage (Rs.)', type: 'number', step: '0.01' },
      ]}
    />
  );
}
import CrudPage from '@/components/CrudPage';

export default function SpeciesPage() {
  return (
    <CrudPage
      title="Species"
      singular="Species"
      endpoint="/species/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
      ]}
      fields={[
        { name: 'name', label: 'Name (e.g., Rahu, Singhara)', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
}
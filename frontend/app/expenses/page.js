import CrudPage from '@/components/CrudPage';

export default function ExpensesPage() {
  return (
    <CrudPage
      title="Expenses"
      singular="Expense"
      endpoint="/expenses/"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'category', label: 'Category' },
        { key: 'amount', label: 'Amount (Rs.)' },
        { key: 'date', label: 'Date' },
        { key: 'description', label: 'Description' },
      ]}
      fields={[
        { name: 'category', label: 'Category', type: 'select', options: ['Feed', 'Labor', 'Transport', 'Guard', 'Medicine', 'Misc'], default: 'Misc' },
        { name: 'amount', label: 'Amount (Rs.)', type: 'number', step: '0.01', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'batch', label: 'Batch ID (Optional)', type: 'number' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
}
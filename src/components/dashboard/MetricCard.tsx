interface MetricCardProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, color, icon }: MetricCardProps) => {
  return (
    <div
      className={`flex items-center p-4 bg-white rounded-lg shadow-md border-l-4 ${color} hover:shadow-lg transition-shadow`}
    >
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;
